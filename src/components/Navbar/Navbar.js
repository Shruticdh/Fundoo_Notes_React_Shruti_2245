import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import ArchiveOutlinedIcon from "@mui/icons-material/ArchiveOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";
import AppsIcon from "@mui/icons-material/Apps";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Img from "../../assest/googlekeep4.png";
import Tooltip from "@mui/material/Tooltip";
import toast from "react-hot-toast";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import "./Navbar.scss";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open
    ? {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      }
    : {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      }),
}));

export default function Navbar({
  setSearchQuery,
  isSidebarOpen,
  setIsSidebarOpen,
  isListView, 
  setIsListView
}) {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Animation lasts 1 sec
  }, []);
  const handleRefresh = () => {
    if (refreshing) return; // Prevent multiple clicks
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000); // Rotate for 1 second
  };
  const handleDrawerToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successful");
    navigate("/");
    setAnchorEl(null);
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleToggle = () => {
    setIsListView(!isListView);
  };


  const getTitle = () => {
    if (location.pathname.includes("archive")) return "Archive";
    if (location.pathname.includes("trash")) return "Trash";
    if (location.pathname.includes("reminders")) return "Reminders";
    if (location.pathname.includes("edit-labels")) return "Edit Labels";
    return "Keep"; // Default title
  };

  const getActiveStyle = (path) => ({
    backgroundColor:
      location.pathname === path ? "rgb(254, 239, 195)" : "transparent",
    color: "black",
    width: isSidebarOpen ? "280px" : "70px",
    borderRadius: isSidebarOpen ? "0px 25px 25px 0px" : "50px 50px", // Open hone par rectangle, band hone par circle
    padding: isSidebarOpen ? "10px 20px" : "10px 20px 10px 10px", // Band hone par padding adjust
  });

  return (
    <div className="navbar-container">
      <div className="fundoo-navbar">
        <div className="fundoo-navbar-left">
          <MenuIcon className="icon" onClick={handleDrawerToggle} />
          {getTitle() === "Keep" && (
            <div className="header-image">
              <img src={Img} alt="header-img" className="header-img" />
            </div>
          )}
          <h2>{getTitle()}</h2>
        </div>
        <div className="fundoo-navbar-search">
          <SearchIcon className="icon" />
          <input
            type="text"
            placeholder="Search"
            className="search-input"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="fundoo-navbar-icons">
          <Tooltip title="Refresh">
        <IconButton onClick={handleRefresh}>
          <RefreshIcon className={`icon ${refreshing ? "rotate" : ""}`} />
        </IconButton>
      </Tooltip>
          <Tooltip title={isListView ? "GridView" : "ListView"}>
            <IconButton onClick={handleToggle}>
              {isListView ? (
                <ViewModuleIcon className="icon" />
              ) : (
                <ViewStreamIcon className="icon" />
              )}
            </IconButton>
          </Tooltip>
          <Tooltip title="Setting">
            <IconButton>
              <SettingsIcon className="icon" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Apps">
            <IconButton>
              <AppsIcon className="icon" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Account">
            <IconButton onClick={handleMenuOpen}>
              <AccountCircleIcon className="icon" />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <PersonIcon style={{ marginRight: 8 }} />
              Profile
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <SettingsIcon style={{ marginRight: 8 }} />
              Setting
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <LogoutIcon style={{ marginRight: 8 }} />
              Logout
            </MenuItem>
          </Menu>
        </div>
      </div>

      <Box sx={{ display: "flex" }}>
        <Drawer
          variant="permanent"
          open={isSidebarOpen}
          className={`fundoo-drawer ${isSidebarOpen ? "" : "collapsed"}`}
        >
          <Divider />
          <List>
            <ListItem
              button
              onClick={() => handleNavigation("/dashboard/notes")}
              style={getActiveStyle("/dashboard/notes")}
            >
              <ListItemIcon className="drawer-icon">
                <LightbulbOutlinedIcon />
              </ListItemIcon>
              {isSidebarOpen && <ListItemText primary="Notes" />}
            </ListItem>
            <ListItem
              button
              onClick={() => handleNavigation("/dashboard/reminder")}
              style={getActiveStyle("/dashboard/reminder")}
            >
              <ListItemIcon className="drawer-icon">
                <NotificationsNoneOutlinedIcon />
              </ListItemIcon>
              {isSidebarOpen && <ListItemText primary="Reminders" />}
            </ListItem>
            <ListItem
              button
              onClick={() => handleNavigation("/dashboard/labels")}
              style={getActiveStyle("/dashboard/labels")}
            >
              <ListItemIcon className="drawer-icon">
                <EditOutlinedIcon />
              </ListItemIcon>
              {isSidebarOpen && <ListItemText primary="Edit Labels" />}
            </ListItem>
            <ListItem
              button
              onClick={() => handleNavigation("/dashboard/archive")}
              style={getActiveStyle("/dashboard/archive")}
            >
              <ListItemIcon className="drawer-icon">
                <ArchiveOutlinedIcon />
              </ListItemIcon>
              {isSidebarOpen && <ListItemText primary="Archive" />}
            </ListItem>
            <ListItem
              button
              onClick={() => handleNavigation("/dashboard/trash")}
              style={getActiveStyle("/dashboard/trash")}
            >
              <ListItemIcon className="drawer-icon">
                <DeleteOutlineOutlinedIcon />
              </ListItemIcon>
              {isSidebarOpen && <ListItemText primary="Trash" />}
            </ListItem>
          </List>
        </Drawer>
      </Box>
      <style>
        {`
          .rotate {
            animation: spin 1s linear;
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}
