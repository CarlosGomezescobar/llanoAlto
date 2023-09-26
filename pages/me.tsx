import { useSession } from "next-auth/react"
import Layout from "../components/layout"
import { createClient } from "@supabase/supabase-js";
import { useState } from "react";

type Session = {
  supabaseAccessToken?: string;
};


export default function MePage() {
 // const { data: session } = useSession()
 const { data: session }: { data: Session | null } = useSession();
  const  [data, setData] = useState<any>(null);

    // ...
  // Use `useSession()` or `unstable_getServerSession()` to get the NextAuth session.

 // const { supabaseAccessToken } = session;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      global: {
        headers: {
          Authorization: session?.supabaseAccessToken ?? "",
        },
      },
    }
  );
  // Now you can query with RLS enabled.
  supabase.from("users").select("*").then(({ data }) => setData(data));

  return (
    <Layout>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}
