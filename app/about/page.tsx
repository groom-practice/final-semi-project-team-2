"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export default function AboutPage() {
  const team = [
    {
      name: "조연경",
      role: "Login페이지 / SignUp페이지 / Layout, Header 컴포넌트 구현",
      img: "/images/조연경.png",
    },
    {
      name: "김소연",
      role: "Home 페이지 (swiper 사용, photos api 사용해서 랜덤 5개 사진 띄우는 기능 구현)",
      img: "/images/김소연.png",
    },
    {
      name: "정세은",
      role: "Photos 페이지 / Photos 상세페이지 / 모달 구현",
      img: "/images/정세은.png",
    },
    {
      name: "정다정",
      role: "Posts 페이지 / Posts 상세페이지 / 모달 구현",
      img: "/images/정다정.png",
    },
    {
      name: "맹인영",
      role: "404 페이지 / about 페이지 구현",
      img: "/images/맹인영.png",
    },
  ];

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>2team 팀원 소개</h1>

      <Swiper spaceBetween={30} slidesPerView={1}>
        {team.map((member, index) => (
          <SwiperSlide key={index}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div style={{ maxWidth: "400px", width: "100%" }}>
                <img
                  src={member.img}
                  alt={member.name}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    marginBottom: "1rem",
                  }}
                />
              </div>

              <h3>{member.name}</h3>
              <p style={{ maxWidth: "500px", textAlign: "center" }}>
                {member.role}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
