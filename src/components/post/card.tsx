import { ActionIcon, Box, Card, Group, Text } from "@mantine/core";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { GoPencil } from "react-icons/go";

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
  py='32px'
}: {
  py?: string
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
