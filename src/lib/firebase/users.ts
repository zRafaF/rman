import { auth, db } from "@/firebase";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";
import { doc, DocumentSnapshot, getDoc } from "firebase/firestore/lite";
import UsersCollection from "./schemas/UsersCollection";

export async function login(
  email: string,
  password: string
): Promise<UserCredential> {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return credentials;
}

export async function logout(): Promise<void> {
  await auth.signOut();
}

export async function getUserById(uid: string) {
  const user = (await getDoc(
    doc(db, "users", uid)
  )) as DocumentSnapshot<UsersCollection>;

  return user;
}
