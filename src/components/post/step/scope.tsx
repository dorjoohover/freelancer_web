import { PostType } from "@/app/post/create/[slug]/page";
import { PostScopeDuration, PostScopeLevel, PostScopeSize } from "@/utils/enum";
import { DateFormat } from "@/utils/function";
import { PostStrings } from "@/utils/string";
import {
  postExampleTitles,
  postScopeDuration,
  postScopeLevel,
  postScopeSizes,
  ScopeQuestions,
} from "@/utils/values";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  List,
  Radio,
  rem,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { DateInput, DatePicker, DatesRangeValue } from "@mantine/dates";
import { UseFormReturnType } from "@mantine/form";
import { IconCircleCheck } from "@tabler/icons-react";
import React, { ReactNode, useState } from "react";
import { GoPencil } from "react-icons/go";

export const PostScopeStep = ({
  payload,
  setPayload,
}: {
  payload: PostType;
  setPayload: React.Dispatch<React.SetStateAction<PostType>>;
}) => {
  return (
    <Box>
      <Group>
        <Text>3/5</Text>
        <Text>{PostStrings.jobPost}</Text>
      </Group>

      <Group gap={40} align="start">
        <Stack flex={2} mt={24}>
          <Title order={2}>{PostStrings.scopeTitleText}</Title>
          <Text>{PostStrings.scopeTitleDescription}</Text>
        </Stack>
        <Stack flex={3}>
          <PostScopeCard
            onChange={(e, key) => {
              setPayload((prev) => ({
                ...prev,
                [key]: e,
              }));
            }}
            onClick={(key) => setPayload((prev) => ({ ...prev, [key]: true }))}
            payload={payload}
          />
        </Stack>
      </Group>
    </Box>
  );
};
export const PostScopeCard = ({
  onChange,

  onClick,
  payload,
}: {
  payload: PostType;

  onChange: (
    e: string | boolean | DatesRangeValue,
    key: keyof PostType
  ) => void;
  onClick: (key: keyof PostType) => void;
}) => {
  return (
    <Box>
      <Stack gap={20}>
        <ScopeCard
          list={postScopeSizes}
          question={{ question: "" }}
          name={postScopeSizes.filter((s) => payload.size == s.id)[0]?.name}
          description={
            postScopeSizes.filter((s) => payload.size == s.id)[0]?.description
          }
          active={payload?.size == undefined || payload?.sizeActive}
          onChange={(e) => {
            onChange(e, "size");
            onChange(false, "sizeActive");
          }}
          onClick={() => onClick("sizeActive")}
          value={payload.size}
        />

        {payload.size != undefined && (
          <ScopeCard
            list={postScopeLevel}
            question={ScopeQuestions.level}
            name={postScopeLevel.filter((s) => payload.level == s.id)[0]?.name}
            description={
              postScopeLevel.filter((s) => payload.level == s.id)[0]
                ?.description
            }
            active={payload?.level == undefined || payload?.levelActive}
            onChange={(e) => {
              onChange(e, "level");
              onChange(false, "levelActive");
            }}
            onClick={() => onClick("levelActive")}
            value={payload.level}
          />
        )}
 
        {payload.level != undefined && (
          <ScopeCard
            list={[]}
            question={ScopeQuestions.duration}
            name={"Date"}
            description={`${DateFormat(payload.date[0], '/')} - ${DateFormat(
              payload.date[1], '/'
            )}`}
            active={
              payload?.durationActive == undefined || payload?.durationActive
            }
            onChange={(e) => {
              onChange(e, "durationActive");
              onChange(false, "durationActive");
            }}
            onClick={() => onClick("durationActive")}
            value={payload.duration ?? ""}
          >
            {" "}
            <Box>
              <Title order={6} mb={20}>
                {PostStrings.startDate} & {PostStrings.endDate}
              </Title>

              <DatePicker
                type="range"
                allowSingleDateInRange
                value={payload.date}
                onChange={(e) => {
                  onChange(e, "date");
                  if (e[0] != null && e[1] != null)
                    onChange(false, "durationActive");
                }}
              />
            </Box>
          </ScopeCard>
        )}
      </Stack>
    </Box>
  );
};
const ScopeCard = ({
  onChange,
  onClick,
  value,
  question,
  active,
  name,
  description,
  children,
  list,
}: {
  list: { id: string; name: string; description?: string }[];
  children?: ReactNode;
  question: { question: string; description?: string };
  active: boolean;
  onChange: (e: string) => void;
  value?: string;
  description: string;
  name: string;
  onClick: () => void;
}) => {
  return (
    <Box>
      {active && <Text fw={600}>{question.question}</Text>}
      {question.description && active && (
        <Text c={"labelGray"}>{question.description}</Text>
      )}
      {active ? (
        children != undefined ? (
          children
        ) : (
          <Radio.Group
            value={value}
            color="brand"
            onChange={(e) => {
              onChange(e);
            }}
          >
            <Stack mt="xs">
              {list.map((scope, i) => {
                return (
                  <Radio
                    color="brand"
                    value={scope.id}
                    description={scope.description}
                    label={scope.name}
                    key={i}
                  />
                );
              })}
            </Stack>
          </Radio.Group>
        )
      ) : (
        <Box display={"flex"} w={"100%"} className="justify-between">
          <Stack gap={0}>
            <Text fw={600}>{name}</Text>
            <Text c={"labelGray"}>{description}</Text>
          </Stack>

          <Box
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all border-2 border-gray cursor-pointer hover:bg-gray"
            onClick={() => onClick()}
          >
            <GoPencil fill="#FF8600" />
          </Box>
        </Box>
      )}
    </Box>
  );
};
