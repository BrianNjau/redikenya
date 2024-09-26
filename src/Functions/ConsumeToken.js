import { Supabase } from "./SupabaseClient";

export const consumeToken = async (userId) => {
  try {
    // Fetch subscription tokens
    const { data: subscriptionTokensData, error: subError } =
      await Supabase.from("subscriptions")
        .select("tokens")
        .eq("user_id", userId)
        .single();

    // Fetch pay-as-you-go tokens
    const { data: payAsYouGoTokensData, error: payError } = await Supabase.from(
      "tokens"
    )
      .select("token_count")
      .eq("user_id", userId)
      .single();
    if (subError || payError) {
      // throw new Error('Error fetching token balances');
      console.log(subError);
      console.log(payError);
    }
    const subscriptionTokens = subscriptionTokensData?.tokens || 0;
    const payAsYouGoTokens = payAsYouGoTokensData?.token_count || 0;

    // If there are subscription tokens, consume them first
    if (subscriptionTokens > 0) {
      const { data: updatedTokenData, error: consumeSubError } =
        await Supabase.from("subscriptions")
          .update({ tokens: subscriptionTokens - 1 })
          .eq("user_id", userId)
          .select();

      if (!consumeSubError) {
        //log activity
        await Supabase.from("activity_log")
          .insert([
            {
              user_id: userId,
              description: "Consumed 1 subscription token",
            },
          ])
          .select();

        // await logActivity(userId, 'Consumed one subscription token');
        return { success: true, message: "1 Subscription token consumed" };
      }
      return { success: false, message: consumeSubError };
    }

    //if paygo tokens are available, consume them
    if (payAsYouGoTokens > 0) {
      const { error } = await Supabase.from("tokens")
        .update({ token_count: payAsYouGoTokens - 1 })
        .eq("user_id", userId);
      if (!error) {
        //log activity
        await Supabase.from("activity_log")
          .insert([
            {
              user_id: userId,
              description: "Consumed 1 pay as you go token",
            },
          ])
          .select();

        return {
          success: true,
          message: "1 pay as you go token consumed ",
        };
      }
      return { success: false, message: error };
    }

    //if 0 tokens return err
    return {
      success: false,
      message: "No tokens available. Please subscribe or purchase more tokens",
    };
  } catch (error) {
    console.log(error);
  }
};
