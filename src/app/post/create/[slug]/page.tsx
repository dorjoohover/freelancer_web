"use client";
import { PostAboutStep } from "@/components/post/step/about";
import PostBudgetStep from "@/components/post/step/budget";
import { PostDescriptionStep } from "@/components/post/step/descrition";
import { PostReviewStep } from "@/components/post/step/review";
// import { PostBudgetStep } from "@/components/post/step/budget";
import { PostScopeStep } from "@/components/post/step/scope";
import { PostSkillStep } from "@/components/post/step/skill";
import { PostTitleStep } from "@/components/post/step/title";
import { UserDto } from "@/models/user.model";

import {
  BudgetType,
  PostScopeDuration,
  PostScopeLevel,
  PostScopeSize,
  PostStep,
  UserType,
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
  current: BudgetType;
  durationActive: boolean;
  level?: PostScopeLevel;
  levelActive: boolean;

  prices: {
    minPrice: number;
    maxPrice: number;
    price: number;
    budgetType: BudgetType;
  }[];
  description: string;
  file?: File;
  category?: string;
  gig: string;
  why: string;
};
export default function PostCreateDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const [user, setUser] = useState<UserDto>();
  const [payload, setPayload] = useState<PostType>({
    title: "",
    skills: [],
    why: "",
    gig: "",
    current: BudgetType.basic,
    size: undefined,
    sizeActive: true,
    duration: undefined,
    level: undefined,
    durationActive: true,
    levelActive: true,

    prices: [
      {
        minPrice: 10000,
        maxPrice: 30000,
        price: 0,
        budgetType: BudgetType.hourly,
      },
    ],

    date: [null, null],
    description: "",
    file: undefined,
    category: undefined,
  });
  const getUser = async () => {
    try {
      const res = await fetch("/api/user").then((d) => d.json());
      if (res.success) {
        setUser(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const [selected, setSkills] = useState<{ name: string; id: string }[]>([]);
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage.getItem("postPayload") != null
    ) {
      let data = JSON.parse(localStorage.getItem("postPayload") as string);

      setPayload(data);
    }

    getUser();
  }, []);
  useEffect(() => {
    if (payload?.skills?.length > 0) {
      setSkills(payload.skills);
    }
  }, [payload]);
  const step = postStep(
    (params.slug as PostStep) ?? PostStep.title,
    user?.type ?? UserType.FREELANCER
  );
  const router = useRouter();
  const send = async () => {
    try {
      let body =
        user?.type == UserType.CLIENT
          ? {
              title: payload.title,
              description: payload.description,
              category: payload.category,
              skills: payload.skills.map((s) => s.id),
              size: payload.size,
              date: payload.date,
              level: payload.level,
              prices: payload.prices,
            }
          : {
              title: payload.title,
              description: payload.description,
              category: payload.category,
              why: payload.why,
              gig: payload.gig,

              prices: payload.prices,
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
    if (step == 2 && user?.type === UserType.CLIENT) {
      let p = { ...payload, skills: selected };
      localStorage.setItem("postPayload", JSON.stringify(p));
    } else {
      localStorage.setItem("postPayload", JSON.stringify(payload));
    }

    router.push(
      `/post/create/${
        postNextStepString(step, user?.type ?? UserType.FREELANCER).url
      }`
    );
  };
  const active = () => {
    switch (step) {
      case 1:
        return payload.title != "" && payload.category != undefined;
      case 2:
        return user?.type == UserType.FREELANCER
          ? payload.why?.length > 50 && payload.gig?.length > 50
          : selected.length > 0;
      case 3:
        return user?.type == UserType.FREELANCER
          ? payload.prices.length > 2
          : payload.size != undefined &&
              payload.date[0] != null &&
              payload.date[1] != null &&
              payload.level;

      case 4:
        return user?.type == UserType.CLIENT
          ? payload.prices.length > 0
          : payload.description.length >= 50 || payload.file != undefined;

      case 5:
        return payload.description.length >= 50 || payload.file != undefined;
      default:
        return false;
    }
  };

  const last =
    (step == 5 && user?.type == UserType.CLIENT) ||
    (step == 4 && user?.type == UserType.FREELANCER);
  const review =
    (step == 6 && user?.type == UserType.CLIENT) ||
    (step == 5 && user?.type == UserType.FREELANCER);
  const budget =
    (step == 4 && user?.type == UserType.CLIENT) ||
    (step == 3 && user?.type == UserType.FREELANCER);

  return (
    <Box>
      <Box
        mx={"auto"}
        maw={1000}
        py={{ md: 16, base: 0 }}
        px={{ md: 20, base: 0 }}
      >
        {step == 1 && (
          <PostTitleStep
            step={user?.type == UserType.FREELANCER ? 4 : 5}
            cateValue={payload.category}
            onCategory={(e) => setPayload((prev) => ({ ...prev, category: e }))}
            value={payload.title}
            onChange={(e) => {
              setPayload((prev) => ({ ...prev, title: e }));
            }}
          />
        )}
        {step == 2 &&
          (user?.type == UserType.CLIENT ? (
            <PostSkillStep step={5} selected={selected} setSkills={setSkills} />
          ) : (
            <PostAboutStep
              step={4}
              change={(e, key) => {
                console.log(e, key);
                setPayload((prev) => ({ ...prev, [key]: e as string }));
              }}
              gig={payload.gig}
              why={payload.why}
            />
          ))}
        {step == 3 && user?.type == UserType.CLIENT && (
          <PostScopeStep step={5} payload={payload} setPayload={setPayload} />
        )}
        {budget && (
          <PostBudgetStep
            userType={user?.type}
            prices={payload.prices}
            change={(el, k) => {
              let e = el.split(",").join("");
              if (user?.type == UserType.CLIENT) {
                let prices = payload.prices.filter(
                  (p) =>
                    p.budgetType == BudgetType.fixed ||
                    p.budgetType == BudgetType.hourly
                );
                if (prices.length > 1) {
                  prices = [payload.prices[payload.prices.length - 1]];
                }
                setPayload((prev) => ({ ...prev, prices: prices }));
              } else {
                let prices = payload.prices.filter(
                  (p) =>
                    p.budgetType != BudgetType.fixed &&
                    p.budgetType != BudgetType.hourly
                );
                if (prices.length > 3) {
                  prices = payload.prices.slice(0, 3);
                }

                setPayload((prev) => ({ ...prev, prices: prices }));
              }
              let index = payload.prices.findIndex(
                (p) => p.budgetType == payload.current
              );
              if (index != -1) {
                payload.prices[index][k] = isNaN(parseInt(e)) ? 0 : parseInt(e);
                payload.prices[index]["budgetType"] = payload.current;
                setPayload((prev) => ({ ...prev }));
              } else {
                let prices = [
                  ...payload.prices,
                  {
                    minPrice:
                      k == "minPrice"
                        ? isNaN(parseInt(e))
                          ? 0
                          : parseInt(e)
                        : 0,
                    maxPrice:
                      k == "maxPrice"
                        ? isNaN(parseInt(e))
                          ? 0
                          : parseInt(e)
                        : 0,
                    price:
                      k == "price" ? (isNaN(parseInt(e)) ? 0 : parseInt(e)) : 0,
                    budgetType: payload.current,
                  },
                ];
                setPayload((prev) => ({ ...prev, prices: prices }));
              }
            }}
            current={payload.current}
            setCurrent={(e) => {
              if (!payload.prices.filter((a) => a.budgetType == e)[0]) {
                let prices = [
                  ...payload.prices,
                  {
                    minPrice: 0,
                    maxPrice: 0,
                    price: 0,
                    budgetType: e,
                  },
                ];
                setPayload((prev) => ({ ...prev, prices: prices }));
              }
              setPayload((prev) => ({ ...prev, current: e }));
            }}
          />
        )}
        {last && (
          <PostDescriptionStep
            step={user?.type == UserType.FREELANCER ? 4 : 5}
            description={payload.description}
            file={""}
            change={(e, key) => {
              if (key == "description")
                setPayload((prev) => ({ ...prev, [key]: e as string }));
            }}
          />
        )}
        {review && (
          <PostReviewStep
            type={user?.type ?? UserType.FREELANCER}
            payload={payload}
            setPayload={setPayload}
            back={() => {
              router.push(
                `/post/create/${
                  postPrevStepString(step, user?.type ?? UserType.FREELANCER)
                    .url
                }`
              );
            }}
            send={send}
          />
        )}
      </Box>

      {!review && (
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
            right={`${
              100 - (user?.type == UserType.FREELANCER ? 25 : 20) * step
            }%`}
            className="rounded-full z-20"
            bg={"brand"}
            bottom={0}
            top={0}
          />
        </Box>
      )}
      {!review && (
        <Group my={20} pb={20} justify="space-between" mx={20}>
          <Button
            c={"brand"}
            radius={"xl"}
            px={24}
            color="gray"
            variant="light"
            onClick={() => {
              router.push(
                `/post/create/${
                  postPrevStepString(step, user?.type ?? UserType.FREELANCER)
                    .url
                }`
              );
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
            {last
              ? PostStrings.reviewJobPost
              : `${
                  GlobalStrings.next +
                  ":" +
                  postNextStepString(step, user?.type ?? UserType.FREELANCER)
                    .name
                }`}
          </Button>
        </Group>
      )}
    </Box>
  );
}
