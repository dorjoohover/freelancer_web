import { ProfileStrings } from "@/utils/string";
import { Box, Button, Group, Stack, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function ProfileVerifyEmail() {
  return (
    <Stack
      w={"40%"}
      my={"auto"}
      justify="center"
      gap={20}
      h={"calc(100vh - 103px)"}
      align="center"
      mx={"auto"}
    >
      <img src={`/assets/images/svgs/email.svg`} className="w-[145px]" alt="" />
      <Title order={4} ta={"center"}>
        {ProfileStrings.emailVerify}
      </Title>
      <Text ta={"center"}>
        {ProfileStrings.weSentEmail}
        {}
      </Text>
      <Text ta={"center"}>
        {ProfileStrings.verifyDescription}
        {}
      </Text>
      <Group>
        <Button variant="light" radius="xl" color="brand">
          {ProfileStrings.sendAgain}
        </Button>
        <Link href={"https://gmail.com"} target="_blank">
          <Button radius={"xl"} color="brand">
            {ProfileStrings.goToGmail}
          </Button>
        </Link>
      </Group>
      <Button unstyled>
        <Text td={"underline"} c={"brand"}>
          {ProfileStrings.receiveEmail}
        </Text>
      </Button>
    </Stack>
  );
}
