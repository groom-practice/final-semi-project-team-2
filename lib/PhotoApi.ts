import { ImageProps } from "@/types/photos";
import axios from "axios";

export const allPhotos = async () => {
  const res = await axios.get<ImageProps[]>(`https://picsum.photos/v2/list`);
  const shuffle = res.data.sort(() => Math.random() - 0.5);
  const data = shuffle.slice(0, 5);

  return data;
};
