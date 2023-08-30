"use client";

import { useSupabase } from "@/providers/SupabaseProvider";
import { supabase } from "@/utils/supabase";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useRouter } from "next/navigation";
import Marquee from "react-fast-marquee";

export default function Login() {
  const { profile } = useSupabase();
  const { push } = useRouter();

  if (profile && profile.username) {
    return push(`/${profile.username}`);
  }

  return (
    <div className="w-full flex flex-col items-center h-full min-h-screen bg-tertiary ">
      <Marquee autoFill speed={10} className="bg-accent">
        <p className="text-sm tracking-tighter font-bold px-6 py-1">
          FINDS.CLUB
        </p>
      </Marquee>

      <div className="flex mt-10 w-full">
        <div className="flex flex-col w-full items-center gap-6">
          <h1 className="text-3xl tracking-tighter font-bold">
            Sign in / Sign up
          </h1>
          <div className="w-full px-3 max-w-[600px]">
            <Auth
              supabaseClient={supabase}
              providers={["google"]}
              appearance={{
                theme: ThemeSupa,
                style: {
                  button: {
                    backgroundColor: "white",
                    color: "black",
                    borderColor: "black",
                    fontSize: "16px",
                    letterSpacing: "-0.05em",
                  },
                  container: {
                    width: "100%",
                    letterSpacing: "-0.05em",
                  },
                  input: {
                    fontSize: "16px",
                    letterSpacing: "-0.05em",
                  },
                  label: {
                    fontSize: "16px",
                    letterSpacing: "-0.05em",
                  },
                  loader: {
                    color: "black",
                  },
                  anchor: {
                    fontSize: "16px",
                    letterSpacing: "-0.05em",
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="w-full fixed bottom-0">
        <Marquee autoFill speed={15} className="bg-accent">
          <p className="text-sm tracking-tighter font-bold px-6 py-1">
            FINDS.CLUB
          </p>
        </Marquee>
      </div>
    </div>
  );
}
