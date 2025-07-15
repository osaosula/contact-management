/* eslint-disable @typescript-eslint/no-unused-vars */
import { Contact } from "@/model/Contact";
import { createClient } from "./supabase/client";

export async function geFullname(id: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", id)
    .single();

  if (error) console.log(error);

  return data;
}
