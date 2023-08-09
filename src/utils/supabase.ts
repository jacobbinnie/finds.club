import { createClient } from "@supabase/supabase-js";
import { Database } from "../../database.types";

const supabase_url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabase_key = process.env.NEXT_PUBLIC_SUPABASE_KEY || "";

const supabaseClient = () => {
  const supabase = createClient<Database>(supabase_url, supabase_key);

  return supabase;
};

export { supabaseClient };
