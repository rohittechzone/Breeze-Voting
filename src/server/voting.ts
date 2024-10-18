import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export default async function storeChoice(userChoice: string) {
  const { data, error } = await supabase
    .from('Votes')
    .insert([{ choice: userChoice }])
    .select();


  if (error) {
    console.error("Couldn't insert into table, error: ", error);
    throw error; 
  } else {
    console.log("Successfully inserted into the table data: ", data);
    return data;
  }
}