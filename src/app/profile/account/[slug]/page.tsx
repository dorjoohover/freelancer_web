"use client";
import { InfoItem } from "@/components/profile/items";
import { UserDto } from "@/models/user.model";
import { ProfileListType } from "@/utils/enum";
import { DateFormat } from "@/utils/function";
import { Box, Title } from "@mantine/core";
import { useEffect, useState } from "react";

export default function ProfileDynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const [data, setData] = useState<UserDto>();
  const getData = async () => {
    const res = await fetch(
      `/api/user/${decodeURIComponent(params.slug)}`
    ).then((d) => d.json());
    setData(res.data);
  };
  useEffect(() => {
    getData();
  }, [params.slug]);
  return (
    <Box>
      <Title order={2}>
        {data?.lastname?.substring(0, 1).toUpperCase()}.{data?.firstname}
      </Title>
      <Title order={2}>{data?.email}</Title>
      <Title order={2}>Үнэлгээ: {data?.avgRating}</Title>
      <Title order={2}>Чиглэлүүд:</Title>
      {data?.uInfo?.role?.map((r, i) => {
        return (
          <Title key={i} order={4}>
            {r}
          </Title>
        );
      })}
      <Title order={2}>Боловсрол:</Title>
      {data?.uInfo?.educations?.map((r, i) => {
        return (
          <div key={i}>
            <Title order={4}>Сургууль:{r.school}</Title>
            <Title order={4}>Зэрэг:{r.degree}</Title>
            <Title order={4}>Улс:{r.region}</Title>
            <Title order={4}>Улс:{r.study}</Title>
            <Title order={4}>Эхэлсэн огноо:{r.startDate}</Title>
            <Title order={4}>Голч:{r.gpa}</Title>
            <Title order={4}>
              Эхэлсэн огноо:{DateFormat(new Date(r.startDate!))}
            </Title>
            {!r.endDate != null ? (
              <Title order={4}>Сурч байгаа</Title>
            ) : (
              <Title order={4}>
                Төгсөн огноо:{DateFormat(new Date(r.endDate!))}
              </Title>
            )}
          </div>
        );
      })}
      <Title order={2}>Туршлага:</Title>
      {data?.uInfo?.experiences?.map((r, i) => {
        return (
          <div key={i}>
            <Title order={4}>Байгууллагын нэр:{r.company}</Title>
            <Title order={4}>Байгууллагын чиглэл:{r.companyDirect}</Title>
            <Title order={4}>Мэргэжил:{r.profession}</Title>
            <Title order={4}>Цалин:{r.salary}</Title>
            <Title order={4}>Түвшин:{r.level}</Title>
            <Title order={4}>Эхэлсэн огноо:{DateFormat(r.startDate)}</Title>
            {r.currentWorking ? (
              <Title order={4}>Ажиллаж байгаа</Title>
            ) : (
              <Title order={4}>Төгсөн огноо:{DateFormat(r.endDate!)}</Title>
            )}
          </div>
        );
      })}
      <Title order={2}>Хэл:</Title>
      {data?.uInfo?.languages?.map((r, i) => {
        return (
          <div key={i}>
            <Title order={4}>Хэл:{r.language}</Title>
            <Title order={4}>Түвшин:{r.level}</Title>
          </div>
        );
      })}
    </Box>
  );
}
