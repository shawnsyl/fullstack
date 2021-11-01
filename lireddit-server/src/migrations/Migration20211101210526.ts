import { Migration } from '@mikro-orm/migrations';

export class Migration20211101210526 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "account" add column "email" text not null;');
    this.addSql(
      'alter table "account" add constraint "account_email_unique" unique ("email");',
    );
  }
}
