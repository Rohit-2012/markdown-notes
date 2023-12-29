import Split from "react-split";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { db, notesCollection } from "./firebase";

function App() {
  // const [notes, setNotes] = useState(
  //   () => JSON.parse(localStorage.getItem("notes")) || [] //Lazy State Initialization
  // );

  const [notes, setNotes] = useState([]);
  // const [currentNoteId, setCurrentNoteId] = useState(notes[0]?.id || "");
  const [currentNoteId, setCurrentNoteId] = useState("");

  const [tempNoteText, setTempNoteText] = useState(""); //temporary text for debouncing

  const sortedNotesArray = notes.toSorted((a, b) => b.updatedAt - a.updatedAt);

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];

  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      const notesArray = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArray);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);

  // Debouncing logic
  // step1:
  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote]);

  // Step2:
  // Create an effect that runs any time the tempNoteText changes --> Delay the sending of the request to Firebase --> uses setTimeout --> use clearTimeOut to cancel the timeout

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (tempNoteText !== currentNote.body) {
        updateNote(tempNoteText);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [tempNoteText]);

  const createNewNote = async () => {
    const newNote = {
      body: "# Untitled Note",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  };

  // This updateNote functions updates the current note as well as bumps it to the top of the notes list
  const updateNote = async (text) => {
    const docRef = doc(db, "notes", currentNoteId);
    await setDoc(
      docRef,
      { body: text, updatedAt: Date.now() },
      { merge: true }
    );

    // UPDATING LOCAL STATE
    // setNotes((oldNotes) => {
    //   const newNotesArray = [];
    //   oldNotes.forEach((note) => {
    //     note.id === currentNoteId
    //       ? newNotesArray.unshift({ ...note, body: text })
    //       : newNotesArray.push(note);
    //   });
    //   return newNotesArray;
    // });
  };

  // This updateNote functions just updates the current note
  // const updateNote = (text) => {
  //   setNotes((oldNotes) =>
  //     oldNotes.map((oldNote) => {
  //       return oldNote.id === currentNoteId
  //         ? { ...oldNote, body: text }
  //         : oldNote;
  //     })
  //   );
  // };

  const deleteNote = async (noteId) => {
    const docRef = doc(db, "notes", noteId);
    await deleteDoc(docRef);
  };
  // Old delete function
  // const deleteNote = (event, noteId) => {
  //   event.stopPropagation();
  //   setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  // };

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={sortedNotesArray}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            currentNote={currentNote}
            deleteNote={deleteNote}
          />
          {/* <Editor currentNote={currentNote} updateNote={updateNote} /> */}
          <Editor currentNote={tempNoteText} updateNote={setTempNoteText} />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>There are no notes</h1>
          <button onClick={createNewNote}>Create a new note</button>
        </div>
      )}
    </main>
  );
}

export default App;
