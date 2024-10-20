import { createClient } from "@supabase/supabase-js";
import { getAuth, signOut } from "firebase/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function checkAndStoreChoice(userChoice: string) {
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    const userId = user.uid;

    // Check if the user has already voted
    const { data: existingVote, error: checkError } = await supabase
      .from('Votes')
      .select('*')
      .eq('user_id', userId);

    if (checkError) {
      throw checkError;
    }

    if (existingVote.length > 0) {
      // User has already voted, sign them out
      throw new Error("You have already voted :')");
    }

    // User hasn't voted yet, store their choice
    const { data, error } = await supabase
      .from('Votes')
      .insert([{ vote: userChoice, voted_by: user.displayName, user_id: userId }])
      .select();

    if (error) {
      throw error;
    } else {
      return data;
    }
  } else {
    throw new Error("User not signed in :/");
  }
}

