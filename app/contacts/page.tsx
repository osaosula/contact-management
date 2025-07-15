import { Contact } from "@/model/Contact";
import DisplayContacts from "../../components/display-contacts";
import { createClient } from "../../utils/supabase/server";
import { getContacts } from "./add/actions";
import { redirect } from "next/navigation";

export default async function ContactsPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  if (!data.user) {
    redirect("/login");
  }
  // const userId = data.user?.id;
  const contacts = (await getContacts()) as Contact[];

  return <DisplayContacts contacts={contacts} />;
}
