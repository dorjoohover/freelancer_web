"use client";
import { business360, postCategories, smartContract } from "@/utils/values";
import {
  Badge,
  Box,
  Button,
  Card,
  Group,
  Image,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  const [tools, setTools] = useState(0);
  return (
    <main className=" mt-4">
      <div className="mx-4">
        <div className="relative p-4 overflow-hidden rounded-xl poster ">
          <Box mt={{ sm: 0, base: "20%" }} className="text-white">
            <Title order={2} mb={32} ml={10}>
              FreeFlex
            </Title>
            <p className="text-[20px]">
              Хуучин дүрмийг март. Яг одоо зөв хүнээ сонго.{" "}
            </p>
            <p className="text-[20px]">Сэтгэл ханамжтай ажилла. </p>
          </Box>
          <div className="w-full">
            <TextInput
              rightSectionPointerEvents="none"
              rightSection={<CiSearch />}
              label="Your email"
              labelProps={{
                c: "white",
              }}
              withAsterisk
              placeholder="Your email"
              mb={"10%"}
              maw={{ lg: "800px", base: "100%", xs: "80%" }}
              // mx={"auto"}
              // size="fulls"
              ta={"center"}
              width={"100%"}
              mx={"auto"}
              style={{
                width: "100% !important",
              }}
            />
          </div>
        </div>
      </div>
      <Box maw={1200} mx="auto" px={16}>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1000: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 7,
              spaceBetween: 20,
            },
          }}
          slidesPerView={2}
          spaceBetween={20}
          className="my-6 main-swiper"
          autoplay
        >
          {postCategories.map((cate, i) => {
            return (
              <SwiperSlide
                key={i}
                className={`px-4 w-[150px] flex flex-col justify-between py-5 rounded-md shadow-lg sho drop-shadow-md`}
              >
                <div className="w-10 h-10 ">{cate.icon}</div>
                <p className="text-start">{cate.name}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
      <Box maw={1200} mx={"auto"} px={16}>
        <Title order={2} mb={{ lg: 50, md: 40 }}>
          Нийтлэг үйлчилгээнүүд
        </Title>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            1000: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 7,
              spaceBetween: 20,
            },
          }}
          slidesPerView={2}
          spaceBetween={20}
          navigation={true}
          modules={[Navigation]}
          className="my-6 main-swiper"
          autoplay
        >
          {postCategories.map((cate, i) => {
            return (
              <SwiperSlide
                key={i}
                className={`px-4 w-[150px] flex flex-col justify-between py-5 rounded-md shadow-lg sho drop-shadow-md`}
              >
                <div className="w-10 h-10 ">{cate.icon}</div>
                <p className="text-start">{cate.name}</p>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>
      <Box mx={16}>
        <Title
          tt={"uppercase"}
          c="brand"
          ta={"center"}
          my={{ md: 20, lg: 40 }}
          order={4}
        >
          Smart tool for enterprises
        </Title>
        <Title
          mb={{ lg: 50, base: 40 }}
          c={"blue"}
          maw={{ lg: "60%", md: "80%", base: "100%" }}
          ta={"center"}
          mx={"auto"}
        >
          Boost every part of your business- from proposal to payment
        </Title>

        <Group
          justify="space-between"
          maw={1200}
          mx={"auto"}
          mb={{ lg: 50, md: 40 }}
        >
          <Button w={{ base: "100%", xs: "auto" }}> Ухаалаг гэрээ</Button>
          <Button w={{ base: "100%", xs: "auto" }}>
            Хуваарь, таск менежмент
          </Button>
          <Button w={{ base: "100%", xs: "auto" }}>Нэхэмжлэл, төлбөр</Button>
          <Button w={{ base: "100%", xs: "auto" }}> Ажлын түүх</Button>
        </Group>
        {tools === 0 && (
          <Box maw={1200} mx={"auto"}>
            {smartContract.map((e, i) => {
              return (
                <div
                  key={i}
                  className={`flex gap-10 ${
                    i % 2 == 0 ? "flex-row" : "flex-row-reverse"
                  } max-[600px]:flex-col  max-[600px]:mb-4`}
                >
                  <div className="flex-1 mt-12">
                    <Title order={2} mb={{ lg: 40, md: 30 }}>
                      {e.title}
                    </Title>
                    <Text mb={{ lg: 30, md: 20 }}>{e.text}</Text>
                    <Link
                      href={e.href}
                      className="flex ml-8 items-center gap-4"
                    >
                      <span className="font-bold text-brand"> Цааш үзэх </span>
                      <span>
                        <IoIosArrowForward />
                      </span>
                    </Link>
                  </div>
                  <div className="flex-1 ">
                    <img src={e.image} className="object-cover" alt="" />
                  </div>
                </div>
              );
            })}
          </Box>
        )}
      </Box>

      <Box mx={16} mb={{ md: 0, base: 40 }}>
        <Title ta={"center"} my={{ md: 40, lg: 50 }}>
          БИЗНЕСЭЭ 360 ГРАДУСААР ХАР
        </Title>
        <Box
          maw={1200}
          mx={"auto"}
          className="flex max-[1024px]:flex-col gap-5"
        >
          {business360.map((b, i) => {
            return (
              <Box
                key={i}
                flex={1}
                className="flex flex-col gap-4  items-center"
              >
                <div className="w-12 h-12 rounded-full">
                  <img src={b.image} />
                </div>
                <Title order={3} c={"blue"} ta={"center"}>
                  {b.title}
                </Title>
                <p className="text-center">{b.text}</p>
              </Box>
            );
          })}
        </Box>
      </Box>
      <Box maw={1200} mx={"auto"}>
        <Title ta={"center"} my={{ md: 40, lg: 50 }}>
          FreeFlex Workplace Blog
        </Title>
        <p className="text-center w-[70%] max-[800px]:w-[100%] mx-auto mb-12">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quia quam
          deleniti tempore sequi quod molestias nostrum facilis voluptatum
          perspiciatis, quis nisi quae distinctio placeat libero unde eos ullam
          eum cupiditate dicta ex, praesentium atque, odio ad ratione? Sequi,
          earum accusamus?
        </p>
        <Swiper
          pagination={
            {
              // dynamicBullets: true,
            }
          }
          // modules={[Pagination]}
          className="my-6 swiper"
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1000: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
            1200: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
          slidesPerView={1}
          spaceBetween={20}
          autoplay
        >
          {postCategories.map((cate, i) => {
            return (
              <SwiperSlide
                key={i}
                className={`px-4 flex flex-col justify-between py-5 rounded-md shadow-lg sho drop-shadow-md`}
              >
                <Card shadow="sm" padding="lg" radius="md" withBorder>
                  <Card.Section>
                    <Image
                      src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
                      height={160}
                      alt="Norway"
                    />
                  </Card.Section>

                  <Group justify="space-between" mt="md" mb="xs">
                    <Text fw={500}>Norway Fjord Adventures</Text>
                    <Badge color="pink">On Sale</Badge>
                  </Group>

                  <Text size="sm" c="dimmed">
                    With Fjord Tours you can explore more of the magical fjord
                    landscapes with tours and activities on and around the
                    fjords of Norway
                  </Text>

                  <Button color="blue" fullWidth mt="md" radius="md">
                    Book classic tour now
                  </Button>
                </Card>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Box>

      <Box
        bg={"blue"}
        pt={{ lg: 100, base: 80 }}
        px={16}
        pb={{ lg: 50, base: 40 }}
      >
        <Box
          maw={500}
          className="flex items-center flex-col justify-center"
          mx={"auto"}
        >
          <Title ta={"center"} c={"white"}>
            Leave the busywork to Workspace
          </Title>
          <p className="text-center text-white my-6">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            accusantium.
          </p>
          <Box
            className="flex  gap-0 max-[600px]:flex-col max-[600px]:gap-4"
            w={"100%"}
          >
            <TextInput
              radius={0}
              variant="light"
              flex={2}
              bg={"none"}
              placeholder="Цахим хаягаа оруулна уу"
              className="rounded-r-none rounded-l-sm"
              style={{
                border: "1px solid gray",
                overflow: "hidden",
                borderTopLeftRadius: "5px",
                borderBottomLeftRadius: "5px",
              }}
            />
            <Button
              flex={1}
              variant="light"
              className="border h-[38px] max-[600px]:py-4 border-gray"
              bg={"white"}
              radius={0}
              color="brand"
            >
              Get Started to Free
            </Button>
          </Box>
        </Box>
      </Box>
    </main>
  );
}
