import Link from "next/link";

export default async function Page() {
  return (
    <div className="w-screen h-[90vh] flex justify-center items-center gap-4">
      <Link className="hover:underline duration-150" href={"/leaderboards"}>
        Leaderboards
      </Link>
      <Link className="hover:underline duration-150" href={"/edit"}>
        Edit
      </Link>
    </div>
  );
}
