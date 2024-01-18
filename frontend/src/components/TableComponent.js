import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Axios from "axios";

// Component library
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  IconButton,
} from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import theme from "../theme";

import AddIcon from "@mui/icons-material/Add";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import StickyNote2OutlinedIcon from "@mui/icons-material/StickyNote2Outlined";
import UnfoldMoreOutlinedIcon from "@mui/icons-material/UnfoldMoreOutlined";

// Our components
import {
  AddVolunteerModal,
  EditVolunteerModal,
  Pagination,
  StatusBadge,
  CheckboxesTags,
} from "../components";

import { sortProject, truncateText, filterProject } from "../utils/tableUtils";

import "../style/Table.css";

const TableComponent = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { role } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [originalUserData, setOriginalUserData] = useState([]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const [isSorted, setIsSorted] = useState(false);

  const [projectTitle, setProjectTitle] = useState([]);

  const styles = {
    blue: {
      fontSize: 20,
      color: "#038aff",
    },
    gray: {
      fontSize: 20,
      color: "#a1a6ab",
    },
  };

  useEffect(() => {
    Axios.get(`http://localhost:5001/api/bog/users`)
      .then((response) => {
        setUserData(response.data);
        setOriginalUserData(response.data);
        setProjectTitle([
          ...new Set(response.data.map((user) => user.hero_project)),
        ]);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    console.log(role);
    if (role === "admin") {
      setIsAdmin(true);
    }
    if (role === "viewer") {
      setIsAdmin(false);
    }
  }, [role]);

  const handleAddModalOpen = () => {
    setIsAddModalOpen(true);
  };
  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };
  const handleAdd = async (newVolunteerData) => {
    try {
      newVolunteerData.status = false;
      const response = await Axios.post(
        "http://localhost:5001/api/bog/users",
        newVolunteerData
      );

      setUserData([...userData, response.data]);
    } catch (error) {
      console.error("Error adding new volunteer:", error.message);
    }
  };

  const handleEditModalOpen = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setIsEditModalOpen(true);
  };
  const handleEditModalClose = () => {
    setSelectedVolunteer(null);
    setIsEditModalOpen(false);
  };
  const handleSave = async (newVolunteerData) => {
    try {
      newVolunteerData.status = false;
      await Axios.put(
        `http://localhost:5001/api/bog/users/${newVolunteerData._id}`,
        newVolunteerData
      );
      const updatedUserData = userData.map((volunteer) =>
        volunteer._id === newVolunteerData._id ? newVolunteerData : volunteer
      );
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error updating volunteer:", error.message);
    }
  };

  const handleDelete = async (idToDelete) => {
    try {
      await Axios.delete(`http://localhost:5001/api/bog/users/${idToDelete}`);

      const updatedUserData = userData.filter(
        (volunteer) => volunteer._id !== idToDelete
      );
      setUserData(updatedUserData);
    } catch (error) {
      console.error("Error deleting user:", error.message);
    }
  };

  const handleView = async (id) => {
    navigate(`/volunteer/${id}`);
  };

  const lastUserIndex = currentPage * usersPerPage;
  const firstUserIndex = lastUserIndex - usersPerPage;
  const currentUsers = userData.slice(firstUserIndex, lastUserIndex);

  const handleSortProject = () => {
    if (isSorted) {
      setUserData([...originalUserData]);
    } else {
      const sorted = sortProject(userData);
      setUserData(sorted);
    }
    setIsSorted((prevIsSorted) => !prevIsSorted);
  };

  const handleProjectChange = (selectedProjects) => {
    console.log("Selected projects:", selectedProjects);
    setUserData(filterProject(originalUserData, selectedProjects));
  };

  return (
    <TableContainer component={Paper} className="Table">
      <div className="flex">
        <h2>Volunteer Data Table</h2>
        <div className="flex">
          <CheckboxesTags
            projectTitle={projectTitle}
            onProjectChange={handleProjectChange}
          />
          {isAdmin && (
            <ThemeProvider theme={theme}>
              <Button
                variant="contained"
                color="submit"
                onClick={handleAddModalOpen}
                startIcon={<AddIcon />}
              >
                Add new
              </Button>
            </ThemeProvider>
          )}
        </div>
      </div>

      <AddVolunteerModal
        isOpen={isAddModalOpen}
        onClose={handleAddModalClose}
        onSubmit={handleAdd}
      />

      <EditVolunteerModal
        isOpen={isEditModalOpen}
        onClose={handleEditModalClose}
        onSubmit={handleSave}
        currVolunteer={selectedVolunteer}
      />

      <Table>
        <TableHead>
          <TableRow style={{ background: "#e7eff8" }}>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>
              Hero Project
              <span
                onClick={() => {
                  handleSortProject();
                }}
                className="sortIconContainer"
              >
                <UnfoldMoreOutlinedIcon fontSize="small" />
              </span>
            </TableCell>
            <TableCell>Notes</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Rating</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currentUsers.map((volunteer) => (
            <TableRow key={volunteer.id}>
              <TableCell>{volunteer.id}</TableCell>
              <TableCell>
                <div className="nameRow">
                  <img
                    src={volunteer.avatar}
                    alt={`Avatar of ${volunteer.name}`}
                    className="avatarContainer"
                  />
                  {volunteer.name}
                </div>
              </TableCell>
              <TableCell>{volunteer.hero_project}</TableCell>
              <TableCell>{truncateText(volunteer.notes, 10)}</TableCell>
              <TableCell>{volunteer.email}</TableCell>
              <TableCell>{volunteer.phone}</TableCell>
              <TableCell>{volunteer.rating}</TableCell>
              <TableCell>
                <StatusBadge status={volunteer.status} />
              </TableCell>
              <TableCell>
                <IconButton>
                  <StickyNote2OutlinedIcon
                    onClick={() => handleView(volunteer._id)}
                    sx={styles.blue}
                  />
                </IconButton>

                {isAdmin && (
                  <IconButton>
                    <EditOutlinedIcon
                      onClick={() => handleEditModalOpen(volunteer)}
                      sx={styles.gray}
                    />
                  </IconButton>
                )}

                {isAdmin && (
                  <IconButton>
                    <DeleteOutlineOutlinedIcon
                      sx={styles.gray}
                      onClick={() => handleDelete(volunteer._id)}
                    />
                  </IconButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Component */}
      <Pagination
        totalUsers={userData.length}
        usersPerPage={usersPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        className="flex"
      />
    </TableContainer>
  );
};

export default TableComponent;
