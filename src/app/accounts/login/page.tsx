import Login from "@/components/accounts/ui/login";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>EHE Industries - Log in</title>
      </Head>
      <h1 className="text-center font-semibold md:text-2xl text-lg mb-4">
        LOGIN
      </h1>
      <Login />
    </>
  );
}
