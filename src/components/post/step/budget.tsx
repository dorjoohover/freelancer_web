"use client";
import { BudgetType, UserType } from "@/utils/enum";
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
import { PostType } from "@/app/post/create/[slug]/page";

const PostBudgetStep = ({
  userType,
  change,
  prices,
  current,
  setCurrent,
}: {
  setCurrent: (e: BudgetType) => void;
  userType: UserType;
  current: BudgetType;
  prices: {
    minPrice: number;
    maxPrice: number;
    price: number;
    budgetType: BudgetType;
  }[];
  change: (
    e: string,
    key: keyof {
      minPrice: number;
      maxPrice: number;
      price: number;
    }
  ) => void;
}) => {
  let fl = userType == UserType.FREELANCER;
  return (
    <Box>
      <Group>
        <Text>
          {userType == UserType.CLIENT ? 4 : 3}/
          {userType == UserType.CLIENT ? 5 : 4}
        </Text>
        <Text>{PostStrings.jobPost}</Text>
      </Group>
      <Box className="gap-10 flex max-[800px]:flex-col items-start">
        <Stack flex={2} mt={24}>
          <Title order={2}>{PostStrings.budgetTitleText}</Title>
          <Text>{PostStrings.budgetTitleDescription}</Text>
        </Stack>
        <Box flex={1} />
        <Stack flex={3}>
          <PostBudgetCard
            fl={fl}
            setCurrent={setCurrent}
            prices={
              prices.filter((p) => p.budgetType == current)?.[0] ?? prices[0]
            }
            change={(e, key) => {
              change(e, key);
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export const PostBudgetCard = ({
  change,
  prices,
  fl,
  setCurrent,
}: {
  setCurrent: (e: BudgetType) => void;
  fl: boolean;
  prices: {
    minPrice: number;
    maxPrice: number;
    price: number;
    budgetType: BudgetType;
  };
  change: (
    e: string,
    key: keyof {
      minPrice: number;
      maxPrice: number;
      price: number;
    }
  ) => void;
}) => {
  return (
    <Group gap={fl ? 20 : 40}>
      {fl ? (
        <>
          <RadioCard
            active={prices.budgetType == BudgetType.basic}
            Icon={IoTimeOutline}
            onClick={() => setCurrent(BudgetType.basic)}
            text={PostStrings.basicPrice}
          />
          <RadioCard
            active={prices.budgetType == BudgetType.standard}
            Icon={GiPriceTag}
            onClick={() => setCurrent(BudgetType.standard)}
            text={PostStrings.standart}
          />
          <RadioCard
            active={prices.budgetType == BudgetType.premium}
            Icon={GiPriceTag}
            onClick={() => setCurrent(BudgetType.premium)}
            text={PostStrings.premium}
          />
        </>
      ) : (
        <>
          <RadioCard
            active={prices.budgetType == BudgetType.hourly}
            Icon={IoTimeOutline}
            onClick={() => setCurrent(BudgetType.hourly)}
            text={PostStrings.hourlyRate}
          />
          <RadioCard
            active={prices.budgetType == BudgetType.fixed}
            Icon={GiPriceTag}
            onClick={() => setCurrent(BudgetType.fixed)}
            text={PostStrings.fixedPrice}
          />
        </>
      )}

      {prices.budgetType != BudgetType.fixed && (
        <Box>
          <Group>
            <Stack flex={1}>
              <Text fw={600}>{GlobalStrings.from}</Text>

              <Box flex={1} display={"flex"} className="items-center gap-2">
                <TextInput
                  name="minPrice"
                  id="minPrice"
                  onChange={(e) => change(`${e.target.value}`, "minPrice")}
                  value={priceFormat(`${prices.minPrice ?? ""}`)}
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
                  value={priceFormat(`${prices.maxPrice ?? ""}`)}
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
      {prices.budgetType == BudgetType.fixed && (
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
              value={priceFormat(`${prices.price ?? ""}`)}
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
