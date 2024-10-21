import { Button } from "@/components/ui/button";
import ReactPlayer from "react-player/vimeo";

import checkAndStoreChoice from "@/server/voting";

import localFont from "next/font/local";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const acidg = localFont({
  src: "../fonts/FFF-AcidGrotesk-Normal-TRIAL.otf"
})

const handleVote = async (choice: string) => {
  try {
    const result = await checkAndStoreChoice(choice);
    toast({title: "Voted successfully", description: `You have successfully voted for ${choice}`})
  } catch (error: any) {
    toast({title: "Vote unsuccessful", description: "You have voted already!", variant: "destructive"})
  }
};

export default function Card({
  img,
  name,
  h,
  w,
}: {
  img: StaticImport;
  name: string;
  h: number;
  w: number;
}) {
  return (
    <div className="flex flex-col gap-4 justify-center">
      <div className="overflow-hidden rounded-xl bg-black">
        <Image src={img} height={h} width={w} alt="Theme image" />
        {/* <ReactPlayer url={src} playing loop height={h} width={w} volume={0}  /> */}
      </div>
      <Button className={`${acidg.className} rounded-xl text-xl hover:bg-[#FF8A00] bg-[#FABF12]`}  onClick={()=>handleVote(name)}>{name}</Button>
    </div>
  );
}
