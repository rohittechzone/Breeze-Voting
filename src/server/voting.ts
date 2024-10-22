import { toast } from "@/hooks/use-toast";
import { createClient } from "@supabase/supabase-js";
import { getAuth, signOut } from "firebase/auth";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export async function checkAndStoreChoice(userChoice: string) {
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
      toast({title: "Vote unsuccessful", description: "You have voted already", variant: "destructive"})
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

export async function get_votes(): Promise<number[]> {
  let ans: number[] = []
  let x = (await supabase.from("Votes").select("vote", {count: "exact"}).eq("vote", "90's Sensation")).count
  ans.push(x?x:0)
  x = (await supabase.from("Votes").select("vote", {count: "exact"}).eq("vote", "Techno-Cyberpunk")).count
  ans.push(x?x:0)
  x = (await supabase.from("Votes").select("vote", {count: "exact"}).eq("vote", "Modern Desi")).count
  ans.push(x?x:0)
  ans.sort()
  return ans
}