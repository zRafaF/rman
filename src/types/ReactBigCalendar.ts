export interface ReactBigCalendarEvent<T> {
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  resource?: T;
}
