import { auth } from "@/firebase";
import { signInWithEmailAndPassword, UserCredential } from "firebase/auth";

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
