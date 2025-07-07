import ContactForm from "@/components/contact-form";
import AccountForm from "../../../components/account-form";
import { createClient } from "@/utils/supabase/server";

export default async function AddContact() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <ContactForm user={user} />;
}
