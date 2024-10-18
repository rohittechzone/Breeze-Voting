"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleButton from "./components/GoogleButton";
import { User as FirebaseUser } from "firebase/auth";

export default function Home() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (email && email.endsWith("@snu.edu.in")) {
        setUser(result.user);
        setError("");
        router.push("/home");
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
      {!user ? (
        <div
          className="border-4 border-black bg-white custom-rounded"
          style={{ width: 534, height: 310 }}
        >
          <div>
            <div
              className="flex space-x-4 mt-6"
              style={{ marginLeft: 40, marginTop: 33 }}
            >
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
            <div style={{ width: 450, marginLeft: 40 }}>
              <GoogleButton onClick={handleGoogleLogin} />
            </div>

            {error && (
              <p style={{ color: "red", textAlign: "center" }}>{error}</p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <p>Redirecting...</p>
        </div>
      )}
    </div>
  );
}
