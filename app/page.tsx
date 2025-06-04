import PhotoSlides from "@/components/PhotoSlides";
import { allPhotos } from "@/lib/PhotoApi";
import "swiper/css";

export default async function Home() {
  const all = await allPhotos();
  const shuffle = all.sort(() => Math.random() - 0.5);
  const data = shuffle.slice(0, 5);
  console.log(data);

  return (
    <div className="items-center p-8">
      <PhotoSlides data={data} />
    </div>
  );
}
