import PhotoSlides from "@/components/PhotoSlides";
import axios from "axios";
import "swiper/css";

export interface ImageProps {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export const allPhotos = async () => {
  const res = await axios.get<ImageProps[]>(`https://picsum.photos/v2/list`);
  const shuffle = res.data.sort(() => Math.random() - 0.5);
  const data = shuffle.slice(0, 5);

  return data;
};

export default async function Home() {
  const data = await allPhotos();
  console.log(data);

  return (
    <div className="items-center p-8" style={{ height: "500px" }}>
      <PhotoSlides data={data} />
    </div>
  );
}
