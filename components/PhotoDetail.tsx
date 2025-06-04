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
    <div>
      <div>
        <Image 
          src={src}
          alt={alt}
          width={500}
          height={500}
           />
      </div>

      <div>
        <span>Photograph by:</span>
        <h2>{photographer.name}</h2>
      </div>
    </div>
  );
}