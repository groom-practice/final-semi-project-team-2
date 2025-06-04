import Image from "next/image";

interface DetailProps{
  src: string;
  alt: string;
  photographer:{
    name: string;
  }
}

export default function PhotoDetail({src, alt, photographer}: DetailProps){
  return(
    <div className="overflow-hidden flex justify-center content-center m-4 p-6 gap-4 bg-white">
      <div>
        <Image 
          src={src}
          alt={alt}
          width={500}
          height={500}
          className="object-cover rounded-2xl"
           />
      </div>

      <div>
        <span className="text-xs text-gray-600">Photograph by:</span>
        <h2 className="text-2xl font-bold">{photographer.name}</h2>
      </div>
    </div>
  );
}