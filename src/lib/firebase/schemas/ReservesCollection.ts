import { DocumentSnapshot } from "firebase/firestore/lite";

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

interface ReservesCollection extends DocumentSnapshot {
  uid: string;
  email: string;
  phone: string;
  area: AreasEnum;
  reserveDate: Date;
  startTime: string;
  endTime: string;

  status: StatusEnum;
}

export default ReservesCollection;
