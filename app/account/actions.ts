"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface FormState {
  success: boolean | null;
  message: string;
}

export async function updateUserProfile(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const id = user.id; // Always use user.id from session for profile updates for security
  const full_name = formData.get("fullName") as string;
  const username = formData.get("username") as string;
  const phone = formData.get("phone") as string;
  const avatar_url = formData.get("avatar_url") as string;

  if (!full_name || !username) {
    return { success: false, message: "Full Name and Username are required." };
  }

  const updates = {
    id: id,
    full_name,
    username,
    phone,
    avatar_url,
    updated_at: new Date().toISOString(),
  };

  try {
    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      console.error("Error updating profile:", error);
      return {
        success: false,
        message:
          error.message || "Failed to update profile due to a database error.",
      };
    }

    revalidatePath("/account");
    revalidatePath("/layout");

    return { success: true, message: "Profile updated successfully!" };
  } catch (err) {
    console.error("Unexpected error in updateUserProfile:", err);
    return { success: false, message: "An unexpected error occurred." };
  }
}
