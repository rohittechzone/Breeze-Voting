// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth } from "../../../firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";
// import Head from "next/head";
// import './styles.css';

// export default function Home() {
//   const router = useRouter();
//   const [user, setUser] = useState<null | { name: string; email: string }>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user && user.email?.endsWith("@snu.edu.in")) {
//         setUser({
//           name: user.displayName || "",
//           email: user.email,
//         });
//         setLoading(false);
//       } else {
//         router.push("/");
//       }
//     });

//     return () => unsubscribe();
//   }, [router]);

//   const signOut = () => {
//     auth.signOut();
//     router.push("/");
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <Head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
//         <link href="https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap" rel="stylesheet" />
//         <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap" rel="stylesheet" />
//         <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
//         <title>Breeze 2025 Theme Voting</title>
//       </Head>

//       {user ? (
//         <div>
//           <p>Welcome, {user.name} ({user.email})</p>
//           <button onClick={signOut}>Sign out</button>
//         </div>
//       ) : (
//         <p>Redirecting to login...</p>
//       )}

//       {/* Section 1*/}
//       <section className="header-section">
//         <div className="header-content">
//           <h1>BREEZE</h1>
//           <h1>
//             <div className="year">2025</div>
//           </h1>
//           <p>Theme Voting</p>
//         </div>
//       </section>

//       {/* Section 2*/}
//       <section className="countdown-section">
//         <div className="countdown-content">
//           <div className="circle">
//             <h2>04</h2>
//             <p>Months Left</p>
//           </div>
//           <p>Scroll to Vote</p>
//         </div>
//       </section>

//       {/* Section 3*/}
//       <section className="voting-section">
//         <h2>Here are your options</h2>
//         <div className="options-container">

//           <div className="option-card">
//             <div className="box"></div>
//             <h3>Techno-Cyberpunk</h3>
//             <button>Vote</button>
//           </div>

//           <div className="option-card">
//             <div className="box"></div>
//             <h3>90's Sensations</h3>
//             <button>Vote</button>
//           </div>

//           <div className="option-card">
//             <div className="box"></div>
//             <h3>Modern Desi</h3>
//             <button>Vote</button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { auth } from "../../../firebaseConfig";
// import { onAuthStateChanged } from "firebase/auth";
// import Head from "next/head";
// import checkAndStoreChoice from "@/server/voting";
// import './styles.css';

// export default function Home() {

// const handleVote = async (choice: string) => {
//   try {
//     const result = await checkAndStoreChoice(choice);
//     alert('Vote successful: ' + JSON.stringify(result));
//   } catch (error) {
//     alert('Vote failed: ' + error.message);
//   }
// };

//   const router = useRouter();
//   const [user, setUser] = useState<null | { name: string; email: string }>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       if (user && user.email?.endsWith("@snu.edu.in")) {
//         setUser({
//           name: user.displayName || "",
//           email: user.email,
//         });
//         setLoading(false);
//       } else {
//         router.push("/");
//       }
//     });

// const handleVote = async (choice:string) => {
//   try {
//     const result = await checkAndStoreChoice(choice);
//     alert('Vote successful: ' + JSON.stringify(result));
//   } catch (error) {
//     alert('Vote failed: ' + error.message);
//   }
// };
// return () => unsubscribe();
//   }, [router]);

//   const signOut = () => {
//     auth.signOut();
//     router.push("/");
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div>
//       <Head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//         <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
//         <link href="https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap" rel="stylesheet" />
//         <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap" rel="stylesheet" />
//         <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
//         <title>Breeze 2025 Theme Voting</title>
//       </Head>

//       {user ? (
//         <div>
//           <p>Welcome, {user.name} ({user.email})</p>
//           <button onClick={signOut}>Sign out</button>
//         </div>
//       ) : (
//         <p>Redirecting to login...</p>
//       )}

//       {/* Section 1*/}
//       <section className="header-section">
//         <div className="header-content">
//           <h1>BREEZE</h1>
//           <h1>
//             <div className="year">2025</div>
//           </h1>
//           <p>Theme Voting</p>
//         </div>
//       </section>

//       {/* Section 2*/}
//       <section className="countdown-section">
//         <div className="countdown-content">
//           <div className="circle">
//             <h2>04</h2>
//             <p>Months Left</p>
//           </div>
//           <p>Scroll to Vote</p>
//         </div>
//       </section>

//       {/* Section 3*/}
//       <section className="voting-section">
//         <h2>Here are your options</h2>
//         <div className="options-container">

//           <div className="option-card">
//             <div className="box"></div>
//             <h3>Techno-Cyberpunk</h3>
//             <button onClick={() => handleVote("Techno-Cyberpunk")}>Vote</button>
//           </div>

//           <div className="option-card">
//             <div className="box"></div>
//             <h3>90's Sensations</h3>
//             <button onClick={() => handleVote("Techno-Cyberpunk")}>Vote</button>
//           </div>

//           <div className="option-card">
//             <div className="box"></div>
//             <h3>Modern Desi</h3>
//             <button onClick={() => handleVote("Techno-Cyberpunk")}>Vote</button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

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

    // const handleVote = async (choice: string) => {
    //   try {
    //     const result = await checkAndStoreChoice(choice);
    //     alert("Vote successful: " + JSON.stringify(result));
    //   } catch (error: any) {
    //     alert("Vote failed: " + error.message);
    //   }
    // };
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
          <div className={`${vanguard.className} text-4xl text-[#FF8A00] my-20 text-center`}>Press one of the yellow buttons to vote</div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
          <VotingCard
            src="https://vimeo.com/1021838035"
            name="90's Sensation"
            h={622}
            w={350}
          />
          <VotingCard
            src="https://vimeo.com/1021838143"
            name="Modern Desi"
            h={622}
            w={350}
          />
          <VotingCard
            src="https://vimeo.com/1021865271?share=copy"
            name="Techno-Cyberpunk"
            h={622}
            w={350}
          />
        </div>
      </div>
    </div>
  );
}
