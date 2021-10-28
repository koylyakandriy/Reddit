import React from "react";
import { withUrqlClient } from "next-urql";
import { Form, Formik } from "formik";
import { Box, Button } from "@chakra-ui/react";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import InputField from "../../../components/InputField";
import Layout from "../../../components/Layout";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import { useGetIntId } from "../../../utils/useGetIntId";
import { useRouter } from "next/router";

const UpdatePost = () => {
  const intId = useGetIntId();
  const router = useRouter();
  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
  const [, updatePost] = useUpdatePostMutation();

  if (fetching) {
    return (
      <Layout>
        <h1>Loading...</h1>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>
          <h1>Could not find post</h1>
        </Box>
      </Layout>
    );
  }

  return (
    <Layout variant="small">
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({ id: intId, ...values });
          await router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title" label="Title" />
            <Box mt={4}>
              <InputField
                name="text"
                placeholder="Text"
                label="Text"
                textarea
              />
            </Box>
            <Button
              mt={4}
              type="submit"
              colorScheme="teal"
              isLoading={isSubmitting}
            >
              Edit post
            </Button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(UpdatePost);
