"use client";
import { GlobalStrings } from "@/utils/string";
import { months } from "@/utils/values";
import {
  ActionIcon,
  Box,
  Card,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { ReactNode } from "react";
import { FaRegFolderOpen } from "react-icons/fa6";
import { GoPencil } from "react-icons/go";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FreelancerExperienceType } from "./create/experience";
import { CreateFreelancerProfileStep } from "@/utils/enum";
import { FreelancerEducationType } from "./create/education";

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
            border: "1px solid #FF8600",
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

export const FreelancerExperienceCard = ({
  d,
  edit,
  remove,
  type,
}: {
  d: FreelancerExperienceType | FreelancerEducationType;
  edit: () => void;
  remove: () => void;
  type: CreateFreelancerProfileStep;
}) => {
  const formatDate = (date: Date) => {
    return `${
      months.filter((m) => m.value == date.getMonth() + 1)[0].name
    } ${date.getUTCFullYear()}`;
  };
  let title = "";
  let description = "";
  let addition = "";

  switch (type) {
    case CreateFreelancerProfileStep.education:
      title = (d as FreelancerEducationType).school;
      description = `${(d as FreelancerEducationType).degree} ${
        (d as FreelancerEducationType).startDate
      } - ${(d as FreelancerEducationType).endDate}`;
      addition = "";
      break;

    case CreateFreelancerProfileStep.employment:
      title = (d as FreelancerExperienceType).title;
      description = `${(d as FreelancerExperienceType).company} | ${formatDate(
        (d as FreelancerExperienceType).startDate!
      )} - ${
        (d as FreelancerExperienceType).currentWorking
          ? `${GlobalStrings.present}`
          : formatDate(
              (d as FreelancerExperienceType).endDate ?? new Date(Date.now())
            )
      }}`;
      addition = `${(d as FreelancerExperienceType)?.location},${
        (d as FreelancerExperienceType)?.region?.name
      }`;
      break;

    default:
  }

  return (
    <Box className="rounded-lg border border-gray" p={20}>
      <Box className="flex gap-2.5 ">
        <FaRegFolderOpen className="text-brand" size={50} />
        <Stack gap={0} h={200}>
          <Text mb={10}>{title}</Text>

          <Text className="text-nowrap">{description}</Text>
          {addition != "" && (
            <Text size="14px" mb={10} c={"textGray"}>
              {addition}
            </Text>
          )}
          <Text
            c={"labelGray"}
            mt={10}
            className="break-all overflow-hidden text-ellipsis "
          >
            {d?.description}
          </Text>
        </Stack>
        <Box className="flex gap-2">
          <ActionIcon
            bg={"none"}
            size={40}
            radius={"100%"}
            className="border border-brand"
            c="brand"
            onClick={edit}
          >
            <MdOutlineEdit className="text-[26px]" />{" "}
          </ActionIcon>

          <ActionIcon
            bg={"none"}
            size={40}
            radius={"100%"}
            className="border border-brand"
            c="brand"
            onClick={remove}
          >
            <RiDeleteBin6Line className="text-[26px]" />{" "}
          </ActionIcon>
        </Box>
      </Box>
    </Box>
  );
};
