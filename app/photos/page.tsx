import Link from "next/link";
import Image from "next/image";

interface Photo {
import { Link } from 'next/link';
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
      <div>사진을 불러오지 못했습니다.</div>
      const photos = (await response.json()) as Photo[];
    )
  }
  return(
    <div>
      {photos.map((photo) => (
        <div key={photo.id}>
          <Link href={`/photos/${photo.id}`}>
            <Image src={photo.download_url}
              width={600}
              height={600} />
          </Link>
        </div>
      ))}
    </div>
  );
}