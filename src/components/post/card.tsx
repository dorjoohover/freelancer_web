import { PostDto } from "@/models/post.model";
import { UserDto } from "@/models/user.model";
import { GlobalStrings } from "@/utils/string";
import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Group,
  Highlight,
  Image,
  Menu,
  rem,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { IconDots, IconEye, IconFileZip, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { CiHeart } from "react-icons/ci";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { GoPencil } from "react-icons/go";
import { IoStar } from "react-icons/io5";

import { Navigation, Pagination } from "swiper/modules";
import { SwiperSlide, Swiper } from "swiper/react";

export const RadioCard = ({
  onClick,
  Icon,
  text,
  active,
}: {
  active: boolean;
  Icon: IconType;
  text: string;
  onClick: () => void;
}) => {
  return (
    <Box
      flex={1}
      w={"full"}
      px={20}
      py={24}
      className={`border hover:border-brand  rounded-lg  hover:bg-hoverGray ${
        active ? "border-brand  bg-hoverGray" : "border-gray "
      } transition-all cursor-pointer`}
      onClick={() => {
        onClick();
      }}
    >
      <Group justify="space-between" align="start">
        <Box mt={16}>
          <Icon className="black" size={"24px"} />
          <Text mt={10}>{text}</Text>
        </Box>
        <Box
          w={24}
          h={24}
          className={`rounded-full flex items-center justify-center ${
            active ? "bg-brand" : "border border-textGray"
          } `}
        >
          <Box w={14} h={14} className="border border-white rounded-full" />
        </Box>
      </Group>
    </Box>
  );
};

export const DetailCard = ({
  onClick,
  children,
  py = "32px",
}: {
  py?: string;
  onClick: () => void;
  children: ReactNode;
}) => {
  return (
    <Box className="flex justify-between gap-2" py={py} px={24}>
      <Box>{children}</Box>
      <Box
        className="flex items-center justify-center w-10 h-10 rounded-full transition-all border-2 border-gray cursor-pointer hover:bg-gray"
        onClick={() => onClick()}
      >
        <GoPencil fill="#FF8600" />
      </Box>
    </Box>
  );
};
const images = [
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-1.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-2.png",
  "https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png",
];
export const PostCard = ({ post }: { post: PostDto }) => {
  return (
    <Card withBorder shadow="sm" radius="md">
      <Card.Section withBorder>
        <Box pos={"relative"}>
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {images.map((img, i) => {
              return (
                <SwiperSlide key={i}>
                  {" "}
                  <img src={img}  alt="" />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <button className="top-5 right-5 z-50 absolute">
            <FaHeart size={20} fill="red" />
            {/* <FaRegHeart  size={20} /> */}
          </button>
        </Box>
      </Card.Section>

      <Group>
        <Box className="flex items-center gap-1 justify-between">
          <Box className="flex items-center gap-1">
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-3.png"
              alt="it's me"
            />
            <Box className="flex items-center gap-1">
              <Text>{GlobalStrings.adBy}</Text>
              <Link href={`/profile/${(post.created as UserDto).email}`} className="font-bold">
                {(post.created as UserDto).firstname}
              </Link>
            </Box>
          </Box>
        </Box>
        <Link href={`/post/${post._id}`} className="hover:underline">
          <Text>{post.description}</Text>
        </Link>
      </Group>
      <Stack>
        <Group>
          <IoStar />
          <Text fw={"bold"}>
            <span>4.8</span> <span className="text-light">(1k+)</span>
          </Text>
        </Group>
        <Text fw={"bold"}>From $130</Text>
      </Stack>
    </Card>
  );
};
