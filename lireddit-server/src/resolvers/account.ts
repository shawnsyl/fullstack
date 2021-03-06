import { Account } from '../entities/Account';
import { MyContext } from '../types';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import argon2 from 'argon2';
import { UsernamePasswordInput } from './UsernamePasswordInput';
import { validateRegister } from '../utils/validateRegister';

declare module 'express-session' {
  export interface SessionData {
    userId: number;
  }
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class AccountResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Account, { nullable: true })
  account?: Account;
}

@Resolver()
export class AccountResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string, @Ctx() { em }: MyContext) {
    // const accoun{t = await em.findOne(Account, { email });
    return true;
  }

  @Query(() => Account, { nullable: true })
  async me(@Ctx() { em, req }: MyContext): Promise<Account | null> {
    console.log(req.session);
    if (!req.session.userId) {
      return null;
    }

    const account = await em.findOne(Account, { id: req.session.userId });
    return account;
  }

  @Mutation(() => AccountResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { em, req }: MyContext,
  ): Promise<AccountResponse> {
    const errors = validateRegister(options);

    if (errors) {
      return errors;
    }
    const hashedPassword = await argon2.hash(options.password);
    let account;
    try {
      const result = await em
        .createQueryBuilder(Account)
        .getKnexQuery()
        .insert({
          username: options.username,
          email: options.email,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning('*');

      account = result[0];
    } catch (err) {
      // duplicate username error
      if (err.code === '23505') {
        //|| err.detail.includes('already exists')) {
        return {
          errors: [
            {
              field: 'username',
              message: 'username taken',
            },
          ],
        };
      }
    }

    req.session.userId = account.id;

    return {
      account,
    };
  }

  @Mutation(() => AccountResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { em, req }: MyContext,
  ): Promise<AccountResponse> {
    const account = await em.findOne(
      Account,
      usernameOrEmail.includes('@')
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    );
    if (!account) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: "That username doesn't exist",
          },
        ],
      };
    }
    const valid = await argon2.verify(account.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Incorrect password',
          },
        ],
      };
    }

    req.session.userId = account.id;

    return {
      account,
    };
  }
}
