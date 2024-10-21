"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import checkAndStoreChoice from "@/server/voting";
import VotingCard from "../components/VotingCard";
import Countdown, { zeroPad } from "react-countdown";
import localFont from "next/font/local";
import { Cedarville_Cursive, Fraunces } from "next/font/google";
import { CircleUserRound } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button";
import cyberpunk from "../photos/cyberpunk.jpeg"
import modern from "../photos/modern.jpeg"
import sensation from "../photos/sensation.jpeg"

const Cedarville = Cedarville_Cursive({ weight: "400", subsets: ["latin"] });
const fraunces = Fraunces({subsets: ["latin"], style: "italic"})

const vanguard = localFont({
  src: "../fonts/Fontspring-DEMO-vanguardcf-bold.otf",
});

const acidg = localFont({
  src: "../fonts/FFF-AcidGrotesk-Normal-TRIAL.otf"
})

export default function Home() {
  const handleVote = async (choice: string) => {
    try {
      const result = await checkAndStoreChoice(choice);
      alert("Vote successful: " + JSON.stringify(result));
    } catch (error: any) {
      alert("Vote failed: " + error.message);
    }
  };

  const router = useRouter();
  const [user, setUser] = useState<null | { name: string; email: string }>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email?.endsWith("@snu.edu.in")) {
        setUser({
          name: user.displayName || "",
          email: user.email,
        });
        setLoading(false);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const signOut = () => {
    auth.signOut();
    router.push("/");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  const renderer = ({
    hours,
    minutes,
    seconds,
  }: {
    hours: any;
    minutes: any;
    seconds: any;
  }) => {
    return (
      <span className="text-6xl sm:text-7xl text-[#FF3600] font-black">
        {zeroPad(hours)} : {zeroPad(minutes)} : {zeroPad(seconds)}
      </span>
    );
  };

  return (
    <div className="mb-4">
      <div className="bg-[#FFB800] flex justify-end px-12 py-8 ">
        <Sheet>
          <SheetTrigger>
            <CircleUserRound size="40"/>
          </SheetTrigger>
          <SheetContent className="bg-black border-black">
            <Button variant="destructive" className="w-full mt-4" onClick={()=>signOut()}>Sign Out?</Button>
          </SheetContent>
        </Sheet>
      </div>
      <div className="min-h-[50vh] bg-[#FFB800] flex flex-col justify-center items-center">
        <div className={`${vanguard.className} text-[#FF4E10] text-8xl`}>BREEZE</div>
        <div className={`${vanguard.className} text-[#FF8A00] text-8xl tracking-[0.13em]`}>2025</div>
        <div className={`${Cedarville.className} text-5xl text-white my-2`}>Theme Voting</div>
      </div>

      <div className="min-h-[50vh] bg-[#FF8A00] flex flex-col justify-between items-center py-8 gap-4">
        <div className="bg-[#FFB800] rounded-full px-2 aspect-square flex flex-col justify-center items-center">
          <Countdown date={1729571400000} renderer={renderer}></Countdown>
          <div className={`${Cedarville.className} text-5xl text-white font-black`}>to go</div>
        </div>
        <div className="text-5xl text-white">Scroll <span className={`${fraunces.className}`}>to</span> vote</div>
      </div>

      <div className="min-h-[50vh] bg-white flex flex-col gap-4 justify-center items-center">
        <div className="">
          <div className={`${vanguard.className} text-8xl text-[#FF4E10] my-20 text-center`}>Here are your options</div>
          <div className={`${vanguard.className} text-4xl text-[#FF8A00] my-20 text-center`}>Press the theme name to vote</div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
          <VotingCard
            img={sensation}
            name="90's Sensation"
            h={622}
            w={350}
          />
          <VotingCard
            img={modern}
            name="Modern Desi"
            h={622}
            w={350}
          />
          <VotingCard
            img={cyberpunk}
            name="Techno-Cyberpunk"
            h={622}
            w={350}
          />
        </div>
      </div>
    </div>
  );
}
