"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  // console.log("==data==");
  // console.log(output);
  if (error) {
    console.error(error);
    redirect(`/login?c=${error.code}&m=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { data: signupOutput, error } = await supabase.auth.signUp(data);
  console.log("==Data==");
  console.log(signupOutput);

  if (error) {
    redirect(`/error?c=${error.code}&m=${error.message}`);
  }

  revalidatePath("/", "layout");
  redirect("/");
}
