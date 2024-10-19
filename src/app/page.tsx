"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import GoogleButton from "./components/GoogleButton";

export default function Login() {
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user.email?.endsWith("@snu.edu.in")) {
        router.push("/vote");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (
        email !== null &&
        email !== undefined &&
        email.endsWith("@snu.edu.in")
      ) {
        setError("");
        router.push("/vote");
      } else {
        setError("Please use your university email to sign in.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during sign-in.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="border-4 border-black bg-white custom-rounded login-outer-box">
        <div>
          <div className="flex space-x-4 mt-6 login-flex-space">
            <span className="text-black font-bold login-text-1 font-actor ">
              Hello,
            </span>
            <span className="text-black italic login-text-2">Welcome!</span>
          </div>
          <p className="login-text-sub font-Nohemi">
            Get ready for the biggest fest of SNU!
          </p>
        </div>

        <div>
          <div className="login-google-div">
            <GoogleButton onClick={handleGoogleLogin} />
          </div>

          {error && (
            <p style={{ color: "red", textAlign: "center" }}>{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
