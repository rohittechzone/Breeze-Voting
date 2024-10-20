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
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import Head from "next/head";
import checkAndStoreChoice from "@/server/voting";
import './styles.css';

export default function Home() {

const handleVote = async (choice: string) => {
  try {
    const result = await checkAndStoreChoice(choice);
    alert('Vote successful: ' + JSON.stringify(result));
  } catch (error) {
    alert('Vote failed: ' + error.message);
  }
};

  const router = useRouter();
  const [user, setUser] = useState<null | { name: string; email: string }>(null);
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

    
const handleVote = async (choice:string) => {
  try {
    const result = await checkAndStoreChoice(choice);
    alert('Vote successful: ' + JSON.stringify(result));
  } catch (error) {
    alert('Vote failed: ' + error.message);
  }
};
return () => unsubscribe();
  }, [router]);

  const signOut = () => {
    auth.signOut();
    router.push("/");
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Cedarville+Cursive&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet" />
        <title>Breeze 2025 Theme Voting</title>
      </Head>

      {user ? (
        <div>
          <p>Welcome, {user.name} ({user.email})</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}

      {/* Section 1*/}
      <section className="header-section">
        <div className="header-content">
          <h1>BREEZE</h1>
          <h1>
            <div className="year">2025</div>
          </h1>
          <p>Theme Voting</p>
        </div>
      </section>

      {/* Section 2*/}
      <section className="countdown-section">
        <div className="countdown-content">
          <div className="circle">
            <h2>04</h2>
            <p>Months Left</p>
          </div>
          <p>Scroll to Vote</p>
        </div>
      </section>

      {/* Section 3*/}
      <section className="voting-section">
        <h2>Here are your options</h2>
        <div className="options-container">
          
          <div className="option-card">
            <div className="box"></div>
            <h3>Techno-Cyberpunk</h3>
            <button onClick={() => handleVote("Techno-Cyberpunk")}>Vote</button>
          </div>
          
          <div className="option-card">
            <div className="box"></div>
            <h3>90's Sensations</h3>
            <button onClick={() => handleVote("Techno-Cyberpunk")}>Vote</button>
          </div>
          
          <div className="option-card">
            <div className="box"></div>
            <h3>Modern Desi</h3>
            <button onClick={() => handleVote("Techno-Cyberpunk")}>Vote</button>
          </div>
        </div>
      </section>
    </div>
  );
}
