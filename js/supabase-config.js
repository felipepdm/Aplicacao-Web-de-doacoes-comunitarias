// ===================================================
// Configuração do Supabase
// ===================================================
// Substitua os valores abaixo pelos dados do seu projeto.
// Eles ficam em: Project Settings > API, no painel do Supabase.

const SUPABASE_URL = "https://tijhdyvoloeahexqoerv.supabase.co/";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpamhkeXZvbG9lYWhleHFvZXJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE0ODE2ODAsImV4cCI6MjA5NzA1NzY4MH0.Bp3SjzvGRh525sdka0j4hUzvlvPbtIzw-YnhyHcRMGY";

const supabaseClient = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;