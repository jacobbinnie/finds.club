"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Profile } from "@/interfaces";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";

interface SupabaseContextValues {
  currentSession?: Session | null;
  profile: Profile | null;
}

const SupabaseContext = createContext<SupabaseContextValues>({
  currentSession: null,
  profile: null,
});

interface SupabaseProviderOptions {
  children?: React.ReactNode;
}

export const SupabaseProvider = ({ children }: SupabaseProviderOptions) => {
  const [currentSession, setCurrentSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setCurrentSession(session);
      } else {
        setProfile(null);
      }
    });
  }, []);

  const value = {
    currentSession,
    profile,
  };

  return (
    <SupabaseContext.Provider value={value}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  return useContext(SupabaseContext);
};
