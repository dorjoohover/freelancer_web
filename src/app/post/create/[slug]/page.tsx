"use client";
import PostBudgetStep from "@/components/post/step/budget";
import { PostDescriptionStep } from "@/components/post/step/descrition";
import { PostReviewStep } from "@/components/post/step/review";
// import { PostBudgetStep } from "@/components/post/step/budget";
import { PostScopeStep } from "@/components/post/step/scope";
import { PostSkillStep } from "@/components/post/step/skill";
import { PostTitleStep } from "@/components/post/step/title";

import {
  BudgetType,
  PostScopeDuration,
  PostScopeLevel,
  PostScopeSize,
  PostStep,
} from "@/utils/enum";
import {
  postNextStepString,
  postPrevStepString,
  postStep,
} from "@/utils/function";

import { GlobalStrings, PostStrings } from "@/utils/string";

import { Box, Button, Group, rem } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export type PostType = {
  title: string;
  skills: { name: string; id: string }[];
  size?: PostScopeSize;
  sizeActive: boolean;
  duration?: PostScopeDuration;
  date: [Date | null, Date | null];

  durationActive: boolean;
  level?: PostScopeLevel;
  levelActive: boolean;
  budgetType: BudgetType;
  minPrice: number;
  maxPrice: number;
  description: string;
  price: number;
  file?: File;
  category?: string;
};
export default function PostCreateDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const [payload, setPayload] = useState<PostType>({
    title: "",
    skills: [],
    size: undefined,
    sizeActive: true,
    duration: undefined,
    level: undefined,
    durationActive: true,
    levelActive: true,
    budgetType: BudgetType.hourly,
    minPrice: 10000,
    maxPrice: 30000,
    date: [null, null],
    price: 0,
    description: "",
    file: undefined,
    category: undefined,
  });
  const [selected, setSkills] = useState<{ name: string; id: string }[]>([]);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("postPayload") != null
    ) {
      let data = JSON.parse(localStorage.getItem("postPayload") as string);

      setPayload(data);
    }
  }, []);
  useEffect(() => {
    if (payload?.skills?.length > 0) {
      setSkills(payload.skills);
    }
  }, [payload]);
  const step = postStep((params.slug as PostStep) ?? PostStep.title);
  const router = useRouter();
  const send = async () => {
    try {
      let body = {
        title: payload.title,
        description: payload.description,
        category: payload.category,
        skills: payload.skills.map((s) => s.id),
        size: payload.size,
        date: payload.date,
        level: payload.level,
        budgetType: payload.budgetType,
        price: payload.price,
        minPrice: payload.minPrice,
        maxPrice: payload.maxPrice,
      };
      const notif = notifications.show({
        loading: true,
        bg: "brand",
        message: GlobalStrings.wait,
        title: GlobalStrings.info,
        autoClose: false,
        withCloseButton: false,
      });
      await fetch(`/api/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })
        .then((d) => d.json())
        .then((d) => {
          if (d.success) {
            localStorage.removeItem("postPayload");
            notifications.update({
              id: notif,
              color: d.success ? "teal" : "red",
              loading: false,
              message: d.message,
              title: GlobalStrings.info,
              icon: <IconCheck style={{ width: rem(18), height: rem(18) }} />,
              autoClose: 2000,
            });
            router.push("/post");
          }
        });
    } catch (error) {
      console.error(error);
    }
  };
  const nextStep = () => {
    if (step == 2) {
      let p = { ...payload, skills: selected };
      localStorage.setItem("postPayload", JSON.stringify(p));
    } else {
      localStorage.setItem("postPayload", JSON.stringify(payload));
    }
    router.push(`/post/${postNextStepString(step).url}`);
  };
  const active = () => {
    switch (step) {
      case 1:
        return payload.title != "" && payload.category != undefined;
      case 2:
        return selected.length > 0;
      case 3:
        return (
          payload.size != undefined &&
          payload.date[0] != null &&
          payload.date[1] != null &&
          payload.level
        );

      case 4:
        return (
          (payload.budgetType == BudgetType.hourly &&
            payload.minPrice <= payload.maxPrice &&
            payload.minPrice != 0 &&
            payload.maxPrice != 0) ||
          (payload.price != 0 && payload.budgetType == BudgetType.fixed)
        );

      case 5:
        return payload.description.length >= 50 || payload.file != undefined;
      default:
        return false;
    }
  };
  return (
    <Box>
      <Box mx={"auto"} maw={1000} py={16} px={20}>
        {step == 1 && (
          <PostTitleStep
            cateValue={payload.category}
            onCategory={(e) => setPayload((prev) => ({ ...prev, category: e }))}
            value={payload.title}
            onChange={(e) => {
              setPayload((prev) => ({ ...prev, title: e }));
            }}
          />
        )}
        {step == 2 && (
          <PostSkillStep selected={selected} setSkills={setSkills} />
        )}
        {step == 3 && (
          <PostScopeStep payload={payload} setPayload={setPayload} />
        )}
        {step == 4 && (
          <PostBudgetStep
            minPrice={payload.minPrice}
            maxPrice={payload.maxPrice}
            price={payload.price}
            type={payload.budgetType}
            change={(e, key) => {
              let numbers: (keyof PostType)[] = [
                "price",
                "minPrice",
                "maxPrice",
              ];
              if (numbers.includes(key)) {
                let value = 0;
                if (e != "")
                  value = Number.isNaN(parseInt(`${e.split(",").join("")}`))
                    ? 0
                    : parseInt(`${e.split(",").join("")}`);
                setPayload((prev) => ({ ...prev, [key]: value }));
              } else {
                setPayload((prev) => ({ ...prev, [key]: e }));
              }
            }}
          />
        )}
        {step == 5 && (
          <PostDescriptionStep
            description={payload.description}
            file={""}
            change={(e, key) => {
              if (key == "description")
                setPayload((prev) => ({ ...prev, [key]: e as string }));
            }}
          />
        )}
        {step == 6 && (
          <PostReviewStep
            payload={payload}
            setPayload={setPayload}
            back={() => {
              router.push(`/post/${postPrevStepString(step).url}`);
            }}
            send={send}
          />
        )}
      </Box>

      {step != 6 && (
        <Box
          w={"100%"}
          className="transition-all"
          bg={"gray"}
          mt={100}
          h={4}
          pos={"relative"}
        >
          <Box
            pos={"absolute"}
            left={0}
            right={`${100 - 20 * step}%`}
            className="rounded-full z-20"
            bg={"brand"}
            bottom={0}
            top={0}
          />
        </Box>
      )}
      {step != 6 && (
        <Group my={20} justify="space-between" mx={20}>
          <Button
            c={"brand"}
            radius={"xl"}
            px={24}
            color="gray"
            variant="light"
            onClick={() => {
              router.push(`/post/${postPrevStepString(step).url}`);
            }}
          >
            {GlobalStrings.back}
          </Button>

          <Button
            radius={"xl"}
            onClick={() => nextStep()}
            px={24}
            c={active() ? "white" : "darkGray"}
            disabled={!active()}
            bg={active() ? "brand" : "gray"}
          >
            {step == 5
              ? PostStrings.reviewJobPost
              : `${GlobalStrings.next + ":" + postNextStepString(step).name}`}
          </Button>
        </Group>
      )}
    </Box>
  );
}
