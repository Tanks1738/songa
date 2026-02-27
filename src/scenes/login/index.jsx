import { useState, useEffect } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  Alert,
  Fade,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

const LoginPage = () => {
  // ✅ Form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cellNumber, setCellNumber] = useState("");
  const [email, setEmail] = useState("");  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("driver");
  const [driverId, setDriverId] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // ✅ Alert state
  const [showSessionExpired, setShowSessionExpired] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Clear token on startup and check if redirected with sessionExpired flag
  useEffect(() => {
    localStorage.removeItem("token"); // always start clean
    if (location.state?.sessionExpired) {
      setShowSessionExpired(true); // show alert if redirected
    }
  }, [location.state]);


  // ✅ Login handler
const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:3001/login", { username, password });
    console.log("Login response:", res.data);
    const { token } = res.data;

    if (!token) {
      alert("Login failed: no token received");
      return;
    }

    localStorage.setItem("token", token);

    const payload = JSON.parse(atob(token.split(".")[1]));
    console.log("Decoded JWT payload:", payload);

     // 👇 Always go to login page first
    navigate("/", { replace: true });

     // 👇 Then, if you want, you can conditionally redirect later
    if (payload.role === "admin") {
      console.log("User is admin, dashboard available at /admin,Navigating to /admin");
      navigate("/admin");
    } else if (payload.role === "driver") {
      navigate("/driver");
      console.log("User is driver, dashboard available at /driver, Navigating to /driver");

    } else {
      alert("Login failed: role missing in token");
    }
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    alert("Login failed");
  }
};

  // ✅ Register handler
  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:3001/register", {
        username,
        password,
        role,
        driverId: role === "driver" ? driverId : null,
        firstName,
        lastName,
        cellNumber,
        email,
      });
      alert("Registration successful! You can now log in.");
      setIsRegister(false);
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <Box display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center"
        height="100vh">

          {/*FLEET MANAGEMENT TEXT */}
        <Typography 
              variant="h4" 
              mb={2} 
              color="#e0e0e0"
              sx={{ lineHeight: 4 }} // Adjust text height, move it further up
              
        >
              SONGA Fleet Management {isRegister ? "Register" : "Login"}
        </Typography>


      {/* ✅ Fade-in + Fade-out + Dismissible session expired alert */}
      <Fade in={showSessionExpired} timeout={{ enter: 600, exit: 600 }}>
        <Box>
          {showSessionExpired && (
            <Alert
              severity="error"
              sx={{ mb: 2, width: "300px" }}
              onClose={() => setShowSessionExpired(false)} // close button triggers fade-out
            >
              Session expired. Please log in again.
            </Alert>
          )}
        </Box>
      </Fade>

      {/* ✅ Login/Register form */}
      <TextField label="Username" value={username} onChange={(e) => setUsername(e.target.value)} sx={{ mb: 2, width: "300px" }} />
      <TextField label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} sx={{ mb: 2, width: "300px" }} />

      {isRegister && (
        <>
          <TextField label="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} sx={{ mb: 2, width: "300px" }} />
          <TextField label="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} sx={{ mb: 2, width: "300px" }} />
          <TextField label="Cell Number" value={cellNumber} onChange={(e) => setCellNumber(e.target.value)} sx={{ mb: 2, width: "300px" }} />
          <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} sx={{ mb: 2, width: "300px" }} />

          <Select value={role} onChange={(e) => setRole(e.target.value)} sx={{ mb: 2, width: "300px" }}>
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="driver">Driver</MenuItem>
          </Select>

          {role === "driver" && (
            <TextField label="Driver ID" value={driverId} onChange={(e) => setDriverId(e.target.value)} sx={{ mb: 2, width: "300px" }} />
          )}
        </>
      )}
                     {/*ACTUAL LOGIN BUTTON */}
      <Button
            variant="contained"
            color="primary"
            onClick={isRegister ? handleRegister : handleLogin}
            sx={{
              border: "2px solid #fff", // white border
              borderRadius: "8px",      // Rounded corners
            }}
          >
            {isRegister ? "Register" : "Login"}
    </Button>
      <Button sx={{ mt: 2 }} onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Already have an account? Login" : "Create an account"}
      </Button>
    </Box>
  );
};

export default LoginPage;