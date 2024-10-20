"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function Home() {
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
      {user ? (
        <div>
          <p>Welcome, {user.name} ({user.email})</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      ) : (
        <p>Redirecting to login...</p>
      )}
    </div>
  );
}