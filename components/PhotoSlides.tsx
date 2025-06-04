"use client";
import { ImageProps } from "@/app/page";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

export default function PhotoSlides({ data }: { data: ImageProps[] }) {
  return (
    <Swiper slidesPerView={1}>
      {data.map((v) => (
        <SwiperSlide key={v.id}>
          <div>
            <Image
              src={v.download_url}
              width={v.width}
              height={v.height}
              alt={v.author}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
