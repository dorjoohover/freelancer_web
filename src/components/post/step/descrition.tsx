import { PostType } from "@/app/post/create/[slug]/page";
import { priceFormat } from "@/utils/function";
import { GlobalStrings, PostStrings } from "@/utils/string";
import { postExampleTitles } from "@/utils/values";
import {
  Box,
  Button,
  FileButton,
  Group,
  List,
  rem,
  Stack,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconCircleCheck } from "@tabler/icons-react";
import { useState } from "react";
import { IoIosAttach } from "react-icons/io";

export const PostDescriptionStep = ({
  change,
  description,
  file,
}: {
  description: string;
  change: (e: string | File, type: keyof PostType) => void;
  file: any;
}) => {
  return (
    <Box>
      <Group>
        <Text>5/5</Text>
        <Text>{PostStrings.jobPost}</Text>
      </Group>

      <Group gap={40} align="start">
        <Stack flex={2} mt={24}>
          <Title order={2}>{PostStrings.postJobTitleText}</Title>
          <Text>{PostStrings.postJobTitleDescription}</Text>
        </Stack>

        <Stack flex={3}>
          <PostDescriptionCard change={change} description={description} />
        </Stack>
      </Group>
    </Box>
  );
};

export const PostDescriptionCard = ({
  description,
  change,
}: {
  description: string;
  change: (e: string, key: keyof PostType) => void;
}) => {
  return (
    <Box>
      <Box>
        <Textarea
          value={description}
          placeholder={PostStrings.descPh}
          withAsterisk
          maxLength={5000}
          onChange={(event) => {
            change(event.currentTarget.value, "description");
          }}
          rows={6}
          h={"auto"}
          label={PostStrings.descLabelTitle}
        />
        <Text size="12px" mt={8} ta={"right"}>
          {priceFormat(`${5000 - (description?.length ?? 0)}`)}{" "}
          {GlobalStrings.leftChar}
        </Text>
      </Box>

      <Box>
        <FileButton
          onChange={(e) => console.log(e)}
          accept="application/pdf"
          multiple
        >
          {(props) => (
            <Button
              variant="light"
              color="brand"
              radius={"lg"}
              leftSection={<IoIosAttach size={20} />}
              {...props}
            >
              {GlobalStrings.attachFile}
            </Button>
          )}
        </FileButton>
      </Box>
    </Box>
  );
};
