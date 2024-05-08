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

export const PostAboutStep = ({
  change,
  gig,
  why,
  file,
  step,
}: {
  step: number;
  gig: string;
  why: string;
  change: (e: string | File, type: keyof PostType) => void;
  file?: any;
}) => {
  return (
    <Box>
      <Group>
        <Text>2/{step}</Text>
        <Text>{PostStrings.jobPost}</Text>
      </Group>

      <Box className="gap-10 flex max-[800px]:flex-col items-start">
        <Stack flex={2} mt={24}>
          <Title order={2}>{PostStrings.postJobTitleText}</Title>
          <Text>{PostStrings.postJobTitleDescription}</Text>
        </Stack>

        <Stack
          flex={3}
          style={{
            width: "100% !important",
          }}
        >
          <PostDescriptionCard
            change={change}
            description={gig}
            label="Why gig?"
            ph=""
            k="gig"
          />
          <PostDescriptionCard
            change={change}
            k="why"
            description={why}
            label="Why me?"
            ph=""
          />
        </Stack>
      </Box>
    </Box>
  );
};

export const PostDescriptionCard = ({
  description,
  change,
  label,
  ph,
  k,
}: {
  label?: string;
  ph?: string;
  description: string;
  k: keyof PostType;
  change: (e: string, key: keyof PostType) => void;
}) => {
  return (
    <Box className="w-full">
      <Box className="w-full">
        <Textarea
          w={"100%"}
          value={description}
          placeholder={ph ?? PostStrings.descPh}
          withAsterisk
          maxLength={5000}
          onChange={(event) => {
            change(event.currentTarget.value, k);
          }}
          rows={6}
          h={"auto"}
          label={label ?? PostStrings.descLabelTitle}
        />
        <Text size="12px" mt={8} ta={"right"}>
          {priceFormat(`${5000 - (description?.length ?? 0)}`)}{" "}
          {GlobalStrings.leftChar}
        </Text>
      </Box>
    </Box>
  );
};
