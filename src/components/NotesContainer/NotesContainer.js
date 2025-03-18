import React, { useEffect, useState } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { getNotesApiCall } from "../../utils/Api";
import AddNotes from "../AddNotes/AddNotes";
import styles from "./NotesContainer.module.scss";
import { useOutletContext } from "react-router-dom"; //Import context hook
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';

export default function NotesContainer() {
  const [notesList, setNotesList] = useState([]);
  const { searchQuery , isSidebarOpen , isListView } = useOutletContext(); // Get search query from context


  useEffect(() => {
    getNotesApiCall().then((res) => {
      console.log("API Response:------------>", res);
      const filteredNotes = res?.data?.data?.filter((note) => !note.isArchived && !note.isDeleted);
      setNotesList(filteredNotes || []);
    });
  }, []);

  const handleNotesList = (response) => {
    let {action, data}=response;

    if (action === "add") {
      setNotesList((prevNotes) => [data, ...prevNotes]);
    }
    if (action === "archive") {
      setNotesList((notesList) =>
        notesList.filter((note) => {
          console.log("Data ID: ", data.id);
          console.log("Note ID: ", note.id);
          return note.id !== data.id 
        })
      );
    }
    if (action === "unarchive") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id 
        )
      );
    }
    if (action === "delete") {
      setNotesList((prevNotes) =>
        prevNotes.filter((note) => note.id !== data.id)
      );
    }
    if (action === "restore") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, isDeleted: false } : note
        )
      );
    }
    if (action === "deleteForever") {
      setNotesList((prevNotes) =>
        prevNotes.filter((note) => note.id !== data.id)
      );
    }
    if (action === "edit" ) {
      setNotesList((prevNotes) =>
        prevNotes.map((note) => (note.id === data.id ? data : note))
      );
    }
    if (action === "colorChange") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) => (note.id === data.id ? { ...note, color: data.color } : note))
      );
    }
    if (action === "reminderSet") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, reminder: data.reminder } : note
        )
      );
    }
    if (action === "removeReminder") {
      setNotesList((prevNotes) =>
        prevNotes.map((note) =>
          note.id === data.id ? { ...note, reminder: null } : note
        )
      );
    }
  };
  const filteredNotes = notesList.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Box 
    // className={styles.notesContainer}
    className={`${styles.notesContainer} ${isSidebarOpen ? styles.expanded : styles.collapsed}`}
    >
      <div className="add-notes">
        <AddNotes updateList={handleNotesList} />
      </div>
{isListView ? (
        <div className="list-view" style={{ width: "50rem", marginLeft: isSidebarOpen ? "200px" : "50px", marginTop: "50px" , gap:"5rem"}}>
          {filteredNotes.map((note) => (
            <div key={note.id} className="list-item">
              <NoteCard noteDetails={note} updateList={handleNotesList} container="notes" />
            </div>
          ))}
        </div>
      ) : (
        <Masonry
          columns={{ xs: 1, sm: isSidebarOpen ? 1 : 2, md: isSidebarOpen ? 3 : 4 }}
          spacing={2}
          className="masonry-grid"
          style={{
            width: "80%",
            marginLeft: isSidebarOpen ? "100px" : "50px",
            marginTop: "50px",
          }}
        >
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} noteDetails={note} updateList={handleNotesList} />
          ))}
        </Masonry>
      )}
    </Box>
  );
}


