import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box/Box";
import Tab from "@mui/material/Tab/Tab";
import Tabs from "@mui/material/Tabs/Tabs";
import Typography from "@mui/material/Typography/Typography";
import { NoteObject } from "../common/types";
import { Firestore } from "firebase/firestore";
import { deleteNote, getNotes } from "../api/firestore";
import SpinnerDiv from "../common/SpinnerDiv";
import GeneralMessageScreen from "../common/GeneralMessageScreen";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import Button from "@mui/material/Button/Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Snackbar from "@mui/material/Snackbar/Snackbar";
import Dialog from "@mui/material/Dialog/Dialog";
import DialogTitle from "@mui/material/DialogTitle/DialogTitle";
import DialogContent from "@mui/material/DialogContent/DialogContent";
import DialogContentText from "@mui/material/DialogContentText/DialogContentText";
import DialogActions from "@mui/material/DialogActions/DialogActions";

interface Props {
  db: Firestore;
  userUuid: string;
}

//Code for vertical tabs functionality
//Source: MUI documentation
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Delete: React.FC<Props> = ({ db, userUuid }) => {
  const [notes, setNotes] = useState<NoteObject[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);
  const selectedNoteId = useRef<string>("");

  const notesApiCall = () => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); //artistic license
      const notesFromApi = await getNotes(userUuid, db);
      setPageLoading(false);
      setLoading(false);
      setNotes(notesFromApi);
    })();
  };

  useEffect(() => {
    notesApiCall();
  }, []);

  const showDialog = (e: React.MouseEvent) => {
    setShowWarningDialog(true);
  };

  const rejectDialog = (e: React.MouseEvent) => {
    setShowWarningDialog(false);
  };

  const acceptDialog = async (e: React.MouseEvent) => {
    setShowWarningDialog(false);
    // delete note here
    setLoading(true);
    await deleteNote(selectedNoteId.current, db);
    notesApiCall();
  };

  //More code for vertical tabs functionality
  //Source: MUI documentation
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    selectedNoteId.current = notes[newValue].noteId;
    setValue(newValue);
  };

  const content = (
    <Box
      className="bg-slate-300 flex h-screen"
      sx={{
        flexGrow: 1,
      }}
    >
      <Tabs
        className="bg-slate-400 border-r max-w-[200px] min-w-[200px]"
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        sx={{ borderColor: "divider" }}
      >
        {notes.map((each) => {
          return <Tab label={each.title} key={Date.now() * Math.random()} />;
        })}
      </Tabs>
      {notes.map((each, index) => {
        return (
          <TabPanel value={value} index={index} key={index}>
            <Typography style={{ fontSize: "25px" }} component={"span"}>
              {each.text}
            </Typography>
            <div className="mt-5 w-fit shadow-lg">
              {loading && (
                <LoadingButton
                  loading
                  variant="contained"
                  endIcon={<DeleteForeverIcon />}
                  size="large"
                  type="submit"
                  fullWidth={true}
                >
                  Update Note
                </LoadingButton>
              )}
              {!loading && (
                <Button
                  variant="contained"
                  endIcon={<DeleteForeverIcon />}
                  size="large"
                  color="error"
                  type="submit"
                  fullWidth={true}
                  onClick={showDialog}
                >
                  Delete Note
                </Button>
              )}
            </div>
          </TabPanel>
        );
      })}
    </Box>
  );

  const userHasNoNotes = notes.length === 0;

  return (
    <div className="h-screen w-screen bg-slate-500">
      <Dialog
        open={showWarningDialog}
        onClose={() => setShowWarningDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this note?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={rejectDialog}>Cancel</Button>
          <Button onClick={acceptDialog} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        open={showSnackbar}
        message="Deleted Note"
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "red",
          },
        }}
      />
      {pageLoading && <SpinnerDiv />}
      {!pageLoading && userHasNoNotes && (
        <GeneralMessageScreen
          text={'You have no notes. Go to the "Create" tab to make one.'}
        />
      )}
      {!pageLoading && !userHasNoNotes && content}
    </div>
  );
};

export default Delete;
