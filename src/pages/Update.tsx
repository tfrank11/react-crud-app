import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box/Box";
import Tab from "@mui/material/Tab/Tab";
import Tabs from "@mui/material/Tabs/Tabs";
import Typography from "@mui/material/Typography/Typography";
import { NoteObject } from "../common/types";
import { Firestore } from "firebase/firestore";
import { getNotes, updateNote } from "../api/firestore";
import SpinnerDiv from "../common/SpinnerDiv";
import GeneralMessageScreen from "../common/GeneralMessageScreen";
import TextField from "@mui/material/TextField/TextField";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import Button from "@mui/material/Button/Button";
import UpdateIcon from "@mui/icons-material/Update";
import Snackbar from "@mui/material/Snackbar/Snackbar";

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
      className="w-full"
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

const Update: React.FC<Props> = ({ db, userUuid }) => {
  const [notes, setNotes] = useState<NoteObject[]>([]);
  const [pageLoading, setPageLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const notesApiCall = () => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); //artistic license
      const notesFromApi = await getNotes(userUuid, db);
      setPageLoading(false);
      setNotes(notesFromApi);
    })();
  };

  useEffect(() => {
    notesApiCall();
  }, []);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    noteId: string
  ) => {
    e.preventDefault();
    setLoading(true);
    const target = e.target as typeof e.target & {
      textInput: { value: string };
    };
    const newNoteText = target.textInput.value;
    await updateNote(newNoteText, noteId, db);
    setShowSnackbar(true);
    notesApiCall();
    setLoading(false);
  };

  //More code for vertical tabs functionality
  //Source: MUI documentation
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const content = (
    <Box
      className="bg-slate-300 flex h-screen w-100"
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
            <form
              className="w-full"
              onSubmit={(e) => {
                handleSubmit(e, each.noteId);
              }}
            >
              <TextField
                InputProps={{ style: { fontSize: "25px" } }}
                InputLabelProps={{ style: { fontSize: "20px" } }}
                label="Edit Note"
                multiline
                fullWidth={true}
                defaultValue={each.text}
                name="textInput"
                disabled={loading}
              />
              <div className="mt-5 w-fit shadow-lg">
                {loading && (
                  <LoadingButton
                    loading
                    variant="outlined"
                    fullWidth={true}
                    endIcon={<UpdateIcon />}
                    size="large"
                  >
                    Update Note
                  </LoadingButton>
                )}
                {!loading && (
                  <Button
                    variant="outlined"
                    endIcon={<UpdateIcon />}
                    size="large"
                    color="primary"
                    type="submit"
                    fullWidth={true}
                  >
                    Update Note
                  </Button>
                )}
              </div>
            </form>
          </TabPanel>
        );
      })}
    </Box>
  );

  const userHasNoNotes = notes.length === 0;

  return (
    <div className="h-screen w-screen bg-slate-500">
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        open={showSnackbar}
        message="Succeessfully Updated Note!"
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "green",
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

export default Update;
