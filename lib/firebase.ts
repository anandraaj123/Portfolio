import { getApps, initializeApp, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

let db: Firestore | null = null;

if (getApps().length === 0) {
  const hasValidCredentials = 
    projectId && 
    clientEmail && 
    privateKey && 
    !projectId.includes("your_") && 
    !clientEmail.includes("your_") && 
    !privateKey.includes("your_");

  if (hasValidCredentials) {
    try {
      // Fix private key layout structure from standard environment variables
      const formattedPrivateKey = privateKey.replace(/\\n/g, "\n").replace(/^"|"$/g, "");
      
      initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: formattedPrivateKey,
        }),
      });
      db = getFirestore();
    } catch (error) {
      console.error("Firebase Admin initialization error:", error);
    }
  } else {
    console.warn(
      "Firebase Admin credentials missing or placeholders. Firestore logging will be disabled."
    );
  }
} else {
  db = getFirestore();
}

export { db };
