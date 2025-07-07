import { geFullname } from "@/utils/utility";
import { NavigationHeaderMenu } from "../components/navigation-menu";
import { createClient } from "@/utils/supabase/server";

export default async function PageHeader() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  const { full_name: fullname } = await geFullname(data.user.id);
  //console.log(fullname);
  //const email = data.user?.email;
  return <NavigationHeaderMenu fullname={fullname} />;
}
