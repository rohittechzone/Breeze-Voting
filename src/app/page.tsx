"use client";

import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebaseConfig";
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (email !== null && email !== undefined && email.endsWith("@snu.edu.in")) {
        setUser(result.user);
        setError("");
      } else {
        setError("Please use your university email to sign in.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during sign-in.");
    }
  };
  const signOut = () => {
    auth.signOut();
    window.location.reload();
  };
  

  return (
    <div>
      {!user ? (
        <div>
          <button onClick={handleGoogleLogin}>Sign in with Google</button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      ) : (
        <div>
          <p>Welcome, {user.displayName} ({user.email})</p>
          <button onClick={signOut}>Sign out</button>
        </div>
      )}
    </div>
  );
}