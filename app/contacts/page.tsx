import { Contact } from "@/model/Contact";
import DisplayContacts from "../../components/display-contacts";
import { createClient } from "../../utils/supabase/server";
import { getContacts } from "../../utils/utility";

export default async function ContactsPage() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();
  const userId = data.user?.id;
  const contacts = (await getContacts(userId)) as Contact[];

  return <DisplayContacts contacts={contacts} />;
}
