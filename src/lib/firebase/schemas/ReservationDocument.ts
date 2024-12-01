// import { DocumentSnapshot } from "firebase/firestore/lite";

export enum AreasEnum {
  MACHINING = "machining",
  CARPENTRY = "carpentry",
  WELDING = "welding",
  PAINTING = "painting",
  LASER_CUTTING = "laser-cutting",
}

export enum StatusEnum {
  PENDING = "pending",
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

interface ReservationDocument {
  uid: string;
  email: string;
  phone: string;
  area: AreasEnum;
  reserveDate: Date;
  startTime: Date;
  endTime: Date;

  status: StatusEnum;
}

export default ReservationDocument;
