import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import * as crypto from 'node:crypto'
import { createClient, SupabaseClient } from 'jsr:@supabase/supabase-js@2'

// const supasecret = process.env.SUPABASE_SECRET_KEY

console.log("Paystack Webhook is Listening!")

const supabase = createClient(
  // Supabase API URL - env var exported by default.
  Deno.env.get('SUPABASE_URL') ?? '',
  // Supabase API ANON KEY - env var exported by default.
  Deno.env.get('SUPABASE_ANON_KEY') ?? '',
);


Deno.serve(async (req) => {
  try {

    const { event, data } = await req.json();
    console.log("event", event);
    console.log("data", data);
    // handle successful customer subscription transaction
    if(event==="charge.success"){
      //check type of subscription
      if(Object.keys(data.plan).length === 0){
        // purchase token via pay as you go 

        // Insert the token purchase record
     const {data:supaData, error} =  await supabase.from("token_purchases").insert([
          {
            user_id: data.metadata["user_id"],
            token_amount: data.metadata["token_amount"],
            transaction_id: data["reference"],
          },
        ]);

        if(error) console.log("err purchasing token via paygo", error);
      } else {
        // subscription transaction
        //check if subscription exists
        const { data: subscribed_user} = await supabase
        .from('subscriptions')
        .select("*")
        .eq('user_id', data.metadata["user_id"]);
      
        // create recurring subscription transaction here 
        if(subscribed_user.length>0){
          console.log("run recurring ");
         const {data:subData, error} =  await supabase.from('subscription_payments').insert([
            {
              user_id: data.metadata["user_id"],
              token_amount: 10,
              period: data.plan["interval"],
              email: data.customer["email"],
              subscription_amount: data.amount/100,
              paid_at: data.paid_at,
              status: data.status,
              transaction_event: event,
              transaction_reference: data.reference,
              transaction_type: "recurring"
            }
          ]);
          if (error) throw new Error(`Recurring payment insertion failed: ${error.message}`);
          console.log("supadata", subData);
        
        }
        



        if(subscribed_user.length===0){
          // need to insert subscription create 
          console.log("run create sub");
          const {data:subData, error} = await supabase.from("subscription_payments").insert([
          {
            user_id: data.metadata["user_id"],
            token_amount: 10,
            period: data.plan["interval"],
            email: data.customer["email"],
            subscription_amount: data.amount/100,
            paid_at: data.paid_at,
            status: data.status,
            transaction_event: event,
            transaction_reference: data.reference,
            transaction_type: "create"
          }
        ]);
        // if (error) throw new Error(`Create payment insertion failed: ${error.message}`);
        console.log("supadata", subData);
        console.log("err", error);
        }
        

      }
    }



    

    //validate event
    // const hash = crypto.createHmac('sha512', 'sk_test_f9257c0971c1c84e5dc5087a7f7613a1b8581f08').update(JSON.stringify(req.body)).digest('hex');
    // console.log("hash from script=>", hash);
    // console.log("request", request.headers);
    // console.log("paystack request hash =>", req.headers['x-paystack-signature']);
    // if (hash === req.headers['x-paystack-signature']) {
    //   // Retrieve the request's body
       
    //   // Do something with event  
    //   console.log("event=> ", event)

    //   }
      // res.send(200);
    // const { name } = await req.json()
    // const data = {
    //   message: `Hello ${name}!`,
    // }
  
    return new Response(
      JSON.stringify(event),
      { headers: { "Content-Type": "application/json" },
    status:200,
    },
    )  

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { 'Content-Type': 'application/json' },
      status: 400,
    })
  }



})
