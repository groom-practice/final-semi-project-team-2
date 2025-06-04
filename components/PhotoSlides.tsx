"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ImageProps } from "@/types/photos";

export default function PhotoSlides({ data }: { data: ImageProps[] }) {
  return (
    <Swiper
      slidesPerView={1}
      pagination={true}
      navigation={true}
      modules={[Pagination, Navigation]}
    >
      {data.map((v) => (
        <SwiperSlide key={v.id}>
          <div style={{ height: "80vh" }}>
            <Link href={`/photos/${v.id}`}>
              <Image
                src={v.download_url}
                width={v.width}
                height={v.height}
                alt={v.author}
              />
            </Link>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
