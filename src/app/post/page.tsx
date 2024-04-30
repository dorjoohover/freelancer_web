"use client";
import { PostCard } from "@/components/post/card";
import { GlobalStrings, PostStrings } from "@/utils/string";
import { postExampleTitles } from "@/utils/values";
import {
  Box,
  Button,
  Grid,
  Group,
  List,
  rem,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      await fetch(`/api/post/`)
        .then((d) => d.json())
        .then((d) => {
          console.log(d.data)
          setPosts(d.data)

        });
    } catch (error) {}
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Box >
      <Grid >
        {posts?.concat(posts)?.concat(posts)?.map((post, i) => {
          return (
            <Grid.Col span={3} key={i}>
              <PostCard post={post} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
}
