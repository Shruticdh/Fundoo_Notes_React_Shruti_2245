import axios from "axios";

export const signupApiCall = (payload) => {
  return axios
    .post(
      "https://fundoonotes.incubation.bridgelabz.com/api/user/userSignUp",
      payload
    )
    .then((response) => {
      console.log("Signup Response:", response.data); // Backend ka response console pe print hoga
      return response.data; // Response return kar raha hoon taaki component use kar sake
    })
    .catch((error) => {
      console.log(
        "Signup Error:",
        error.response ? error.response.data : error.message
      );
      throw error; // Error aaya toh throw kar raha hoon
    });
};

export const loginApiCall = (payload) => {
  return axios
    .post(
      "https://fundoonotes.incubation.bridgelabz.com/api/user/login",
      payload,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      console.log("Login Response:", response.data);
      return response.data; // Successful login ka response return karega
    })
    .catch((error) => {
      console.log(
        "Login Error:",
        error.response ? error.response.data : error.message
      );
      return null; // Error hone pe null return karega
    });
};

// export const addNoteApiCall = (payload)=> {
//     axios.post('https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes',payload,
//         {headers:{
//             Authorization: localStorage.getItem('token')
//             // Authorization:"cwFwnwwHCBIRHBJ9YMAfvYEOsstc94HNzycsYlu50juLhOvgDf0MDRUczyo9AAYU"
//         }}
//     )
// }

// export const getNotesApiCall = (payload)=> {
//     axios.post('https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotes',payload,
//         {header:{
//             Authorization: localStorage.getItem('token')
//             // Authorization:"cwFwnwwHCBIRHBJ9YMAfvYEOsstc94HNzycsYlu50juLhOvgDf0MDRUczyo9AAYU"
//         }}
//     )
// }

export const addNoteApiCall = (payload) => {
  return axios
    .post(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/addNotes",
      payload,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          // Authorization: "cwFwnwwHCBIRHBJ9YMAfvYEOsstc94HNzycsYlu50juLhOvgDf0MDRUczyo9AAYU"
        },
      }
    )
    .then((response) => {
      console.log("Add Note Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(
        "Add Note Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const getNotesApiCall = () => {
  return axios
    .get(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/getNotesList",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          // Authorization: "cwFwnwwHCBIRHBJ9YMAfvYEOsstc94HNzycsYlu50juLhOvgDf0MDRUczyo9AAYU"
        },
      }
    )
    .then((response) => {
      // console.log("Get Notes Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(
        "Get Notes Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const archiveNotesApiCall = (payload) => {
  return axios
    .post(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",
      payload,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          // Authorization: "cwFwnwwHCBIRHBJ9YMAfvYEOsstc94HNzycsYlu50juLhOvgDf0MDRUczyo9AAYU"
        },
      }
    )
    .then((response) => {
      console.log("Get Archived Notes Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(
        "Get Archived Notes Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const trashNotesApiCall = (payload) => {
  return axios
    .post(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",
      payload,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          // Authorization: "cwFwnwwHCBIRHBJ9YMAfvYEOsstc94HNzycsYlu50juLhOvgDf0MDRUczyo9AAYU"
        },
      }
    )
    .then((response) => {
      console.log("Signup Response:", response.data); // Backend ka response console pe print hoga
      return response.data; // Response return kar raha hoon taaki component use kar sake
    })
    .catch((error) => {
      console.log(
        "Signup Error:",
        error.response ? error.response.data : error.message
      );
      throw error; // Error aaya toh throw kar raha hoon
    });
};

export const getArchiveNotesApiCall = () => {
  return axios
    .get(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/getArchiveNotesList",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
          // Authorization: "cwFwnwwHCBIRHBJ9YMAfvYEOsstc94HNzycsYlu50juLhOvgDf0MDRUczyo9AAYU"
        },
      }
    )
    .then((response) => {
      console.log("Get Archived Notes Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(
        "Get Archived Notes Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const getTrashNotesApiCall = () => {
  return axios
    .get(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/getTrashNotesList",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      console.log("Get Trashed Notes Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(
        "Get Trashed Notes Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const editNotesApiCall = (payload) => {
  console.log("payload Edit API", payload);
  return axios
    .post(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/updateNotes",
      payload,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      console.log("Edit Notes Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(
        "Edit Notes Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const unarchiveNotesApiCall = (payload) => {
  return axios
    .post(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/archiveNotes",
      payload,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      // console.log("Unarchive Notes Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(
        "Unarchive Notes Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const deleteForeverNotesApiCall = (payload) => {
  return axios
    .post(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/deleteForeverNotes",
      payload,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      console.log("Delete Forever Notes Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(
        "Delete Forever Notes Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const restoreNotesApiCall = (payload) => {
  return axios
    .post(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/trashNotes",
      payload,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      console.log("Restore Notes Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(
        "Restore Notes Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const colorNotesApiCall = (payload) => {
  return axios
    .post(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/changesColorNotes",
      payload,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      console.log("Color Notes Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(
        "Color Notes Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
};

export const addUpdateReminderApiNotes = (payload) => {
  return axios
    .post(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/addUpdateReminderNotes",
      payload,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      console.log("Remainder Notes Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(
        "Remanider Notes Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
}

export const setReminderApiNotes = () => {
  return axios
    .get(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/getReminderNotesList",
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      console.log("Remainder Notes Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(
        "Remanider Notes Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
}
export const removeReminderApiNotes = (payload) => {
  return axios
    .post(
      "https://fundoonotes.incubation.bridgelabz.com/api/notes/removeReminderNotes",payload,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    )
    .then((response) => {
      console.log("Remove Remainder Notes Response:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.log(
        "Remove Remanider Notes Error:",
        error.response ? error.response.data : error.message
      );
      throw error;
    });
}
