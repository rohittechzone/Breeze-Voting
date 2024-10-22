"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import { checkAndStoreChoice, get_votes } from "@/server/voting";
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
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import cyberpunk from "../photos/cyberpunk.jpeg";
import modern from "../photos/modern.jpeg";
import sensation from "../photos/sensation.jpeg";

const Cedarville = Cedarville_Cursive({ weight: "400", subsets: ["latin"] });
const fraunces = Fraunces({ subsets: ["latin"], style: "italic" });

const vanguard = localFont({
  src: "../fonts/Fontspring-DEMO-vanguardcf-bold.otf",
});

const acidg = localFont({
  src: "../fonts/FFF-AcidGrotesk-Normal-TRIAL.otf",
});

export default function Home() {
  const [votes, setVotes] = useState();

  const router = useRouter();
  const [user, setUser] = useState<null | { name: string; email: string }>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function setData() {
      let x: any = await get_votes();
      setVotes(x);
      console.log(x);
    }
    setData();
  }, []);

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
    completed,
  }: {
    hours: any;
    minutes: any;
    seconds: any;
    completed: boolean;
  }) => {
    if (completed){
      return <Countdown date={1729603800000} renderer={renderer2}></Countdown>
          
    }else{
      return (
        <>
          <span className="text-6xl sm:text-7xl text-[#FF3600] font-black">
            {zeroPad(hours)} : {zeroPad(minutes)} : {zeroPad(seconds)}
          </span>
          <div
            className={`${Cedarville.className} text-5xl text-white font-black`}
          >
            to go
          </div>
        </>
      );
    }
  };
  const renderer2 = ({
    hours,
    minutes,
    seconds,
    completed,
  }: {
    hours: any;
    minutes: any;
    seconds: any;
    completed: boolean;
  }) => {
    return (
      <>
        <span className="text-6xl sm:text-7xl text-[#FF3600] font-black">
          {zeroPad(hours)} : {zeroPad(minutes)} : {zeroPad(seconds)}
        </span>
        <div
          className={`${Cedarville.className} text-5xl text-white font-black`}
        >
          left to vote!
        </div>
      </>
    );
  };

  return (
    <div className="mb-4">
      <div className="bg-[#FFB800] flex justify-end px-12 py-8 ">
        <Sheet>
          <SheetTrigger>
            <CircleUserRound size="40" />
          </SheetTrigger>
          <SheetContent className="bg-black border-black">
            <Button
              variant="destructive"
              className="w-full mt-4"
              onClick={() => signOut()}
            >
              Sign Out?
            </Button>
          </SheetContent>
        </Sheet>
      </div>
      <div className="min-h-[50vh] bg-[#FFB800] flex flex-col justify-center items-center">
        <div className={`${vanguard.className} text-[#FF4E10] text-8xl`}>
          BREEZE
        </div>
        <div
          className={`${vanguard.className} text-[#FF8A00] text-8xl tracking-[0.13em]`}
        >
          2025
        </div>
        <div className={`${Cedarville.className} text-5xl text-white my-2`}>
          Theme Voting
        </div>
      </div>

      <div className="min-h-[50vh] bg-[#FF8A00] flex flex-col justify-between items-center py-8 gap-4">
        <div className="bg-[#FFB800] rounded-full px-2 aspect-square flex flex-col justify-center items-center">
          <Countdown date={1729578600000} renderer={renderer}></Countdown>
          {/* <div
            className={`${Cedarville.className} text-5xl text-white font-black`}
          >
            to go
          </div> */}
        </div>
        <div className="text-5xl text-white">
          Scroll <span className={`${fraunces.className}`}>to</span> vote
        </div>
      </div>

      <div className="min-h-[50vh] bg-white flex flex-col gap-4 justify-center items-center">
        <div className="">
          <div
            className={`${vanguard.className} text-8xl text-[#FF4E10] my-20 text-center`}
          >
            Here are your options
          </div>
          <div
            className={`${vanguard.className} text-4xl text-[#FF8A00] my-20 text-center`}
          >
            Press the theme name to vote
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
          <VotingCard img={sensation} name="90's Sensation" h={622} w={350} />
          <VotingCard img={modern} name="Modern Desi" h={622} w={350} />
          <VotingCard img={cyberpunk} name="Techno-Cyberpunk" h={622} w={350} />
        </div>
      </div>
      {votes && (
        <div className={`${acidg.className} mt-8`}>
          <div className="text-center">Current voting statistics</div>
          <div className={`flex flex-col mt-4  gap-6 px-10`}>
            <div className="flex justify-between">
              <div className="">1. Modern Desi</div>
              <div className="">{votes[2]} Votes</div>
            </div>
            <div className="flex justify-between">
              <div className="">2. Techno-Cyberpunk</div>
              <div className="">{votes[1]} Votes</div>
            </div>
            <div className="flex justify-between">
              <div className="">3. 90's Sensation</div>
              <div className="">{votes[0]} Votes</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
