import Split from "react-split";
import { nanoid } from "nanoid";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";

function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(
    (notes[0] && notes[0].id) || ""
  );

  const createNewNote = () => {
    const newNote = { id: nanoid(), body: "# Title" };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  };

  const updateNote = (text) => {
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote;
      })
    );
  };

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
