import PhotoDetail from "@/components/PhotoDetail";
import { getPhoto } from "@/lib/PhotoApi";
import { ImageProps } from "@/types/photos";
import { notFound } from "next/navigation";

export default async function Page({params}: {params: Promise<{id: string}>}){
  const {id} = await params;
  const response = await getPhoto(id);
  if(response.status === 404){
    notFound();
  }

  const photo = (response.data as unknown) as ImageProps;
  return(
    <div>
      <PhotoDetail
        src={photo.download_url}
        alt={photo.author}
        photographer={{
          name: photo.author
        }} />
    </div>
  );
}