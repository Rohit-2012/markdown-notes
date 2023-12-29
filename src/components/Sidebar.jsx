const Sidebar = ({ notes, setCurrentNoteId, newNote, currentNote, deleteNote }) => {
  return (
    <section className="pane sidebar">
      <div className="sidebar-header">
        <h3>Notes</h3>
        <button className="new-note" onClick={newNote}>
          +
        </button>
      </div>
      {notes.map(note => (
        <div key={note.id} className="sidebar-note">
          <div
            className={`title ${
              note.id === currentNote.id ? "selected-note" : ""
            }`}
            onClick={() => setCurrentNoteId(note.id)}
          >
            <h4 className="text-snippet">{note.body ? note.body.split('\n')[0] : "Untitled Note"}</h4>
            <button className="delete-btn" onClick={() => deleteNote(note.id)}><i className="fa-solid fa-trash"></i></button>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Sidebar;
