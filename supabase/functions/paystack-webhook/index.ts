import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'jsr:@supabase/supabase-js@2'

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
    

    if(event==="subscription.create"){
      console.log("created subscription with this =>", data)
      // handle subscription insertion and insert the subscription code

      const {data: user_id, error:userError} = await  supabase.rpc(
        "get_user_id_by_email",
        {
          email: data.customer.email,
        }
      );
      if(user_id)console.log("User ID that subscribed =>", user_id[0].id);
      if(userError) console.log("Get user id error ", userError);


      if(user_id){
            //check if subscription exists
      const { data: subscribed_user} = await supabase
      .from('subscriptions')
      .select("*")
      .eq('user_id', user_id[0].id);
  // 
  if(subscribed_user.length>0){
    const {data:subData, error} = await supabase.from("subscriptions").update(
      {
     
        tokens:  0,
        subscription_code: data.subscription_code,
        next_payment_date: data.next_payment_date,
        created_at: data.createdAt,
        expires_at: new Date(new Date(data.createdAt).setMonth(new Date(data.createdAt).getMonth() + 1)), //created + 1 month
        period: data.plan["interval"],
        status: data.status,
        
      }
    ).eq("user_id", user_id[0].id);

    console.log("updated new sub", subData)
    console.log("updated new sub err", error)
  } else
    if(subscribed_user.length===0){
  const {data:subData, error} = await supabase.from("subscriptions").insert([
    {
      user_id: user_id[0].id,
      tokens:  0, // tokens will be added by the transaction event
      customer_ref: data.customer.customer_code,
      period: data.plan["interval"],
     
      subscription_code: data.subscription_code,
      next_payment_date: data.next_payment_date,
      created_at: data.createdAt,
      expires_at: new Date(new Date(data.createdAt).setMonth(new Date(data.createdAt).getMonth() + 1)), //created + 1 month
     
      status: data.status,
     
    }
  ]);
  console.log("create subscription i", subData);
  console.log("err", error);
}

      }
   

      // await supabase.from('subscriptions').insert([{

      // }])


    }
    
    
    // handle successful customer subscription transaction
    if(event==="charge.success"){
      //check type of subscription
      if(Object.keys(data.plan).length === 0){
        // purchase token via pay as you go 

        // Insert the token purchase record
     const {data:supaData, error} =  await supabase.from("token_purchases").insert([
          {
            user_id: data.metadata.customer[2]["value"],
            token_amount: data.metadata.customer[3]["value"],
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
        .eq('user_id', data.metadata.customer[2]["value"]);
      
        // create recurring subscription transaction here 
        if(subscribed_user.length>0){
          console.log("subscription payment");
         const {data:subData, error} =  await supabase.from('subscription_payments').insert([
            {
              user_id: data.metadata.customer[2]["value"],
              token_amount: data.metadata.customer[3]["value"],
              customer_ref: data.customer.customer_code,
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
          console.log("create subscription event came late throw error and relisten");
        //   const {data:subData, error} = await supabase.from("subscription_payments").insert([
        //   {
        //     user_id: data.metadata.customer[2]["value"],
        //     token_amount:  data.metadata.customer[3]["value"],
        //     customer_ref: data.customer.customer_code,
        //     period: data.plan["interval"],
        //     email: data.customer["email"],
        //     subscription_amount: data.amount/100,
        //     paid_at: data.paid_at,
        //     status: data.status,
        //     transaction_event: event,
        //     transaction_reference: data.reference,
        //     transaction_type: "create"
        //   }
        // ]);
         if (error) throw new Error(`Create payment insertion failed: ${error.message}`);

        }
      }
    }

    if(event === "invoice.update"){
      //result after subscription attempt
      if(data.transaction.status==="success"){
        await supabase
        .from('subscriptions').update({next_payment_date: data.subscription.next_payment_date}).eq('customer_ref', data.customer.customer_code);

      }


    }

    // listen for unsubscribe events
    if(event==="subscription.not_renew"){
      //subscription cancelled but the renewal date is not yet reached allow continued use of available token
       const {data:subData, error} = await supabase.from("subscriptions").update({status:"Not Renewing"}).eq("customer_ref", data.customer["customer_code"]);
      console.log("subData", subData);
      console.log("err", error);
    }
    if(event==="subscription.disable"){
      //subscription date reached and state is still cancelled disable subscription and expire the tokens
      const {data:subData, error} = await supabase.from("subscriptions").update({status:"Disabled", tokens:0}).eq("customer_ref", data.customer["customer_code"]);
      console.log("subData", subData);
      console.log("err", error);
    }

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
