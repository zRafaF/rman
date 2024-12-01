import { db } from "@/firebase";
import ReservationDocument from "./schemas/ReservationDocument";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
  QuerySnapshot,
} from "firebase/firestore";
export async function createReservation(reservation: ReservationDocument) {
  const docRef = await addDoc(collection(db, "reservations"), reservation);

  return docRef;
}

export async function getAllReservations(): Promise<
  QuerySnapshot<ReservationDocument>
> {
  // Create a Firestore query that orders documents by "startTime"
  const reservationsQuery = query(
    collection(db, "reservations"),
    orderBy("startTime", "desc")
  );

  const querySnapshot = await getDocs(reservationsQuery);

  return querySnapshot as QuerySnapshot<ReservationDocument>;
}

export async function deleteReservation(reservationId: string) {
  // Delete a reservation by its id
  await deleteDoc(doc(db, "reservations", reservationId));
}

/**
 *
 * @param startDate
 * @param endDate if undefined, will return all reservations starting from startDate
 * @returns
 */
// export async function getReservationsInRange(
//   startDate: Date,
//   endDate: Date | undefined
// ) {
//   const q = endDate
//     ? query(
//         collection(db, "reservations"),
//         where("reservationDate", ">", startDate),
//         where("reservationDate", "<", endDate)
//       )
//     : query(
//         collection(db, "reservations"),
//         where("reservationDate", ">", startDate)
//       );

//   const querySnapshot = await getDocs(q);

//   const reservations: ReservationDocument[] = querySnapshot.docs.map((doc) => {
//     return doc.data() as ReservationDocument;
//   });

//   return reservations;
// }
