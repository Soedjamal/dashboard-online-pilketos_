import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase.js";
import {
  Box,
  LinearProgress,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "candidates"));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setCandidates(data);
      setTotalVotes(data.reduce((acc, curr) => acc + curr.votes, 0));
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Hasil Pemilihan
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Paslon</TableCell>
              <TableCell>Ketua</TableCell>
              <TableCell>Wakil</TableCell>
              <TableCell>Total Suara</TableCell>
              <TableCell>Persentase</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {candidates.map((candidate) => (
              <TableRow key={candidate.paslon}>
                <TableCell>{candidate.paslon}</TableCell>
                <TableCell>{candidate.ketua}</TableCell>
                <TableCell>{candidate.wakil}</TableCell>
                <TableCell>{candidate.votes}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "100%", mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={(candidate.votes / totalVotes) * 100}
                      />
                    </Box>
                    <Typography variant="body2">
                      {((candidate.votes / totalVotes) * 100).toFixed(1)}%
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Candidates;
