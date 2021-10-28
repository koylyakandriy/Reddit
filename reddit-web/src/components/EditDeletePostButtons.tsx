import React, { FC } from "react";
import NextLink from "next/link";
import { Box, IconButton } from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {useDeletePostMutation, useMeQuery} from "../generated/graphql";

interface EditDeletePostButtons {
  id: number;
  creatorId: number
}

const EditDeletePostButtons: FC<EditDeletePostButtons> = ({ id, creatorId }) => {
  const [{ data }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();
  
  if(data?.me?.id !== creatorId) {
    return null
  }
  
  return (
    <Box>
      <NextLink href="/post/edit/[id]" as={`/post/edit/${id}`}>
        <IconButton
          ml="auto"
          mr={2}
          alignSelf="flex-end"
          aria-label="edit-post"
          size="sm"
          icon={<EditIcon />}
        />
      </NextLink>
      <IconButton
        ml="auto"
        alignSelf="flex-end"
        aria-label="delete-post"
        size="sm"
        colorScheme="red"
        icon={<DeleteIcon />}
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Box>
  );
};

export default EditDeletePostButtons;
