import React, { useState } from "react";
import styles from "./NoteCard.module.scss";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import PaletteIcon from "@mui/icons-material/Palette";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import AddNotes from "../AddNotes/AddNotes";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ClearIcon from "@mui/icons-material/Clear";
import {
  archiveNotesApiCall,
  trashNotesApiCall,
  unarchiveNotesApiCall,
  deleteForeverNotesApiCall,
  restoreNotesApiCall,
  colorNotesApiCall,
  addUpdateReminderApiNotes,
  removeReminderApiNotes,
} from "../../utils/Api";

export default function NoteCard({ noteDetails, updateList }) {
  const [editNote, setEditNote] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [showColorPalette, setShowColorPalette] = useState(false);
  const [reminderAnchorEl, setReminderAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const reminderOpen = Boolean(reminderAnchorEl);
  const [showDateTimeInput, setShowDateTimeInput] = useState(false);
  const [dateTime, setDateTime] = useState("");
  const [repeat, setRepeat] = useState("");

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleReminderClick = (event) => {
    setReminderAnchorEl(event.currentTarget);
  };

  const handleReminderClose = () => {
    setReminderAnchorEl(null);
  };

  const handlePickDateTime = () => {
    setShowDateTimeInput(true); // Show input field
  };

  const handleSaveReminder = () => {
    if (!dateTime) {
      return;
    }
  
    const payload = {
      noteIdList: [noteDetails.id],
      reminder: dateTime,
    };
  
    addUpdateReminderApiNotes(payload)
      .then(() => {
        console.log("Reminder set successfully!");
        updateList({ data: { ...noteDetails, reminder: dateTime }, action: "reminderSet" });
        setShowDateTimeInput(false);
        handleReminderClose();
      })
      .catch((error) => {
        console.error("Failed to set reminder:", error);
      });
  };
    
  // const handleRemoveReminder = () => {
  //   const payload = { noteIdList: [noteDetails.id] };
  
  //   removeReminderApiNotes(payload)
  //     .then(() => {
  //       console.log("Reminder removed successfully!");
  
  //       // Note ko Reminder section se hata do agar reminder null ho gaya
  //       updateList({ data: { ...noteDetails, reminder: null }, action: "removeReminder" });
  //     })
  //     .catch((error) => console.error("Failed to remove reminder:", error));
  // };

  const handleRemoveReminder = () => {
    const payload = { noteIdList: [noteDetails.id] }; 
    const updatedNote = { ...noteDetails, reminder: null };
    updateList({ action: "reminderRemove", data: updatedNote }); 
  
    removeReminderApiNotes(payload)
      .then(() => {
        console.log("Reminder removed successfully!");
        updateList({ action: "reminderRemove", data: updatedNote }); 
      })
      .catch((error) => {
        console.error("Failed to remove reminder:", error);
      });
  };
  

  const handleMenuOpen = (action, data = null) => {
    // console.log("Action: ----->>>>>> ", action);
    const archivePayload = { noteIdList: [noteDetails.id], isArchived: true };
    const unarchivePayload = {
      noteIdList: [noteDetails.id],
      isArchived: false,
    };
    const trashPayload = { noteIdList: [noteDetails.id], isDeleted: true };
    const restorePayload = { noteIdList: [noteDetails.id], isDeleted: false };
    const deleteForeverPayload = {
      noteIdList: [noteDetails.id],
      isDeleted: true,
    };

    if (action === "archive") {
      archiveNotesApiCall(archivePayload).then(() => {
        updateList({ data: noteDetails, action: "archive" });
      });
    } else if (action === "unarchive") {
      unarchiveNotesApiCall(unarchivePayload).then(() => {
        // console.log("Archive Response: ---->>>>", res);
        updateList({ data: noteDetails, action: "unarchive" });
      });
    } else if (action === "edit") {
      console.log("ddhbfchsd", action);
      setEditNote(false);
      updateList(data, action);
    } else if (action === "delete") {
      trashNotesApiCall(trashPayload).then(() =>
        updateList({ data: noteDetails, action: "delete" })
      );
    } else if (action === "restore") {
      restoreNotesApiCall(restorePayload).then(() =>
        updateList({ data: noteDetails, action: "restore" })
      );
    } else if (action === "deleteForever") {
      deleteForeverNotesApiCall(deleteForeverPayload).then(() =>
        updateList({ data: noteDetails, action: "delete" })
      );
    }
    handleMenuClose();
  };
  const handleColorChange = (color) => {
    const updatedNote = { ...noteDetails, color };

    // Immediately update UI
    updateList({ data: updatedNote, action: "colorChange" });

    // Call API to persist color change
    colorNotesApiCall({ noteIdList: [noteDetails.id], color })
      .then(() => console.log("Color Updated Successfully"))
      .catch((error) => console.error("Color Change API Error: ", error));

    setShowColorPalette(false);
  };

  return (
    <div
      className={styles.noteCard}
      onMouseEnter={() => setShowIcons(true)}
      onMouseLeave={() => setShowIcons(false)}
      style={{ backgroundColor: noteDetails.color || "white" }}
    >
      <div className={styles.content}>
        <h3 className={styles.title}>{noteDetails.title}</h3>
        <p className={styles.description} onClick={() => setEditNote(true)}>{noteDetails.description}</p>
{noteDetails.reminder && !isNaN(new Date(noteDetails.reminder).getTime()) && (
  <div className={styles.reminder}>
    <AccessTimeIcon className={styles.reminderIcon} />
    {new Date(noteDetails.reminder).toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}
     <ClearIcon 
      className={styles.clearReminderIcon} 
      // onClick={() => handleMenuOpen("removeReminder")}
      onClick={handleRemoveReminder} 
    />
  </div>
)}
      </div>

      {showIcons && (
        <div className={styles.noteIcons}>
          {!noteDetails.isDeleted ? (
            <>
              <NotificationsNoneIcon
                className={styles.icon}
                fontSize="small"
                onClick={handleReminderClick}
              />
              <Menu
                anchorEl={reminderAnchorEl}
                open={reminderOpen}
                onClose={handleReminderClose}
                style={{
                  style: { width: "400px", padding: "10px" , gap:"10px"},
                }}
              >
                <MenuItem onClick={handlePickDateTime}>
                  Pick date & time
                </MenuItem>
                {showDateTimeInput && (
                  <div className={styles.dateTimePicker}>
                    <TextField
                      type="datetime-local"
                      value={dateTime}
                      onChange={(e) => setDateTime(e.target.value)}
                      fullWidth
                    />
                    <FormControl fullWidth>
                      <InputLabel>Repeat</InputLabel>
                      <Select
                        native
                        value={repeat}
                        onChange={(e) => setRepeat(e.target.value)}
                      >
                        <option value="none">None</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </Select>

                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: "10px",
                        }}
                      >
                        <MenuItem onClick={handleReminderClose}>
                          Cancel
                        </MenuItem>
                        <MenuItem
                          onClick={handleSaveReminder}
                          style={{ fontWeight: "bold" }}
                        >
                          Save
                        </MenuItem>
                      </div>
                    </FormControl>
                  </div>
                )}
              </Menu>

              <PersonAddAltIcon className={styles.icon} fontSize="small" />
              {/* <ColorLensIcon className={styles.icon} fontSize="small"  onClick={() => setShowColorPalette(!showColorPalette)}
                titleAccess="Change Color"/> */}
              <PaletteIcon
                className={styles.icon}
                onClick={() => setShowColorPalette(!showColorPalette)}
                titleAccess="Change Color"
              />
              <AddPhotoAlternateIcon className={styles.icon} fontSize="small" />
              {noteDetails.isArchived ? (
                <UnarchiveIcon
                  className={styles.icon}
                  fontSize="small"
                  onClick={() => handleMenuOpen("unarchive")}
                />
              ) : (
                <ArchiveIcon
                  className={styles.icon}
                  fontSize="small"
                  onClick={() => handleMenuOpen("archive")}
                />
              )}
              <MoreVertIcon
                className={styles.icon}
                fontSize="small"
                onClick={handleMenuClick}
              />
            </>
          ) : (
            <>
              <RestoreFromTrashIcon
                className={styles.icon}
                fontSize="small"
                onClick={() => handleMenuOpen("restore")}
              />
              <DeleteOutlineIcon
                className={styles.icon}
                fontSize="small"
                onClick={() => handleMenuOpen("deleteForever")}
              />
            </>
          )}
          {showColorPalette && (
            <div className={styles.colorPalette}>
              {[
                "#F6E2DD",
                "#FFFFFF",
                "#F39F76",
                "#FFF8B8",
                "#E2F6D3",
                "#B4DDD3",
                "#D4E4ED",
                "#AECCDC",
                "#D3BFDB",
                "#F6E2DD",
                "#E9E3D4",
                "#EFEFF1",
              ].map((color) => (
                <div
                  key={color}
                  style={{
                    backgroundColor: color,
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    margin: "4px",
                    cursor: "pointer",
                  }}
                  onClick={() => handleColorChange(color)}
                ></div>
              ))}
            </div>
          )}

          <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
            {!noteDetails.isDeleted && (
              <div>
                <MenuItem onClick={() => handleMenuOpen("delete")}>
                  Delete
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>Make a Copy</MenuItem>
                <MenuItem onClick={handleMenuClose}>Labels</MenuItem>
                <MenuItem onClick={handleMenuClose}>Add drawing</MenuItem>
                <MenuItem onClick={handleMenuClose}>Make a copy</MenuItem>
                <MenuItem onClick={handleMenuClose}>Show checkboxes</MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  Copy to Google Docs
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>Version history</MenuItem>
              </div>
            )}
          </Menu>
        </div>
      )}

      <Modal open={editNote} onClose={() => setEditNote(false)}>
        <AddNotes
          expanded
          // setEditNote={setEditNote}
          noteDetails={noteDetails}
          updateList={(data) => handleMenuOpen("edit", data)}
        />
      </Modal>
    </div>
  );
}
