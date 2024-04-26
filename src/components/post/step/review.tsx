"use client";
import { PostType } from "@/app/post/[slug]/page";
import { GlobalStrings, PostStrings } from "@/utils/string";
import {
  Box,
  Button,
  Divider,
  Group,
  List,
  Modal,
  rem,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import React, { useEffect, useState } from "react";
import { DetailCard } from "../card";
import { useDisclosure } from "@mantine/hooks";
import { IoMdClose } from "react-icons/io";
import { IconCircleCheck } from "@tabler/icons-react";
import {
  postCategories,
  postExampleTitles,
  postScopeDuration,
  postScopeLevel,
  postScopeSizes,
  skills,
} from "@/utils/values";
import { PostDescriptionCard } from "./descrition";
import { PostTitleCard } from "./title";
import { BudgetType } from "@/utils/enum";
import { priceFormat } from "@/utils/function";
import { PostSkillCard } from "./skill";
import { PostScopeCard } from "./scope";
import { PostBudgetCard } from "./budget";

export const PostReviewStep = ({
  payload,
  setPayload,
  back,
  send,
}: {
  send: () => void;
  back: () => void;
  payload: PostType;
  setPayload: React.Dispatch<React.SetStateAction<PostType>>;
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [copy, setCopy] = useState(payload);
  const [step, setStep] = useState<number | undefined>(undefined);
  const title = () => {
    switch (step) {
      case 1:
        return `Edit ${GlobalStrings.title.toLowerCase()}`;
      case 2:
        return `Edit ${GlobalStrings.description.toLowerCase()}`;
      case 3:
        return `Edit ${GlobalStrings.category.toLowerCase()}`;
      case 4:
        return `Edit ${GlobalStrings.skills.toLowerCase()}`;
      case 5:
        return `Edit ${GlobalStrings.scope.toLowerCase()}`;
      case 6:
        return `Edit ${GlobalStrings.budget.toLowerCase()}`;

      default:
        return "";
    }
  };
  useEffect(() => {
    setCopy(payload);
  }, [payload]);
  const save = () => {
    setPayload(copy);
    close();
  };
  const cancel = () => {
    setCopy(payload);
    close();
  };
  const post = () => {
    setPayload(copy);
    send();
  };
  return (
    <Box>
    
      <Group justify="space-between" mb={20}>
        <Title>{PostStrings.jobDetails}</Title>
        <Button
          bg={"brand"}
          radius={"xl"}
          px={24}
          onClick={() => {
            // router.push(`/post/${postPrevStepString(step).url}`);
          }}
        >
          {PostStrings.jobPost}
        </Button>
      </Group>
      <Box className="border  border-gray rounded-xl">
        <DetailCard
          onClick={() => {
            setStep(1);
            open();
          }}
        >
          <Title>{payload?.title}</Title>
        </DetailCard>
        <Divider my="md" />
        <DetailCard
          onClick={() => {
            setStep(2);
            open();
          }}
        >
          <Text>{payload?.description}</Text>
        </DetailCard>
        <Divider my="md" />
        <DetailCard
          py="16px"
          onClick={() => {
            setStep(3);
            open();
          }}
        >
          <SmallCard
            title={GlobalStrings.category}
            desc={`${
              postCategories.filter((c) => c.id == copy.category)?.[0]?.name
            }`}
          />
        </DetailCard>
        <DetailCard
          py="16px"
          onClick={() => {
            setStep(4);
            open();
          }}
        >
          <SmallCard
            title={GlobalStrings.skills}
            desc={`${copy.skills.map((skill) => skill.name).join(", ")}`}
          />
        </DetailCard>
        <DetailCard
          onClick={() => {
            setStep(5);
            open();
          }}
          py="16px"
        >
          <SmallCard
            title={GlobalStrings.scope}
            desc={`${
              postScopeSizes.filter((size) => size.id == copy.size)?.[0]?.name
            }, ${
              postScopeDuration.filter(
                (duration) => duration.id == copy.duration
              )?.[0]?.name
            }, ${
              postScopeLevel.filter((level) => level.id == copy.level)?.[0]
                ?.name
            }`}
          />
        </DetailCard>
        <DetailCard
          py="16px"
          onClick={() => {
            setStep(6);
            open();
          }}
        >
          <SmallCard
            title={GlobalStrings.budget}
            desc={`${
              copy.budgetType == BudgetType.hourly
                ? `₮${priceFormat(`${copy.minPrice ?? ""}`)} - ₮${priceFormat(
                    `${copy.maxPrice ?? ""}`
                  )} /${GlobalStrings.hr}`
                : `₮${priceFormat(`${copy.price ?? 0}`)}`
            }`}
          />
        </DetailCard>
        <Divider my="md" />
        <Modal
          size={"lg"}
          opened={opened}
          transitionProps={{ transition: "fade-down" }}
          onClose={close}
          title={<Title order={3}>{title()}</Title>}
          centered
          closeButtonProps={{
            icon: <IoMdClose size={20} fill="black" />,
          }}
        >
          {step == 1 && (
            <PostTitleCard
              onCategory={(e) => {}}
              category={false}
              value={copy.title}
              onChange={(e) => setCopy((prev) => ({ ...prev, title: e }))}
            />
          )}
          {step == 2 && (
            <PostDescriptionCard
              description={copy.description}
              change={(e, key) => setCopy((prev) => ({ ...prev, [key]: e }))}
            />
          )}
          {step == 3 && (
            <Select
              mb={20}
              value={
                postCategories.filter((c) => c.id == copy.category)?.[0].name
              }
              mt={20}
              labelProps={{
                fw: 600,
              }}
              label={GlobalStrings.category}
              data={postCategories.map((category) => category.name)}
              onChange={(e) => {
                if (e != null)
                  setCopy((prev) => ({
                    ...prev,
                    category: postCategories.filter((c) => c.name == e)?.[0]
                      .id,
                  }));
              }}
              searchable
            />
          )}
          {step == 4 && (
            <PostSkillCard
              add={(skill) => {
                let selected = [...copy.skills, skill];
                setCopy((prev) => ({ ...prev, skills: selected }));
              }}
              onChange={(e) => {
                let selected = [
                  ...copy.skills,
                  skills.filter((skill) => skill.name == e)?.[0],
                ];
                setCopy((prev) => ({ ...prev, skills: selected }));
              }}
              onClick={(id) => {
                let selected = skills.filter((skill) => skill.id != id);
                setCopy((prev) => ({ ...prev, skills: selected }));
              }}
              selected={copy.skills}
            />
          )}
          {step == 5 && (
            <PostScopeCard
              payload={copy}
              onChange={(e, key) => {
                setCopy((prev) => ({
                  ...prev,
                  [key]: e,
                }));
              }}
              onClick={(key) => setCopy((prev) => ({ ...prev, [key]: true }))}
            />
          )}
          {step == 6 && (
            <PostBudgetCard
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
                  setCopy((prev) => ({ ...prev, [key]: value }));
                } else {
                  setCopy((prev) => ({ ...prev, [key]: e }));
                }
              }}
              type={copy.budgetType}
              maxPrice={copy.maxPrice}
              minPrice={copy.minPrice}
              price={copy.price}
            />
          )}
          <Group justify="end">
            <Button
              bg={"transparent"}
              onClick={() => cancel()}
              c={"brand"}
              radius={"xl"}
            >
              {GlobalStrings.cancel}
            </Button>
            <Button bg={"brand"} onClick={() => save()} radius={"xl"}>
              {GlobalStrings.save}
            </Button>
          </Group>
        </Modal>
        <Group justify="space-between">
          <Button
            variant="light"
            radius={"lg"}
            color="gray"
            c={"brand"}
            onClick={back}
          >
            {GlobalStrings.back}
          </Button>
          <Group>
            {/* <Button bg={'transparent'}>{PostStrings.jobPost}</Button> */}
            <Button radius={"lg"} bg={"brand"} onClick={() => post()}>
              {PostStrings.postJob}
            </Button>
          </Group>
        </Group>
      </Box>
    </Box>
  );
};

export const SmallCard = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <Box>
      <Title mb={10} order={4}>
        {title}
      </Title>
      <Text c={"labelGray"}>{desc}</Text>
    </Box>
  );
};
