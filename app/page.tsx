import PhotoSlides from "@/components/PhotoSlides";
import { getPhotos } from "@/lib/PhotoApi";
import "swiper/css";

export default async function Home() {
  const all = await getPhotos();
  const shuffle = all.data.sort(() => Math.random() - 0.5);
  const data = shuffle.slice(0, 5);

  return (
    <div className="items-center p-8">
      <PhotoSlides data={data} />
    </div>
  );
}
