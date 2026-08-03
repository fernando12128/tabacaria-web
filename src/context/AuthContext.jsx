import { useEffect, useMemo, useState } from "react";
import { isSupabaseConfigured, supabase } from "../lib/supabase";
import { AuthContext } from "./auth-context.js";

function configurationError() {
  return new Error(
    "A autenticação ainda não foi configurada neste ambiente."
  );
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    if (!supabase) {
      return undefined;
    }

    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setLoading(false);
    });

    return () => {
      mounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({
      session,
      user: session?.user ?? null,
      loading,
      isConfigured: isSupabaseConfigured,
      async signIn(email, password) {
        if (!supabase) throw configurationError();
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        return data;
      },
      async signUp({ email, password, profile }) {
        if (!supabase) throw configurationError();
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/minha-conta`,
            data: profile,
          },
        });
        if (error) throw error;
        return data;
      },
      async signOut() {
        if (!supabase) return;
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
      },
      async resetPassword(email) {
        if (!supabase) throw configurationError();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/nova-senha`,
        });
        if (error) throw error;
      },
      async updatePassword(password) {
        if (!supabase) throw configurationError();
        const { data, error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        return data;
      },
      async updateProfile(profile) {
        if (!supabase) throw configurationError();

        const { data, error } = await supabase.auth.updateUser({ data: profile });
        if (error) throw error;

        const { error: profileError } = await supabase.from("profiles").upsert({
          id: data.user.id,
          email: data.user.email,
          ...profile,
          updated_at: new Date().toISOString(),
        });

        if (profileError) throw profileError;
        return data.user;
      },
    }),
    [loading, session]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
