"use client";
import { Box, Button, Group, Title } from "@mantine/core";
import { useHover } from "@mantine/hooks";
import { IconType } from "react-icons";

export const RegisterCard = ({
  text,
  Icon,
  onClick,
  active,
}: {
  text: string;
  Icon: IconType;
  onClick: () => void;
  active: boolean;
}) => {
  const { hovered, ref } = useHover();
  return (
    <Box
    onClick={onClick}
      ref={ref}
      h={"200px"}
      
      className={`rounded-md border flex-1 ${
        !active && !hovered ? "border-gray" : "border-brand"
      } cursor-pointer ease-in duration-300`}
      px={"sm"}
    >
      <Group justify="space-between" align="start" pl={"sm"} py={"md"}>
        <Box mt={10}>
          <Icon size={32} />
        </Box>
        <span
          className={`flex justify-center items-center w-6 ${
            active ? "bg-brand" : "border-2 border-gray"
          } rounded-full h-6`}
        >
          <span className={`rounded-full border border-white w-3 h-3`}></span>
        </span>
      </Group>
      <Title pl={"sm"} order={3} fw={500}>
        {text}
      </Title>
    </Box>
  );
};
