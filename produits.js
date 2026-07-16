/* =========================================================
   Clinique de massothérapie — Connexion Firebase (Produits)
   ========================================================= */

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCMbdgCKnIq5vTjTD0fechZP3rE3bR1Pn8",
  authDomain: "clinique-produits.firebaseapp.com",
  projectId: "clinique-produits",
  storageBucket: "clinique-produits.firebasestorage.app",
  messagingSenderId: "107596157193",
  appId: "1:107596157193:web:9bf90245183bc3e43703d8",
  measurementId: "G-2R418EL9XP"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const COLLECTION_NAME = "produits";

// ==================== FONCTIONS ====================

// Récupérer tous les produits
window.fetchProducts = async function() {
  try {
    const snapshot = await db.collection(COLLECTION_NAME).orderBy("created_at", "desc").get();
    const products = [];
    snapshot.forEach(doc => {
      products.push({ id: doc.id, ...doc.data() });
    });
    return products;
  } catch (error) {
    console.error("Erreur lors du chargement des produits :", error);
    return [];
  }
};

// Ajouter un produit
window.addProduct = async function(product) {
  try {
    const docRef = await db.collection(COLLECTION_NAME).add({
      ...product,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
    return { data: { id: docRef.id } };
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit :", error);
    return { error };
  }
};

// Supprimer un produit
window.deleteProduct = async function(id) {
  try {
    await db.collection(COLLECTION_NAME).doc(id).delete();
    return {};
  } catch (error) {
    console.error("Erreur lors de la suppression :", error);
    return { error };
  }
};

// Uploader une image (convertie en Base64, sans Firebase Storage)
window.uploadProductImage = async function(file) {
  if (!file) {
    return { error: "Aucun fichier sélectionné" };
  }

  // Vérifier la taille (limite 1 Mo pour Firestore)
  if (file.size > 1024 * 1024) {
    return { error: "L'image est trop lourde (max 1 Mo). Veuillez la réduire." };
  }

  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result; // data:image/png;base64,...
      resolve({ data: { publicUrl: base64 } });
    };
    reader.onerror = () => {
      resolve({ error: "Erreur lors de la lecture du fichier" });
    };
    reader.readAsDataURL(file);
  });
};

// Formater le prix
window.formatPrice = function(prix) {
  const n = parseFloat(prix);
  if (isNaN(n)) return prix;
  return n.toLocaleString("fr-CA", { style: "currency", currency: "CAD" });
};

console.log("✅ produits.js chargé avec succès (Base64) !");
