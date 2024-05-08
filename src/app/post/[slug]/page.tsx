"use client";
import { PostDto } from "@/models/post.model";
import { UserDto } from "@/models/user.model";
import { BudgetType } from "@/utils/enum";
import { dateDif, priceFormat } from "@/utils/function";
import { GlobalStrings, PostStrings } from "@/utils/string";
import { reviewExample, skills } from "@/utils/values";
import {
  Avatar,
  Box,
  Button,
  Group,
  List,
  Rating,
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
      dateDif(res.data.createdAt);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, [params.slug]);
  const price = (value: {
    price: number;
    minPrice: number;
    maxPrice: number;
    budgetType: BudgetType;
  }) => {
    console.log(value);
    return value.budgetType == BudgetType.fixed
      ? `${priceFormat(`${value?.price ?? 0}`)}₮`
      : `${priceFormat(`${value?.minPrice ?? 0}`)}₮ -
          ${priceFormat(`${value?.maxPrice ?? 0}`)}₮`;
  };
  const reviews = reviewExample.map((e) => e.views).reduce((a, b) => a + b);
  const avg =
    reviewExample.map((e) => e.views * e.star).reduce((a, b) => a + b) /
    reviews;

  return (
    <Box className="flex max-[800px]:flex-col gap-10" maw={1200} mx={"auto"}>
      <Stack flex={5}>
        <Title>{data?.title}</Title>
        <Text c={"labelGray"}>
          {GlobalStrings.posted} {`${dateDif(data?.createdAt ?? "").value} `}
          {dateDif(data?.createdAt ?? "").unit} {GlobalStrings.ago}
        </Text>
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
          {data?.prices.map((p, i) => {
            return (
              <Text key={i}>
                {GlobalStrings.price}:{price(p)}
              </Text>
            );
          })}

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
        <Group>
          <Text>
            {reviews} {GlobalStrings.review}
          </Text>
          <Rating value={Math.round(avg * 100) / 100} fractions={2} readOnly />
        </Group>

        <Box className="flex max-[600px]:flex-col items-start gap-5">
          <List flex={1}>
            {reviewExample.map((e, i) => {
              return (
                <List.Item key={i}>
                  <Group>
                    <Text>
                      {e.star} {GlobalStrings.star}
                    </Text>{" "}
                    <Box
                      w={200}
                      h={5}
                      pos={"relative"}
                      className="rounded-lg"
                      bg={"gray"}
                    >
                      <Box
                        pos={"absolute"}
                        className="rounded-lg"
                        bg={"dark"}
                        top={0}
                        bottom={0}
                        left={0}
                        right={`${100 - (e.views / reviews) * 100}%`}
                      />
                    </Box>
                    <Text>({priceFormat(`${e.views}`)})</Text>
                  </Group>
                </List.Item>
              );
            })}
          </List>
          <List flex={1}>
            <List.Item>
              <Text fw={600}>{GlobalStrings.ratingBreakdown}</Text>
            </List.Item>
            <List.Item>
              <Group justify="space-between">
                <Text>{GlobalStrings.sellerCommunicationLevel}</Text>
                <Group gap={5}>
                  <IoStar />
                  <Text fw={600}>{Math.round(avg * 100) / 100}</Text>
                </Group>
              </Group>
              <Group justify="space-between">
                <Text>{GlobalStrings.recommendedFriends}</Text>
                <Group gap={5}>
                  <IoStar />
                  <Text fw={600}>{Math.round(avg * 100) / 100}</Text>
                </Group>
              </Group>
              <Group justify="space-between">
                <Text>{GlobalStrings.serviceDescribed}</Text>
                <Group gap={5}>
                  <IoStar />
                  <Text fw={600}>{Math.round(avg * 100) / 100}</Text>
                </Group>
              </Group>
            </List.Item>
          </List>
        </Box>
      </Stack>
      <Stack flex={2} pos={"sticky"}>
        <Link
          target="_blank"
          href={`/profile/account/${(data?.created as UserDto)?.email}`}
          className="w-full"
        >
          <Button w={"100%"}>{GlobalStrings.contactMe}</Button>
        </Link>
      </Stack>
    </Box>
  );
}
