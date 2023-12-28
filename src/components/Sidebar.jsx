const Sidebar = ({ notes, setCurrentNoteId, newNote, currentNote }) => {
  return (
    <section className="pane sidebar">
      <div className="sidebar-header">
        <h3>Notes</h3>
        <button className="new-note" onClick={newNote}>
          +
        </button>
      </div>
      {notes.map((note, index) => (
        <div key={note.id} className="sidebar-note">
          <div
            className={`title ${
              note.id === currentNote.id ? "selected-note" : ""
            }`}
            onClick={() => setCurrentNoteId(note.id)}
          >
            <h4 className="text-snippet">Note {index + 1}</h4>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Sidebar;
