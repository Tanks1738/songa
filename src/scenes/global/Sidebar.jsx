import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";

// MUI Icons
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

// ✅ Item helper component
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography color={colors.grey[100]}>{title}</Typography>
    </MenuItem>
  );
};

const AppSidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/", { replace: true });
  };

   const handleForm = () => {
    navigate("/form");
  };


  return (
    <Sidebar
      collapsed={isCollapsed}
      rootStyles={{
        height: "100vh", //  sidebar itself fills viewport
        ".ps-sidebar-container": {
          backgroundColor: colors.primary[700],
          height: "100%", // container fills sidebar
        },
        color: colors.grey[100],
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Menu
        menuItemStyles={{
          button: {
            "&:hover": { backgroundColor: "#868dfb", color: "#fff" },
            "&.active": { backgroundColor: "#6870fa", color: "#fff" },
          },
        }}
      >
        {/* Collapse toggle */}
        <MenuItem
          onClick={() => setIsCollapsed(!isCollapsed)}
          icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
        >
          {!isCollapsed && (
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h3">ADMINS</Typography>
              <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                <MenuOutlinedIcon />
              </IconButton>
            </Box>
          )}
        </MenuItem>

        {/* Profile */}
        {!isCollapsed && (
          <Box mb="25px" textAlign="center">
            <img
              alt="profile-user"
              width="100px"
              height="100px"
              src={`../../assets/user.png`}
              style={{ cursor: "pointer", borderRadius: "50%" }}
            />
            <Typography variant="h2" fontWeight="bold" sx={{ mt: "10px" }}>
              Calvin
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[500]}>
              Admin
            </Typography>
          </Box>
        )}

        {/* Navigation */}
        <Item title="Dashboard" to="/admin" icon={<HomeOutlinedIcon />} selected={selected} setSelected={setSelected} />
        <Item title="Manage Drivers" to="/team" icon={<PeopleOutlinedIcon />} selected={selected} setSelected={setSelected} />
        <Item title="Contacts" to="/contacts" icon={<ContactsOutlinedIcon />} selected={selected} setSelected={setSelected} />
        <Item title="Invoices" to="/invoices" icon={<ReceiptOutlinedIcon />} selected={selected} setSelected={setSelected} />
        

         {/* From */}
        <Box mt="auto">
          <MenuItem icon={<PersonOutlinedIcon />} onClick={handleForm}>
            <Typography color={colors.grey[100]}>Form</Typography>
          </MenuItem>
        </Box>


        {/* Logout at bottom */}
        <Box mt="auto">
          <MenuItem icon={<ExitToAppIcon />} onClick={handleLogout}>
            <Typography color={colors.grey[100]}>Logout</Typography>
          </MenuItem>
        </Box>


      </Menu>
    </Sidebar>
  );
};

export default AppSidebar;