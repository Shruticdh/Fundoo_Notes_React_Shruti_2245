import React, { useEffect, useState } from "react";
import NoteCard from "../NoteCard/NoteCard";
import {setReminderApiNotes } from "../../utils/Api";
import styles from "./Remanider.module.scss";
import { useOutletContext } from "react-router-dom";
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';

export default function ReminderContainer({ notesList, updateList }) {
  const [reminderNotesList, setReminderNotesList] = useState([]);
  const {isSidebarOpen } = useOutletContext();

  useEffect(() => {
    setReminderApiNotes().then((res) => {
      const filteredNotes = res?.data?.data?.filter((note) => note.reminder);
      setReminderNotesList(filteredNotes || []);
    });
  }, []);

  const handleNotesList = (receivedData) => {
    console.log("receivedData", receivedData);
    const { action, data } = receivedData;

    if (action === "reminderRemove") {
      setReminderNotesList((prevNotes) =>
        prevNotes.filter((note) => note.id !== data.id)
      );
    }
  };


  

  return (
    <Box
      className={`${styles.notesContainer} ${isSidebarOpen ? styles.expanded : styles.collapsed}`} 
      sx={{ padding: 5, width: "55%"  }}
    >
      <Masonry columns={{ xs: 1, sm:2, md: isSidebarOpen ? 3 : 4 }} spacing={2}>
        {reminderNotesList.map((note) => (
          <NoteCard key={note.id} noteDetails={note} updateList={handleNotesList} />
        ))}
      </Masonry>
    </Box>
  );
}
