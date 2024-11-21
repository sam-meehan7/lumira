"use client";

import { useEffect, useCallback, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function GoogleSignInButton() {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const router = useRouter();

  const handleCredentialResponse = useCallback(
    async (response: CredentialResponse) => {
      const supabase = createClient();
      const { error, data } = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: response.credential,
      });

      if (error) {
        console.error("Error signing in with Google:", error);
        return;
      }

      if (data.user) {
        router.push("/");
        router.refresh();
      }
    },
    [router]
  );

  useEffect(() => {
    window.handleCredentialResponse = handleCredentialResponse;

    const checkGoogleScript = () => {
      if (window.google) {
        setIsScriptLoaded(true);
      } else {
        setTimeout(checkGoogleScript, 100);
      }
    };

    checkGoogleScript();

    return () => {
      delete window.handleCredentialResponse;
    };
  }, [handleCredentialResponse]);

  useEffect(() => {
    if (isScriptLoaded) {
      if (!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        throw new Error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not defined");
      }

      window.google?.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
      });

      window.google?.accounts.id.renderButton(
        document.getElementById("g_id_signin")!,
        { theme: "outline", size: "large" }
      );
    }
  }, [isScriptLoaded, handleCredentialResponse]);

  return (
    <>
      <div
        id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
        data-callback="handleCredentialResponse"
        data-auto_prompt="false"
        data-use_fedcm_for_prompt="true"
      />
      <div
        id="g_id_signin"
        className="g_id_signin"
        data-type="standard"
        data-shape="rectangular"
        data-theme="outline"
        data-text="signin_with"
        data-size="large"
        data-logo_alignment="left"
      />
    </>
  );
}
