import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import Candidates from "./components/Candidates";
import VoterCards from "./components/VoterCards";
import Voters from "./components/Voters";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Kandidat
          </Button>
          <Button color="inherit" component={Link} to="/voter-cards">
            Kartu Pemilih
          </Button>
          <Button color="inherit" component={Link} to="/voters">
            Data Pemilih
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
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
