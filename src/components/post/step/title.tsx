import { GlobalStrings, PostStrings } from "@/utils/string";
import { postCategories, postExampleTitles } from "@/utils/values";
import {
  Box,
  Group,
  List,
  rem,
  Select,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";

import { IconCircleCheck } from "@tabler/icons-react";

export const PostTitleStep = ({
  onChange,
  onCategory,
  cateValue,
  value,
}: {
  value: string;
  cateValue?: string;
  onChange: (e: string) => void;
  onCategory: (e: string) => void;
}) => {
  return (
    <Box>
      <Group>
        <Text>1/5</Text>
        <Text>{PostStrings.jobPost}</Text>
      </Group>

      <Group gap={40} align="start">
        <Stack flex={2} mt={24}>
          <Title order={2}>{PostStrings.postJobTitleText}</Title>
          <Text>{PostStrings.postJobTitleDescription}</Text>
        </Stack>

        <Stack flex={3}>
          <PostTitleCard
            cateValue={cateValue}
            value={value}
            onChange={onChange}
            onCategory={(e) => onCategory(e)}
          />
        </Stack>
      </Group>
    </Box>
  );
};

export const PostTitleCard = ({
  onChange,
  onCategory,
  category = true,
  value,
  cateValue,
}: {
  cateValue?: string;
  category?: boolean;
  onCategory: (e: string) => void;
  value: string;
  onChange: (e: string) => void;
}) => {
  return (
    <Box>
      <TextInput
        value={value}
        withAsterisk
        onChange={(event) => {
          onChange(event.target.value);
        }}
        label={PostStrings.titleInputLabel}
      />
      <Text fw={600}>{PostStrings.exampleTitle}</Text>
      <List
        icon={
          <ThemeIcon color="brand" size={24} radius="xl">
            <IconCircleCheck style={{ width: rem(16), height: rem(16) }} />
          </ThemeIcon>
        }
      >
        {postExampleTitles.map((title, i) => {
          return <List.Item key={i}>{title}</List.Item>;
        })}
      </List>
      {category && (
        <Select
          mt={20}
          labelProps={{
            fw: 600,
          }}
          value={
            postCategories.filter((category) => category.id == cateValue)?.[0]
              ?.name
          }
          label={GlobalStrings.category}
          data={postCategories.map((category) => category.name)}
          onChange={(e) => {
            if (e != null)
              onCategory(postCategories.filter((c) => c.name == e)?.[0].id);
          }}
          searchable
        />
      )}
    </Box>
  );
};
