"use client";
import { GlobalStrings, PostStrings } from "@/utils/string";
import { postExampleTitles } from "@/utils/values";
import {
  Box,
  Button,
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
      await fetch(`/api/post/my`)
        .then((d) => d.json())
        .then((d) => setPosts(d));
    } catch (error) {}
  };
  useEffect(() => {
    getPosts();
  }, []);
  return <Box mt={100}>{JSON.stringify(posts)}</Box>;
}
