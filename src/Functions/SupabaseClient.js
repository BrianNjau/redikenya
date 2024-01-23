import { createClient} from "@supabase/supabase-js";

const superbaseUrl = process.env.REACT_APP_SUPERBASEURL;
const superbaseKey = process.env.REACT_APP_SUPERBASEKEY;

// Create a single supabase client for interacting with your database
export const Supabase = createClient(superbaseUrl,superbaseKey);