import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

const EditVolunteerModal = ({ isOpen, onClose, onSubmit, currVolunteer }) => {
  const [volunteerData, setVolunteerData] = useState({
    id: "",
    name: "",
    avatar: "",
    hero_project: "",
    notes: "",
    email: "",
    phone: "",
    rating: "",
    status: "",
  });

  useEffect(() => {
    if (currVolunteer) {
      setVolunteerData({
        _id: currVolunteer._id,
        id: currVolunteer.id || "",
        name: currVolunteer.name || "",
        avatar: currVolunteer.avatar || "",
        hero_project: currVolunteer.hero_project || "",
        notes: currVolunteer.notes || "",
        email: currVolunteer.email || "",
        phone: currVolunteer.phone || "",
        rating: currVolunteer.rating || "",
        status: currVolunteer.status ? "Active" : "Inactive",
      });
    }
  }, [currVolunteer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVolunteerData({ ...volunteerData, [name]: value });
  };

  const handleSubmit = () => {
    onSubmit(volunteerData);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 0,
          p: 4,
          borderRadius: "15px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Typography variant="h4" component="h4">
          Edit Volunteer
        </Typography>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              id="standard-multiline-flexible"
              label="ID:"
              multiline
              maxRows={4}
              variant="standard"
              type="text"
              name="id"
              value={volunteerData.id}
              onChange={handleChange}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Name:"
              multiline
              maxRows={4}
              variant="standard"
              type="text"
              name="name"
              value={volunteerData.name}
              onChange={handleChange}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Avatar:"
              multiline
              maxRows={4}
              variant="standard"
              type="text"
              name="avatar"
              value={volunteerData.avatar}
              onChange={handleChange}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Hero Project:"
              multiline
              maxRows={4}
              variant="standard"
              type="text"
              name="hero_project"
              value={volunteerData.hero_project}
              onChange={handleChange}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Notes:"
              multiline
              rows={4}
              variant="standard"
              type="text"
              name="notes"
              value={volunteerData.notes}
              onChange={handleChange}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Email:"
              multiline
              maxRows={4}
              variant="standard"
              type="text"
              name="email"
              value={volunteerData.email}
              onChange={handleChange}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Phone:"
              multiline
              maxRows={4}
              variant="standard"
              type="text"
              name="phone"
              value={volunteerData.phone}
              onChange={handleChange}
            />
            <TextField
              id="standard-multiline-flexible"
              label="Rating:"
              multiline
              maxRows={4}
              variant="standard"
              type="text"
              name="rating"
              value={volunteerData.rating}
              onChange={handleChange}
            />

            <ThemeProvider theme={theme}>
              <Button variant="contained" type="submit" color="submit">
                SAVE CHANGES
              </Button>
            </ThemeProvider>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default EditVolunteerModal;
