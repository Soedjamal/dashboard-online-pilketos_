import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import Candidates from "./components/Candidates";
import VoterCards from "./components/VoterCards";
import Voters from "./components/Voters";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Container >
        <Routes>
          <Route path="/" element={<Candidates />} />
          <Route path="/voter-cards" element={<VoterCards />} />
          <Route path="/voters" element={<Voters />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
