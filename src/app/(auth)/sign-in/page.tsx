"use client";

import { signIn, signOut, useSession } from "next-auth/react";

const SignInPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button
        className="py-2 px-4 bg-red-400 rounded text-white"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
};

export default SignInPage;
