// actions.ts
"use server";
import { Contact } from "@/model/Contact";
import { createClient } from "@/utils/supabase/server";

import { revalidatePath } from "next/cache"; // ADDED THIS IMPORT

// Define the FormState interface (make sure this matches the one in contact-form.tsx)
interface FormState {
  success: boolean | null;
  message: string;
}

export async function getContacts(): Promise<Contact[] | null | unknown> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("user_id", user?.id);

  if (error) {
    console.log(error.message);
  }

  return data;
}

// MODIFIED: saveContact to accept previousState and return FormState
export async function saveContact(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;

  // Basic validation (added for robust error handling)
  if (!full_name || !email) {
    return { success: false, message: "Name and email are required." };
  }
  if (!email.includes("@")) {
    // Simple email format check
    return { success: false, message: "Invalid email format." };
  }

  const contactToInsert = {
    user_id: user?.id || "",
    name: full_name,
    email: email,
  };

  try {
    const { data, error } = await supabase
      .from("contacts")
      .insert(contactToInsert);

    console.log(data);

    if (error) {
      console.error("Error saving contact:", error); // Use console.error for errors
      return {
        success: false,
        message:
          error.message || "Failed to save contact due to a database error.",
      };
    }

    // Revalidate path after successful save to ensure data is fresh on redirection
    revalidatePath("/contacts");

    // Return success state
    return { success: true, message: "Contact saved successfully!" };
  } catch (err) {
    console.error("Unexpected error in saveContact:", err);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export async function updateContact(contact: Contact) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { created_at, ...contactToUpdate } = contact;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contacts")
    .update(contactToUpdate)
    .eq("id", contactToUpdate.id);
  if (error) console.log(error);
  return data;
}

export async function deleteContact(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("contacts").delete().eq("id", id);
  if (error) console.log(error);
}
