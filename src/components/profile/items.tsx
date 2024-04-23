"use client";
import { GlobalStrings, ProfileStrings } from "@/utils/string";
import { Avatar, Box, Group, Stack, Text, Title } from "@mantine/core";
import { ProfileCard } from "./cards";

export const InfoItem = () => {
  return (
    <Stack w={"100%"} gap={16}>
      <Box>
        <Title order={2}>{ProfileStrings.info}</Title>
        <Text>{ProfileStrings.thisIsClient}</Text>
      </Box>
      <ProfileCard title={ProfileStrings.account} onClick={() => {}}>
        <Group gap={40} align="start">
          <Box className="rounded-full" bg={"darkGray"} w={80} h={80}>
            <img src={"/assets/images/svgs/account.svg"} alt="" />
          </Box>
          <Stack gap={10}>
            <Title order={4}>Dorjoo</Title>
            <Box>
              <Text c={"labelGray"} size={"14px"} lh={1.2}>
                {GlobalStrings.client}
              </Text>
              <Text fw={600}>Dorjoo</Text>
            </Box>
            <Box>
              <Text c={"labelGray"} size={"14px"} lh={1.2}>
                {GlobalStrings.email}
              </Text>
              <Text fw={600}>Dorjoo</Text>
            </Box>
          </Stack>
        </Group>
      </ProfileCard>
      <ProfileCard title={ProfileStrings.companyDetail} onClick={() => {}}>
        <Group gap={40} align="start">
          <Box className="rounded-full" bg={"darkGray"} w={80} h={80}>
            <img src={"/assets/images/svgs/company.svg"} alt="" />
          </Box>

          <Box>
            <Text fw={600}>Dorjoo</Text>
          </Box>
        </Group>
      </ProfileCard>
      <ProfileCard title={ProfileStrings.companyContact} onClick={() => {}}>
        <Stack gap={10} align="start">
          <Box>
            <Text c={"labelGray"} size={"14px"} lh={1.2}>
              {ProfileStrings.owner}
            </Text>
            <Text fw={600}>Dorjoo</Text>
          </Box>
          <Box>
            <Text c={"labelGray"} size={"14px"} lh={1.2}>
              {GlobalStrings.phone}
            </Text>
            <Text fw={600}>Dorjoo</Text>
          </Box>
        </Stack>
      </ProfileCard>
    </Stack>
  );
};
export const BillingItem = () => {
  return (
    <Stack w={"100%"}>
      <Title order={2}>{ProfileStrings.info}</Title>
      <Text>{ProfileStrings.thisIsClient}</Text>
      <ProfileCard title={ProfileStrings.account} onClick={() => {}}>
        <Group gap={40} align="start">
          <Box className="rounded-full" bg={"darkGray"} w={80} h={80}>
            <img src={"/assets/images/svgs/account.svg"} alt="" />
          </Box>
          <Stack gap={10}>
            <Title order={4}>Dorjoo</Title>
            <Box>
              <Text c={"labelGray"} size={"14px"} lh={1.2}>
                {GlobalStrings.client}
              </Text>
              <Text fw={600}>Dorjoo</Text>
            </Box>
            <Box>
              <Text c={"labelGray"} size={"14px"} lh={1.2}>
                {GlobalStrings.email}
              </Text>
              <Text fw={600}>Dorjoo</Text>
            </Box>
          </Stack>
        </Group>
      </ProfileCard>
    </Stack>
  );
};
