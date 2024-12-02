import { auth, db, firebaseConfig } from "@/firebase";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  UserCredential,
} from "firebase/auth";
import UserDocument, { UserRoles, UserStatus } from "./schemas/UserDocument";
import { initializeApp } from "firebase/app";
import {
  setDoc,
  doc,
  DocumentSnapshot,
  getDoc,
  collection,
  getDocs,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";

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
  )) as DocumentSnapshot<UserDocument>;

  return user;
}

export async function getAllActiveUsers(): Promise<UserDocument[]> {
  const q = query(
    collection(db, "users"),
    where("status", "==", UserStatus.ACTIVE)
  );

  const querySnapshot = await getDocs(q);

  const users: UserDocument[] = querySnapshot.docs.map((doc) => {
    return doc.data() as UserDocument;
  });

  return users;
}

export async function getUsersCount(): Promise<number> {
  const snapshot = await getCountFromServer(collection(db, "users"));

  return snapshot.data().count;
}

export async function adminRegisterUser(
  name: string,
  email: string,
  phone: string,
  password: string,
  role: UserRoles
) {
  // USE TEMPORARY APP TO CREATE USER
  const tempApp = initializeApp(firebaseConfig, "tempApp");

  const tempAuth = getAuth(tempApp);

  const registeredUser = await createUserWithEmailAndPassword(
    tempAuth,
    email,
    password
  );

  const uid = registeredUser.user.uid;

  // USE MAIN APP TO CREATE USER DOCUMENT
  const userDocument: UserDocument = {
    uid: uid,
    name: name,
    email: email,
    phone: phone,
    role: role,
    status: UserStatus.ACTIVE,
  };

  const docRef = doc(db, "users", uid);

  await setDoc(docRef, userDocument);
}

export async function updateUser(
  newDocument: UserDocument,
)
{
  const docRef = doc(db, "users", newDocument.uid);

  await setDoc(docRef, newDocument);
}

export async function sendResetPassword(email: string) {
  await sendPasswordResetEmail(auth, email);
}