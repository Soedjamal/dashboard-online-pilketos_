import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase.js";
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  CircularProgress,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";

const VoterCards = () => {
  const [value, setValue] = useState(0);
  const [students, setStudents] = useState([]);
  const [teacher, setTeacher] = useState([]);
  const [loading, setLoading] = useState(true);

  // Optimasi fetch data dengan Promise.all
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentsSnapshot, teachersSnapshot] = await Promise.all([
          getDocs(collection(db, "students")),
          getDocs(collection(db, "teacher")),
        ]);

        setStudents(
          studentsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );
        setTeacher(
          teachersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `Kartu Pemilih - ${value === 0 ? "Siswa" : "Guru"}`;
    window.print();
    document.title = originalTitle;
  };

  const currentData = value === 0 ? students : teacher;

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, "@media print": { p: 0 } }}>
      {/* Header hanya untuk tampilan web */}
      <Box sx={{ "@media print": { display: "none" } }}>
        <Tabs value={value} onChange={(e, newValue) => setValue(newValue)}>
          <Tab label={`Siswa (${students.length})`} />
          <Tab label={`Guru (${teacher.length})`} />
        </Tabs>

        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{ mb: 2 }}
        >
          Cetak
        </Button>
      </Box>

      {/* Container untuk cetak */}
      <Box
        sx={{
          columnCount: { xs: 2, print: 3 },
          columnGap: { print: "0.5cm" },
          "@media print": {
            width: "100%",
            margin: 0,
            padding: "0.5cm",
            pageBreakAfter: "always",
          },
        }}
      >
        {currentData.map((user) => (
          <Box
            key={user.token}
            sx={{
              breakInside: "avoid",
              mb: 2,
              p: 1,
              border: "1px solid #ddd",
              borderRadius: "4px",
              height: "100px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              "@media print": {
                height: "3.2cm",
                mb: "0.2cm",
                p: 0.5,
                border: "1px solid #000",
              },
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontSize: "0.8rem",
                "@media print": {
                  fontSize: "10pt",
                  fontWeight: "bold",
                  textAlign: "center"
                },
              }}
            >
              {user.name}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mt: 0.5,
                fontSize: "1.4rem",
                "@media print": {
                  fontSize: "16pt",
                  letterSpacing: "2px",
                },
              }}
            >
              {user.token}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Halaman kosong untuk menghindari margin bawah saat cetak */}
      <Box
        sx={{
          display: "none",
          "@media print": {
            display: "block",
            height: "0",
            pageBreakAfter: "always",
          },
        }}
      />
    </Box>
  );
};

export default VoterCards;
