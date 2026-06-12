/* =========================================================
   Bien en Soi Massage — Connexion Supabase (Produits)
   =========================================================

   ⚠️ INSTRUCTIONS :
   Remplacez les deux valeurs ci-dessous par celles de VOTRE
   projet Supabase (Project Settings > API) :
   - SUPABASE_URL  : l'URL de votre projet
   - SUPABASE_ANON_KEY : la clé publique "anon"

   Ces deux valeurs sont conçues pour être publiques
   (elles sont protégées par les règles de sécurité RLS
   configurées dans Supabase). Voir GUIDE-SUPABASE.md.
   ========================================================= */

const SUPABASE_URL = "https://VOTRE-PROJET.supabase.co";
const SUPABASE_ANON_KEY = "VOTRE_CLE_ANON_PUBLIQUE";

const supabaseClient = (typeof supabase !== "undefined")
  ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

const TABLE_NAME = "produits";

/**
 * Récupère tous les produits, du plus récent au plus ancien.
 */
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

/**
 * Ajoute un nouveau produit.
 * product = { nom, description, prix, image_url }
 */
async function addProduct(product) {
  if (!supabaseClient) return { error: "Supabase non configuré" };
  const { data, error } = await supabaseClient
    .from(TABLE_NAME)
    .insert([product])
    .select();

  return { data, error };
}

/**
 * Supprime un produit par son id.
 */
async function deleteProduct(id) {
  if (!supabaseClient) return { error: "Supabase non configuré" };
  const { error } = await supabaseClient
    .from(TABLE_NAME)
    .delete()
    .eq("id", id);

  return { error };
}

/**
 * Téléverse une image dans le bucket de stockage "produits"
 * et retourne son URL publique.
 */
async function uploadProductImage(file) {
  if (!supabaseClient) return { error: "Supabase non configuré" };

  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

  const { error: uploadError } = await supabaseClient.storage
    .from("produits")
    .upload(fileName, file);

  if (uploadError) {
    return { error: uploadError };
  }

  const { data } = supabaseClient.storage
    .from("produits")
    .getPublicUrl(fileName);

  return { data: { publicUrl: data.publicUrl } };
}

/**
 * Formate un prix en dollars canadiens.
 */
function formatPrice(prix) {
  const n = parseFloat(prix);
  if (isNaN(n)) return prix;
  return n.toLocaleString("fr-CA", { style: "currency", currency: "CAD" });
}
