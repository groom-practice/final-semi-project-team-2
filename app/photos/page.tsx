import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

interface Photo {
  id: string;
  author: string;
  width: number;
  height: number;
  url: string;
  download_url: string;
}

export default async function Page(){
  const response = await fetch("https://picsum.photos/v2/list");
  if(!response.ok){
    return(
      notFound()
    )
  }
  const photos = (await response.json()) as Photo[];

  return(
    <div className="grid grid-cols-3 grid-rows-1 place-items-center gap-4 p-6">
      {photos.map((photo) => (
        <div key={photo.id} className="overflow-hidden hover:scale-105 transition-all rounded-2xl">
          <Link href={`/photos/${photo.id}`}>
            <Image src={photo.download_url}
              width={600}
              height={600}
              alt={photo.author}
              className="h-full object-cover object-center"
              placeholder="blur"
              blurDataURL={photo.download_url} />
          </Link>
        </div>
      ))}
    </div>
  );
}