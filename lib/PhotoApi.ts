import { ImageProps } from "@/types/photos";
import axios from "axios";

// 모든 이미지 불러오는 API로 수정했습니다.
export const allPhotos = async () => {
  const res = await axios.get<ImageProps[]>(`https://picsum.photos/v2/list`);

  return res.data;
};


export const getPhotos = async() => {
  const res = await axios.get<ImageProps[]>(`https://picsum.photos/v2/list`);
  return res;
}

export const getPhoto = async(id: string) => {
  const res = await axios.get<ImageProps[]>(`https://picsum.photos/id/${id}/info`);
  return res;
}