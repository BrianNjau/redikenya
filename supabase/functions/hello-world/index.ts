// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { corsHeaders } from '../_shared/cors.ts'
import { request } from "node:https";


console.log("Hello from Functions")

Deno.serve(async (req) => {
    // This is needed if you're planning to invoke your function from a browser.
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }
try {

  const options = {
    hostname: 'api.paystack.co',
    port: 443,
    path: '/subscription/:code/manage/link',
    method: 'GET',
    headers: {
      Authorization: 'Bearer sk_test_f9257c0971c1c84e5dc5087a7f7613a1b8581f08'
    }
  }
   
  const req = request(options, res => {
   
    let reqData = ''
    res.on('data', (chunk) => {
      reqData += chunk
    });
    console.log("response", reqData)
    res.on('end', () => {
      console.log("responsseeee", JSON.parse(reqData))
    })
   
    
  }).on('error', error => {
    console.error(error)
  });
  
  req.end()
  // const { name } = await req.json()

  return new Response(JSON.stringify(req), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 200,
  })
} catch (error) {
  return new Response(JSON.stringify({ error: error.message }), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    status: 400,
  })
}  
 
})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/hello-world' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
