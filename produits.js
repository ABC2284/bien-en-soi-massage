/* =========================================================
   Clinique de massothérapie — Connexion Supabase (Produits)
   ========================================================= */

// ⚠️ Remplacez ces valeurs par les vôtres (régénérez d'abord votre clé)
const SUPABASE_URL = "https://tiqhglhgsjpywnwhtgvtr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_7o9VsyedW9QaY59x4TNVow_SfRSr4Sc";

const supabaseClient = (typeof supabase !== "undefined")
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const TABLE_NAME = "produits";

async function fetchProducts() {
  if (!supabaseClient) return [];
  const { data, error } = await supabaseClient
    .from(TABLE_NAME)
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Erreur lors du chargement des produits :", error);
    return [];
  }
  return data || [];
}

async function addProduct(product) {
  if (!supabaseClient) return { error: "Supabase non configuré" };
  const { data, error } = await supabaseClient
    .from(TABLE_NAME)
    .insert([product])
    .select();
  return { data, error };
}

async function deleteProduct(id) {
  if (!supabaseClient) return { error: "Supabase non configuré" };
  const { error } = await supabaseClient
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);
  return { error };
}

async function uploadProductImage(file) {
  if (!supabaseClient) return { error: "Supabase non configuré" };
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
  const { error: uploadError } = await supabaseClient.storage
    .from("produits")
    .upload(fileName, file);
  if (uploadError) return { error: uploadError };
  const { data } = supabaseClient.storage.from("produits").getPublicUrl(fileName);
  return { data: { publicUrl: data.publicUrl } };
}

function formatPrice(prix) {
  const n = parseFloat(prix);
  if (isNaN(n)) return prix;
  return n.toLocaleString("fr-CA", { style: "currency", currency: "CAD" });
}
