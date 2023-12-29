import Split from "react-split";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";

function App() {
  const [notes, setNotes] = useState(
    () => JSON.parse(localStorage.getItem("notes")) || [] //Lazy State Initialization
  );
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const createNewNote = () => {
    const newNote = { id: nanoid(), body: "# Title" };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  };

  // This updateNote functions updates the current note as well as bumps it to the top of the notes list
  const updateNote = (text) => {
    setNotes((oldNotes) => {
     const newNotesArray = []
      oldNotes.forEach((note) => { note.id === currentNoteId ? newNotesArray.unshift({ ...note, body: text }) : newNotesArray.push(note) })
      return newNotesArray
    });
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

  const deleteNote = (event, noteId) => {
    event.stopPropagation()
    setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
  }

  const findCurrentNote = () => {
    return notes.find((note) => note.id === currentNoteId) || notes[0];
  };

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            currentNote={findCurrentNote()}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
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
