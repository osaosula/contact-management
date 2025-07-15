import ContactForm from "@/components/contact-form";
import AccountForm from "../../../components/account-form";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AddContact() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirect("/login");

  return <ContactForm />;
}
