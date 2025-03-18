import React, { useState, useEffect } from "react";
import { addNoteApiCall, editNotesApiCall } from "../../utils/Api";
import "./AddNotes.scss";
import AddAlertIcon from "@mui/icons-material/AddAlert"; // Reminder
import PersonAddIcon from "@mui/icons-material/PersonAdd"; // Collaborator
import PaletteIcon from "@mui/icons-material/Palette"; // Background color
import ImageIcon from "@mui/icons-material/Image"; // Add image
import ArchiveIcon from "@mui/icons-material/Archive"; // Archive
import MoreVertIcon from "@mui/icons-material/MoreVert"; // More options
import DeleteIcon from "@mui/icons-material/Delete"; // Delete
// import LabelIcon from "@mui/icons-material/Label"; // Labels
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconButton } from "@mui/material";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined"; // Image
import CheckBoxOutlinedIcon from "@mui/icons-material/CheckBoxOutlined"; // Checkbox List
import UndoIcon from "@mui/icons-material/Undo"; // Undo
import RedoIcon from "@mui/icons-material/Redo"; // Redo

export default function AddNotes(props) {
 const {updateList, expanded = false, noteDetails = null}=props;
  const [title, setTitle] = useState(noteDetails ? noteDetails.title : "");
  const [description, setDescription] = useState(
    noteDetails ? noteDetails.description : ""
  );
  const [isExpanded, setIsExpanded] = useState(expanded);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleAddNote = () => {
    if (isExpanded && (title || description)) {
      if (!noteDetails) {
        console.log("Title: --->>>", title);
        console.log("Description: --->>>", description);
        addNoteApiCall({ title, description })
          .then((response) => {
            console.log("Response: --->>>", response);
            updateList({ data: response.status.details, action: "add" });
            setTitle("");
            setDescription("");
          })
          .catch((error) => console.log("Add Note Error:", error));
      } else {
        const editNotePayload = {
          ...noteDetails,
          title,
          description,
          noteId: noteDetails?.id,
        };
        editNotesApiCall(editNotePayload)
          .then((res) => {
            console.log("Response form edit api call: ", res);

            const updateListFunctionPayload = {
              data: { ...noteDetails, title, description },
              action: "edit",
            };
            updateList(updateListFunctionPayload);
          })
          .catch((error) => console.log("Edit Note Error:", error));
      }
    }
    setIsExpanded(!isExpanded);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="add-note-container">
      {isExpanded ? (
        <div className="expanded-note-box">
          <div className="note-header">
            <input
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <textarea
            value={description}
            placeholder="Take a note..."
            onChange={(e) => {
              setDescription(e.target.value);
              e.target.style.height = "auto"; // Reset height
              e.target.style.height = e.target.scrollHeight + "px";
            }}
            style={{
              width: "100%",
              minHeight: "30px", // Initial height
              maxHeight: "300px", // Prevent too much expansion
              resize: "none", // Disable manual resizing
              // overflow: "hidden", // Hide scrollbar
              border: "none", // Removes border
              outline: "none", // Removes outline on focus
              background: "transparent", // Matches Keep Notes UI
              fontSize: "16px", // Adjust font size
              padding: "5px", // Adds spacing
            }}
          />
          <div className="note-icons-close">
            <div className="note-icons">
              <AddAlertIcon className="icon" fontSize="small" />
              <PersonAddIcon className="icon" fontSize="small" />
              <PaletteIcon className="icon" fontSize="small" />
              <ImageIcon className="icon" fontSize="small" />
              <ArchiveIcon className="icon" fontSize="small" />
              <DeleteIcon className="icon" fontSize="small" />
              <MoreVertIcon className="icon" onClick={handleMenuClick} />
              <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                <MenuItem onClick={handleMenuClose}>Delete</MenuItem>
                <MenuItem onClick={handleMenuClose}>Make a Copy</MenuItem>
                <MenuItem onClick={handleMenuClose}>Labels</MenuItem>
              </Menu>

              <UndoIcon className="icon" />
              <RedoIcon className="icon" />
            </div>
            <button className="close-button" onClick={handleAddNote}>
              Close
            </button>
          </div>
        </div>
      ) : (
        <div className="note-box" onClick={() => setIsExpanded(true)}>
          <span>Take a note...</span>
          <div className="take-note-icons">
            <IconButton>
              <CheckBoxOutlinedIcon />
            </IconButton>
            <IconButton>
              <BrushOutlinedIcon />
            </IconButton>
            <IconButton>
              <ImageOutlinedIcon />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}
