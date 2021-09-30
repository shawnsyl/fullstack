import React from "react";
import { Formik, Form } from "formik";
import {
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { useMutation } from "urql";
import { useRegisterMutation } from "../generated/graphql";

interface registerProps {}

const Register: React.FC<registerProps> = ({}) => {
  const [, register] = useRegisterMutation();
  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={async (values) => {
          const response = await register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField
              name="username"
              placeholder="Username"
              label="Username"
            />
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              colorScheme="teal"
            >
              Register
            </Button>
            {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default Register;
