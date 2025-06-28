import { getServerSession } from "next-auth";
import AdminComponent from "./component";
import authOptions from "@/lib/AuthOptions";
import { redirect } from "next/navigation";
import { isTeacher } from "@/lib/teacher";
import { NavBar } from "@/components/navbar";

export default async function Admin() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const isAdmin = isTeacher(session?.user?.email);

  if (!isAdmin) redirect("/");

  return (
    <>
      <NavBar />
      <AdminComponent />
    </>
  );
}
