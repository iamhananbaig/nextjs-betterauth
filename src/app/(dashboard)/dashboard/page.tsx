
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }
  const user = session?.user;

  return (
    <div className="mx-auto flex flex-col place-items-center">
      <h1 className="text-2xl font-bold underline">Welcome to Dashboard</h1>
      <ul>
        <li>Name: {user.name}</li>
        <li>Email: {user.email}</li>
      </ul>
    </div>
  );
}
