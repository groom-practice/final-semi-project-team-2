import { ImageProps } from "@/types/photos";
import axios from "axios";

export const getPhotos = async () => {
  const res = await axios.get<ImageProps[]>(`https://picsum.photos/v2/list`);
  return res;
};

export const getPhoto = async (id: string) => {
  const res = await axios.get<ImageProps[]>(
    `https://picsum.photos/id/${id}/info`
  );
  return res;
};
