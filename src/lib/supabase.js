import { createClient } from "@supabase/supabase-js";

function normalizeEnvironmentValue(value) {
  return String(value ?? "")
    .trim()
    .replace(/^(["'])(.*)\1$/, "$2");
}

function isValidSupabaseUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname.endsWith(".supabase.co");
  } catch {
    return false;
  }
}

const supabaseUrl = normalizeEnvironmentValue(
  import.meta.env.VITE_SUPABASE_URL
);
const supabasePublishableKey = normalizeEnvironmentValue(
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
);

let supabaseClient = null;

if (isValidSupabaseUrl(supabaseUrl) && supabasePublishableKey) {
  try {
    supabaseClient = createClient(supabaseUrl, supabasePublishableKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
  } catch (error) {
    console.error("Não foi possível inicializar o Supabase.", error);
  }
}

export const supabase = supabaseClient;
export const isSupabaseConfigured = Boolean(supabaseClient);
