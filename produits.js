/* =========================================================
   Clinique de massothérapie — Connexion Firebase (Produits)
   ========================================================= */

// Configuration Firebase (remplacez par vos valeurs)
const firebaseConfig = {
  apiKey: "AIzaSyCMbdgCKnIq5vTjTD0fechZP3rE3bR1Pn8",
  authDomain: "clinique-produits.firebaseapp.com",
  projectId: "clinique-produits",
  storageBucket: "clinique-produits.firebasestorage.app",
  messagingSenderId: "107596157193",
  appId: "1:107596157193:web:9bf90245183bc3e43703d8",
  measurementId: "G-2R418EL9XP"
};
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();

const COLLECTION_NAME = "produits";

// ==================== FONCTIONS ====================

// Récupérer tous les produits
async function fetchProducts() {
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
}

// Ajouter un produit
async function addProduct(product) {
  try {
    const docRef = await db.collection(COLLECTION_NAME).add({
      ...product,
      created_at: firebase.firestore.FieldValue.serverTimestamp()
    });
    return { data: { id: docRef.id } };
  } catch (error) {
    return { error };
  }
}

// Supprimer un produit
async function deleteProduct(id) {
  try {
    await db.collection(COLLECTION_NAME).doc(id).delete();
    return {};
  } catch (error) {
    return { error };
  }
}

// Uploader une image vers Firebase Storage
async function uploadProductImage(file) {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;
    const storageRef = storage.ref().child(`produits/${fileName}`);
    const snapshot = await storageRef.put(file);
    const publicUrl = await snapshot.ref.getDownloadURL();
    return { data: { publicUrl } };
  } catch (error) {
    return { error };
  }
}

// Formater le prix
function formatPrice(prix) {
  const n = parseFloat(prix);
  if (isNaN(n)) return prix;
  return n.toLocaleString("fr-CA", { style: "currency", currency: "CAD" });
}
