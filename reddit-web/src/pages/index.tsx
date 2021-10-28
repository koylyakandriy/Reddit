import React, { useState } from "react";
import Layout from "../components/Layout";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";
import UpdootSection from "../components/UpdootSection";
import EditDeletePostButtons from "../components/EditDeletePostButtons";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 4,
    cursor: null as null | string,
  });
  const [{ data, error, fetching }] = usePostsQuery({ variables });

  if (!fetching && !data) {
    return (
      <Box align="center">
        <h1>You got query failed for some reason</h1>
        <h2>{error?.message}</h2>
      </Box>
    );
  }

  const loadMore = () => {
    setVariables({
      limit: variables.limit,
      cursor: data!.posts.posts[data!.posts.posts.length - 1].createdAt,
    });
  };

  return (
    <Layout>
      {!data && fetching ? (
        <h1>Loading...</h1>
      ) : (
        <Stack spacing={8} mt={4}>
          {data!.posts.posts.map((p) =>
            !p ? null : (
              <Flex key={p.id} p={5} shadow="md" borderWidth="1px">
                <UpdootSection post={p} />
                <Box flex={1}>
                  <NextLink href="/post/[id]" as={`/post/${p.id}`}>
                    <Link>
                      <Heading fontSize="xl">{p.title}</Heading>
                    </Link>
                  </NextLink>
                  <Text>post by {p.creator.username}</Text>
                  <Flex mt={4}>
                    <Text flex={1} mt={4} mr={2}>
                      {p.textSnippet}
                    </Text>
                    <EditDeletePostButtons id={p.id} creatorId={p.creator.id} />
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore ? (
        <Flex>
          <Button onClick={loadMore} isLoading={fetching} m="auto" my={4}>
            Load more
          </Button>
        </Flex>
      ) : null}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
