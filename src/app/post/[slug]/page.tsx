"use client";
import { PostDto } from "@/models/post.model";
import { UserDto } from "@/models/user.model";
import { BudgetType } from "@/utils/enum";
import { priceFormat } from "@/utils/function";
import { GlobalStrings, PostStrings } from "@/utils/string";
import { skills } from "@/utils/values";
import {
  Avatar,
  Box,
  Button,
  Group,
  List,
  rem,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";

export default function PostDymanicPage({
  params,
}: {
  params: { slug: string };
}) {
  const [data, setData] = useState<PostDto>();
  const getData = async () => {
    try {
      const res = await fetch(`/api/post/${params.slug}`, {
        method: "POST",
      }).then((d) => d.json());
      setData(res.data);
      console.log(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [params.slug]);
  const price = () => {
    return data?.budgetType == BudgetType.fixed
      ? `${priceFormat(`${data?.price ?? 0}`)}₮`
      : `${priceFormat(`${data?.minPrice ?? 0}`)}₮ -
          ${priceFormat(`${data?.maxPrice ?? 0}`)}₮`;
  };
  return (
    <Box className="flex gap-10" maw={1200} mx={"auto"}>
      <Stack flex={5}>
        <Title>{data?.title}</Title>
        <Group>
          <Avatar
            src={
              "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png"
            }
            size={70}
          />
          <Box>
            <Title order={4}>{(data?.created as UserDto)?.firstname}</Title>
            <Group>
              <IoStar /> 4.9 (22)
            </Group>
          </Box>
        </Group>
        <Text>{data?.description}</Text>
        <Box>
          <Text>
            {GlobalStrings.price}:{price()}
          </Text>
          <Text>
            {GlobalStrings.level}:{data?.level}
          </Text>
          <Text>
            {GlobalStrings.size}:{data?.size}
          </Text>
        </Box>
        <Box>
          <Text>{GlobalStrings.skills}:</Text>
          <List
            icon={
              <ThemeIcon color="teal" size={24} radius="xl">
                <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
              </ThemeIcon>
            }
          >
            {data?.skills?.map((skill, i) => {
              return (
                <List.Item key={i}>
                  {skills.filter((s) => s.id == skill)?.[0]?.name}
                </List.Item>
              );
            })}
          </List>
        </Box>
      </Stack>
      <Stack flex={2} pos={"sticky"}>
        <Link target="_blank" href={`/profile/${(data?.created as UserDto)?.email}`} className="w-full">
          <Button w={'100%'}>{GlobalStrings.contactMe}</Button>
        </Link>
      </Stack>
    </Box>
  );
}
