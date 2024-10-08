import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { corsHeaders } from '../_shared/cors.ts'
import { SmtpClient } from "https://deno.land/x/smtp/mod.ts";
import nodemailer from 'npm:nodemailer@6.9.10';

  Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
         // This is needed if you're planning to invoke your function from a browser.
        return new Response('ok', { headers: corsHeaders })
      }
try {

//    const client = new SmtpClient();
  // Set up transporter with your SMTP server
        const transporter = nodemailer.createTransport({
            host: 'smtp.titan.email', // Your SMTP host
            port: 465, // Your SMTP port (use 465 for SSL)
            secure: true, // true for 465, false for other ports
            auth: {
            user: 'contact@pdimarketplace.com', // Your SMTP username
            pass: 'T;1Wh@~$+7cei+o', // Your SMTP password
                 },
             });
       // Parse the request body
        const request = await req.json();
        console.log("Parsed request =>", request);
        const { subject, content, to, name, phone } = await request;
   
        await new Promise<void>((resolve, reject) => {
            transporter.sendMail({
                from: "contact@pdimarketplace.com",
                to,
                subject,
                text:`
                Dear PDI Support,

                An email issue has been reported on the support form.

                Customer Name: ${name} 
                Customer Phone: ${phone},

                Message: ${content}


                Please respond to the customer as soon as possible.

                Best regards,
                PDI Marketplace Kenya
                `,
                
              },(error) => {
                if (error) {
                  return reject(error);
                }
                resolve();
              });      
        })
      return new Response(
            JSON.stringify("Email sent successfully!"),
            { headers: { ...corsHeaders, "Content-Type": "application/json" },
          status:200,
          },
          )  

    } catch (error) {
        console.error("ERROR=>", error)
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          })  
    }


  });