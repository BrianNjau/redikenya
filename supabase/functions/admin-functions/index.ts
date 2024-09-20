import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'
// const supasecret = process.env.SUPABASE_SECRET_KEY

console.log("Admin functions is Listening!");

const supabase = createClient(
    // Supabase API URL - env var exported by default.
    Deno.env.get('SUPABASE_URL') ?? '',
    // Supabase API ANON KEY - env var exported by default.
    // Deno.env.get('SUPABASE_ANON_KEY') ?? '',

    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
 
{ global: { headers: { Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}` } } }

  );
 
  Deno.serve(async (req) => {
    try {
           // This is needed if you're planning to invoke your function from a browser.
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
      }
        console.log("request=>",req)
        const {userId} = await req.json();

        const {error} = await supabase.auth.admin.deleteUser(userId);
        if(error) {
            console.log("delete user error", error);
            throw new Error(error);
        }
        console.log('userid', userId);
        return new Response(
            JSON.stringify("Successfully deleted user"),
            { headers: { ...corsHeaders, "Content-Type": "application/json" },
          status:200,
          },
          )  

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          })  
    }


  });