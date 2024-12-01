import { db } from "@/firebase";
import ReservationDocument from "./schemas/ReservationDocument";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { timestampToDate } from "../time-helper";

export async function createReservation(reservation: ReservationDocument) {
  const docRef = await addDoc(collection(db, "reservations"), reservation);

  return docRef;
}

export async function getAllReservations() {
  const querySnapshot = await getDocs(collection(db, "reservations"));

  const reservations: ReservationDocument[] = [];
  querySnapshot.forEach((doc) => {
    const data = doc.data();

    data.reservationDate = timestampToDate(data.reservationDate);
    data.startTime = timestampToDate(data.startTime);
    data.endTime = timestampToDate(data.endTime);

    reservations.push(data as ReservationDocument);
  });

  return reservations;
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
