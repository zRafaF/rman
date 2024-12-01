// import { DocumentSnapshot } from "firebase/firestore/lite";

import { Timestamp } from "firebase/firestore";

export enum AreasEnum {
  MACHINING = "machining",
  CARPENTRY = "carpentry",
  WELDING = "welding",
  PAINTING = "painting",
  LASER_CUTTING = "laser-cutting",
  CNC_ROUTER = "cnc-router",
}

export enum StatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

interface ReservationDocument {
  uid: string;

  name: string;
  email: string;
  phone: string;

  status: StatusEnum;
  area: AreasEnum;

  reservationDate: Timestamp;
  startTime: Timestamp;
  endTime: Timestamp;
}

export default ReservationDocument;
