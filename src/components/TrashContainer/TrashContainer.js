import React, { useEffect, useState } from 'react';
import NoteCard from '../NoteCard/NoteCard';
import { getTrashNotesApiCall } from '../../utils/Api';
import styles from './TrashContainer.module.scss';
import { useOutletContext } from "react-router-dom";
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';

export default function TrashContainer() {
  const [trashedNotesList, setTrashedNotesList] = useState([]);
  const {isSidebarOpen } = useOutletContext();

  useEffect(() => {
    getTrashNotesApiCall().then((res) => {
      setTrashedNotesList(res.data.data);
    });
  }, []);

  const handleNotesList = (revicedata) => {
    console.log("revicedata",revicedata)
    const { action, data } = revicedata;
    if (action === 'restore' || action === 'delete') {
      const newUpdatedList = trashedNotesList.filter((note) => note.id !== data.id);
      setTrashedNotesList(newUpdatedList);
    }
  };


  return (
    <Box 
    className={`${styles.notesContainer} ${isSidebarOpen ? styles.expanded : styles.collapsed}`} 
    sx={{ padding: 5, width: "55%"  }}
    >
      <Masonry columns={{ xs: 1, sm: 2, md: isSidebarOpen ? 3 : 4 }} spacing={2}>
        {trashedNotesList.map((note) => (
          <NoteCard key={note.id} noteDetails={note} updateList={handleNotesList} />
        ))}
      </Masonry>
    </Box>
  );
}