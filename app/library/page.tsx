import { createClient } from "@/utils/supabase/server";
import { LibraryPageComponent } from "@/components/library-page";

export default async function LibraryPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <LibraryPageComponent user={user} />;
}
