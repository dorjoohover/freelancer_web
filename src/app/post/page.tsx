"use client";
import { PostCard } from "@/components/post/card";

import { Box, Grid } from "@mantine/core";

import { useEffect, useState } from "react";

export default function PostPage() {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    try {
      await fetch(`/api/post/`)
        .then((d) => d.json())
        .then((d) => {
          setPosts(d.data);
        });
    } catch (error) {}
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <Box>
      <Grid>
        {posts?.map((post, i) => {
          return (
            <Grid.Col
              span={{
                md: 3,
                sm: 4,
                xs: 6,
                base: 12,
              }}
              key={i}
            >
              <PostCard post={post} />
            </Grid.Col>
          );
        })}
      </Grid>
    </Box>
  );
}
