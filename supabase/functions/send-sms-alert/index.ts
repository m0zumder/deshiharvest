import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface SMSRequest {
  userId: string;
  message: string;
  type: "order_received" | "order_confirmed" | "delivery_reminder" | "payment_received";
  title: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", { 
      status: 405, 
      headers: corsHeaders 
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseServiceKey) {
      throw new Error("Missing Supabase configuration");
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { userId, message, type, title }: SMSRequest = await req.json();

    console.log("SMS Alert request:", { userId, type, title });

    // Get user profile and phone number
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("phone, full_name")
      .eq("user_id", userId)
      .single();

    if (profileError) {
      console.error("Error fetching user profile:", profileError);
      throw new Error("User profile not found");
    }

    // Create notification record
    const { error: notificationError } = await supabase
      .from("notifications")
      .insert({
        user_id: userId,
        type: type,
        title: title,
        message: message,
        sms_sent: false, // Will be updated to true when SMS is actually sent
        read: false,
      });

    if (notificationError) {
      console.error("Error creating notification:", notificationError);
      throw new Error("Failed to create notification");
    }

    // For development/demo purposes, we'll simulate SMS sending
    // In production, you would integrate with a real SMS service like Twilio
    
    const smsSimulation = {
      to: profile.phone || "Not provided",
      message: `${title}\n\n${message}\n\nDeshiHarvest BD`,
      recipient: profile.full_name,
      timestamp: new Date().toISOString(),
      status: "simulated"
    };

    console.log("SMS would be sent:", smsSimulation);

    // In real implementation, you would:
    // 1. Use Twilio or local SMS gateway
    // 2. Send actual SMS
    // 3. Update notification record with sms_sent: true

    // For now, we'll simulate successful SMS sending
    const { error: updateError } = await supabase
      .from("notifications")
      .update({ sms_sent: true })
      .eq("user_id", userId)
      .eq("type", type);

    if (updateError) {
      console.error("Error updating notification:", updateError);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "SMS alert sent successfully (simulated)",
        simulation: smsSimulation,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error("Error in SMS alert function:", error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);