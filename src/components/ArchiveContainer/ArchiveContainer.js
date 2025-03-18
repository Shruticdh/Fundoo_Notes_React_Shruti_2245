import React, { useEffect, useState } from 'react';
import NoteCard from '../NoteCard/NoteCard';
import { getArchiveNotesApiCall } from '../../utils/Api';
import styles from './ArchiveContainer.module.scss';
import { useOutletContext } from "react-router-dom";
import Masonry from '@mui/lab/Masonry';
import { Box } from '@mui/material';

export default function ArchiveContainer() {
  const [archivedNotesList, setArchivedNotesList] = useState([]);
  const { isSidebarOpen } = useOutletContext();

  useEffect(() => {
    getArchiveNotesApiCall().then((res) => {
      setArchivedNotesList(res.data.data);
    });
  }, []);

  const handleNotesList = (revicedata) => {
    const { action, data } = revicedata;
    if (action === 'unarchive' || action === 'delete') {
      const newUpdatedList = archivedNotesList.filter((note) => note.id !== data.id);
      setArchivedNotesList(newUpdatedList);
    }
  };

  return (
    <Box 
      className={`${styles.notesContainer} ${isSidebarOpen ? styles.expanded : styles.collapsed}`} 
      sx={{ padding: 5, width: "55%"  }}
    >
      <Masonry columns={{ xs: 1, sm: 2, md: isSidebarOpen ? 3 : 4 }} spacing={2}>
        {archivedNotesList.map((note) => (
          <NoteCard key={note.id} noteDetails={note} updateList={handleNotesList} />
        ))}
      </Masonry>
    </Box>
  );
}

