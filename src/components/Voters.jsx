import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase.js";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const Voters = () => {
  const [voters, setVoters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "voters"));
      setVoters(querySnapshot.docs.map((doc) => doc.data()));
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Data Pemilih
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Token Pemilih</TableCell>
              <TableCell>Memilih Paslon</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {voters.map((voter, index) => (
              <TableRow key={index}>
                <TableCell>{voter.voterToken}</TableCell>
                <TableCell>{voter.selectedCandidate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Voters;
