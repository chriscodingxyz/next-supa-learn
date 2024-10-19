import { getServerAuthUser } from "@/lib/server-utils";
import { createAdmin } from "@/utils/supabase/server";
import { InfoIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { Message } from "@/components/FormMessage";

export default async function ProtectedPage({searchParams}: {searchParams: { message: string }}) {

  const supabaseAdmin = createAdmin();

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser();

  // if (!user) {
  //   return redirect("/sign-in");
  // }


  const user = await getServerAuthUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: todos } = await supabaseAdmin.from("todos").select("*");

  return (
    <div className="flex-1 w-full flex flex-col gap-12">
      <div className="w-full space-y-2">
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          This is a protected page that you can only see as an authenticated
          user {searchParams.message}
        </div>
        <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
          <InfoIcon size="16" strokeWidth={2} />
          searchParams message: {searchParams.message}
        </div>
      </div>
      <div className="flex flex-row gap-2 items-start">
        <h2 className="font-bold text-2xl mb-4">Your user details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
        <h2 className="font-bold text-2xl mb-4">Your todo details</h2>
        <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(todos, null, 2)}
        </pre>
      </div>
      <div>
      
      </div>
    </div>
  );
}
