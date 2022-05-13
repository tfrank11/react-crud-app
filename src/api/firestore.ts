import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  Firestore,
  deleteDoc,
} from "firebase/firestore";
import { NoteObject } from "../common/types";

export const getNotes = async (userUuid: string, db: Firestore) => {
  console.log("calling getNotes");
  //Get notes from Firestore, sorted by date
  const q = query(collection(db, "notes"), where("userUuid", "==", userUuid));
  const notes: NoteObject[] = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const note: NoteObject = {
      title: doc.data().title,
      text: doc.data().text,
      date: doc.data().date,
      userUuid: doc.data().userUuid,
      noteId: doc.data().noteId,
    };
    notes.push(note);
  });
  return notes;
};

export const updateNote = async (
  newText: string,
  noteId: string,
  db: Firestore
) => {
  console.log("calling updateNote");
  //Update note in Firestore
  try {
    const docRef = doc(db, "notes", noteId);
    await updateDoc(docRef, {
      text: newText,
    });
    return;
  } catch {
    console.log("Error updating note");
  }
};

export const deleteNote = async (noteId: string, db: Firestore) => {
  // Delete note from Firestore
  console.log("calling deleteNote");
  try {
    console.log("noteId: ", noteId);
    const docRef = doc(db, "notes", noteId);
    console.log("docRef: ", docRef);
    await deleteDoc(docRef);
    return;
  } catch (err) {
    console.log(err);
    console.log("Error deleting note");
  }
};
