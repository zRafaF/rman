import { db } from "@/firebase";
import ReservationDocument from "./schemas/ReservationDocument";
import { collection, addDoc } from "firebase/firestore";

export async function createReservation(reservation: ReservationDocument) {
  const docRef = await addDoc(collection(db, "reservations"), reservation);

  return docRef;
}
