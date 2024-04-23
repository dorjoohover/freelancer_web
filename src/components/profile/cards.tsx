"use client";
import { ActionIcon, Card, Group, Title } from "@mantine/core";
import { ReactNode } from "react";
import { GoPencil } from "react-icons/go";

export const ProfileCard = ({
  title,
  children,
  onClick,
}: {
  title: string;
  children: ReactNode;
  onClick: () => void;
}) => {
  return (
    <Card w={"full"} radius={"lg"} px={24} py={32} withBorder>
      <Group justify="space-between" align="center" mb={24}>
        <Title order={3}>{title}</Title>
        <ActionIcon
          radius={"100%"}
          color="brand"
          bg={"transparent"}
          className="border-2 border-red-500"
          size="lg"
          style={{
            border: '1px solid #FF8600'
          }}
          onClick={() => onClick()}
        >
          <GoPencil className="text-brand" />
        </ActionIcon>
      </Group>
      {children}
    </Card>
  );
};
