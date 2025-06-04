import PhotoSlides from "@/components/PhotoSlides";
import { allPhotos } from "@/lib/PhotoApi";
import "swiper/css";

export default async function Home() {
  const data = await allPhotos();
  console.log(data);

  return (
    <div className="items-center p-8">
      <PhotoSlides data={data} />
    </div>
  );
}
