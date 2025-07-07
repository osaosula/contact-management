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

export async function getContacts(
  id: string | undefined
): Promise<Contact[] | null | unknown> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("user_id", id);

  if (error) {
    console.log(error.message);
  }

  return data;
}
export async function saveContact(contact: Contact) {
  const { id, created_at, ...contactToInsert } = contact;

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("contacts")
    .insert(contactToInsert);
  if (error) console.log(error);
  return data;
}
export async function updateContact(contact: Contact) {
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
