import { initializeApp } from "firebase/app";
import {collection, getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAPo-XCyi_z_l3otXn_0vknYvA6K-p95Xg",
  authDomain: "markdown-notes-8d0d5.firebaseapp.com",
  projectId: "markdown-notes-8d0d5",
  storageBucket: "markdown-notes-8d0d5.appspot.com",
  messagingSenderId: "148344052862",
  appId: "1:148344052862:web:b8224ecefc5511975c0c2f"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const notesCollection = collection(db, "notes")