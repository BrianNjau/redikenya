import { createClient} from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
export const Supabase = createClient('https://rvjftcbfxynpigjaeihj.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2amZ0Y2JmeHlucGlnamFlaWhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg5OTg2MjAsImV4cCI6MjAxNDU3NDYyMH0.ocMG319lWS4nKlSpSoJTkztOmbIwBZt64fHSylLeeL8')