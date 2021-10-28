import React from "react";
import { withUrqlClient } from "next-urql";
import { Box, Heading } from "@chakra-ui/react";
import Layout from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import EditDeletePostButtons from "../../components/EditDeletePostButtons";

const Post = () => {
  const [{ data, error, fetching }] = useGetPostFromUrl();

  if (error) {
    return <Box>{error.message}</Box>;
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
    <Layout>
      {!fetching ? (
        <Box>
          <Heading mb={4}>{data.post.title}</Heading>
          <Box mb={4}>{data.post.text}</Box>
          <EditDeletePostButtons
            id={data.post.id}
            creatorId={data.post.creator.id}
          />
        </Box>
      ) : (
        <h1>Loading...</h1>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
