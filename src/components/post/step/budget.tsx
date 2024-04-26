"use client";
import { BudgetType } from "@/utils/enum";
import { GlobalStrings, PostStrings } from "@/utils/string";
import { postExampleTitles } from "@/utils/values";
import {
  Box,
  Group,
  List,
  NumberInput,
  rem,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { IconCircleCheck } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { RadioCard } from "../card";
import { IoTimeOutline } from "react-icons/io5";
import { GiPriceTag } from "react-icons/gi";
import { priceFormat } from "@/utils/function";
import { PostType } from "@/app/post/[slug]/page";

const PostBudgetStep = ({
  maxPrice,
  minPrice,
  price,
  type,
  change,
}: {
  minPrice: number;
  maxPrice: number;
  price: number;
  type: BudgetType;
  change: (e: string, key: keyof PostType) => void;
}) => {
  return (
    <Box>
      <Group>
        <Text>4/5</Text>
        <Text>{PostStrings.jobPost}</Text>
      </Group>

      <Group align="start">
        <Stack flex={2} mt={24}>
          <Title order={2}>{PostStrings.budgetTitleText}</Title>
          <Text>{PostStrings.budgetTitleDescription}</Text>
        </Stack>
        <Box flex={1} />
        <Stack flex={3}>
          <PostBudgetCard
            type={type}
            change={(e, key) => {
              change(e, key);
            }}
            maxPrice={maxPrice}
            minPrice={minPrice}
            price={price}
          />
        </Stack>
      </Group>
    </Box>
  );
};

export const PostBudgetCard = ({
  type,
  change,
  minPrice,
  maxPrice,
  price,
}: {
  type: BudgetType;
  price?: number;
  minPrice?: number;
  maxPrice?: number;
  change: (e: string, key: keyof PostType) => void;
}) => {
  return (
    <Group gap={40}>
      <RadioCard
        active={type == BudgetType.hourly}
        Icon={IoTimeOutline}
        onClick={() => change(BudgetType.hourly, "budgetType")}
        text={PostStrings.hourlyRate}
      />
      <RadioCard
        active={type == BudgetType.fixed}
        Icon={GiPriceTag}
        onClick={() => change(BudgetType.fixed, "budgetType")}
        text={PostStrings.fixedPrice}
      />

      {type == BudgetType.hourly && (
        <Box>
          <Group>
            <Stack flex={1}>
              <Text fw={600}>{GlobalStrings.from}</Text>

              <Box flex={1} display={"flex"} className="items-center gap-2">
                <TextInput
                  name="minPrice"
                  id="minPrice"
                  onChange={(e) => change(`${e.target.value}`, "minPrice")}
                  value={priceFormat(`${minPrice ?? ""}`)}
                  maw={150}
                />

                <Text> ₮&#47;{GlobalStrings.hr}</Text>
              </Box>
            </Stack>
            <Stack flex={1}>
              <Text fw={600}>{GlobalStrings.to}</Text>

              <Box flex={1} display={"flex"} className="items-center gap-2">
                <TextInput
                  name="maxPrice"
                  id="maxPrice"
                  value={priceFormat(`${maxPrice ?? ""}`)}
                  onChange={(e) => change(`${e.target.value}`, "maxPrice")}
                  maw={150}
                />

                <Text>₮&#47;{GlobalStrings.hr}</Text>
              </Box>
            </Stack>
          </Group>
          <Text my={16} size="12px" c={"labelGray"}>
            {PostStrings.avarageRateLabel}
          </Text>
          <Text size={"14px"} c={"labelGray"}>
            {PostStrings.avarageRateDescription}
          </Text>
        </Box>
      )}
      {type == BudgetType.fixed && (
        <Box>
          <Text size={"14px"} mb={24} c={"labelGray"}>
            {PostStrings.fixedPriceLabel}
          </Text>
          <Text size={"14px"} mb={12} c={"black"}>
            {PostStrings.fixedPriceQuestion}
          </Text>
          <Text size={"14px"} c={"labelGray"}>
            {PostStrings.fixedPriceDescription}
          </Text>
          <Box display={"flex"} className="items-center gap-2 my-4">
            <TextInput
              name="price"
              id="price"
              value={priceFormat(`${price ?? ""}`)}
              onChange={(e) => change(`${e.target.value}`, "price")}
              maw={150}
            />{" "}
            <Text>₮&#47;{GlobalStrings.hr}</Text>
          </Box>
        </Box>
      )}
    </Group>
  );
};

export default PostBudgetStep;
