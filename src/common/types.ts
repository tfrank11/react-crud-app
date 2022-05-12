import { Timestamp } from "@firebase/firestore";

export interface NoteObject {
  title: string;
  text: string;
  userUuid: string;
  date: Timestamp;
  noteId: string;
}
