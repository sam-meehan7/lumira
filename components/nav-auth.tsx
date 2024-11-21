"use client";
import { handleRequest } from "@/utils/auth-helpers/client";
import { SignOut } from "@/utils/auth-helpers/server";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import GoogleSignInButton from "./GoogleSignInButton";

export function NavAuth({ user }: { user: object | null }) {
  const router = useRouter();
  const pathname = usePathname(); // Move hook to top level

  return (
    <div>
      {user ? (
        <form
          onSubmit={(e) => handleRequest(e, SignOut, router)}
          className="inline"
        >
          <input type="hidden" name="pathName" value={pathname} />
          <Button type="submit">Sign out</Button>
        </form>
      ) : (
        <GoogleSignInButton />
      )}
    </div>
  );
}
