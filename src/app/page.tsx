"use client";
import { business360, postCategories, smartContract } from "@/utils/values";
import { Box, Button, Group, Stack, TextInput, Title } from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Home() {
  const [tools, setTools] = useState(0);
  return (
    <main className="px-4 mt-4">
      <div className="relative p-4 overflow-hidden rounded-xl poster">
        <div className="text-white">
          <Title order={2} mb={20} ml={10}>
            FreeFlex
          </Title>
          <p>Хуучин дүрмийг март. Яг одоо зөв хүнээ сонго. </p>
          <p>Сэтгэл ханамжтай ажилла. </p>
        </div>
        <div className="flex justify-center w-full">
          <TextInput
            rightSectionPointerEvents="none"
            rightSection={<CiSearch />}
            label="Your email"
            placeholder="Your email"
            mb={"10%"}
            maw={"800px"}
            // mx={"auto"}
            // size="fulls"
            ta={"center"}
            width={"100%"}
            style={{
              width: "100% !important",
            }}
          />
        </div>
      </div>
      <Swiper
        pagination={
          {
            // dynamicBullets: true,
          }
        }
        // modules={[Pagination]}
        className="my-6 main-swiper"
        slidesPerView={7}
        spaceBetween={20}
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
      <Title>Нийтлэг үйлчилгээнүүд</Title>
      <Swiper
        pagination={
          {
            // dynamicBullets: true,
          }
        }
        navigation={true}
        modules={[Navigation]}
        className="my-6 main-swiper"
        slidesPerView={7}
        spaceBetween={20}
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

      <Title fs={"uppercase"} c="brand" ta={"center"} order={4}>
        Smart tool for enterprises
      </Title>
      <Title c={"blue"} maw={"60%"} ta={"center"} mx={"auto"}>
        Boost every part of your business- from proposal to payment
      </Title>

      <Group justify="space-between">
        <Button> Ухаалаг гэрээ</Button>
        <Button>Хуваарь, таск менежмент</Button>
        <Button>Нэхэмжлэл, төлбөр</Button>
        <Button> Ажлын түүх</Button>
      </Group>
      {tools === 0 && (
        <>
          {smartContract.map((e, i) => {
            return (
              <div
                key={i}
                className={`flex gap-10 ${
                  i % 2 == 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className="flex-1">
                  <Title order={2}>{e.title}</Title>
                  <p>{e.text}</p>
                  <Link href={e.href} className="flex items-center gap-4">
                    <span> Цааш үзэх </span>
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
        </>
      )}

      <Title ta={"center"}>БИЗНЕСЭЭ 360 ГРАДУСААР ХАР</Title>
      <div className="flex gap-5">
        {business360.map((b, i) => {
          return (
            <Stack key={i} flex={1} className="items-center">
              <div className="w-12 h-12 rounded-full">
                <img src={b.image} />
              </div>
              <Title order={3} c={"blue"} ta={"center"}>
                {b.title}
              </Title>
              <p className="text-center">{b.text}</p>
            </Stack>
          );
        })}
      </div>

      <Title ta={"center"}>FreeFlex Workplace Blog</Title>
      <p>
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
        className="my-6 main-swiper"
        slidesPerView={3}
        spaceBetween={20}
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

      <Box bg={"blue"}>
        <Box maw={400} className="flex items-center justify-center">
          <Title c={"white"}>Leave the busywork to Workspace</Title>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
            accusantium.
          </p>
          <TextInput />
          <Button>Get Started to Free</Button>
        </Box>
      </Box>
    </main>
  );
}
