// ===================================================
// Configuração do Supabase
// ===================================================
// Substitua os valores abaixo pelos dados do seu projeto.
// Eles ficam em: Project Settings > API, no painel do Supabase.

const SUPABASE_URL = "https://tijhdyvoloeahexqoerv.supabase.co/";
const SUPABASE_ANON_KEY = "https://tijhdyvoloeahexqoerv.supabase.co/";

const supabaseClient = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;
