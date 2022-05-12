import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box/Box";
import Tab from "@mui/material/Tab/Tab";
import Tabs from "@mui/material/Tabs/Tabs";
import Typography from "@mui/material/Typography/Typography";
import { getAuth } from "firebase/auth";
import { NoteObject } from "../common/types";
import { Firestore } from "firebase/firestore";
import { getNotes } from "../api/firestore";
import SpinnerDiv from "../common/SpinnerDiv";
import GeneralMessageScreen from "../common/GeneralMessageScreen";

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const Read: React.FC<Props> = ({ db, userUuid }) => {
  const [notes, setNotes] = useState<NoteObject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000)); //artistic license
      const notesFromApi = await getNotes(userUuid, db);
      setLoading(false);
      setNotes(notesFromApi);
    })();
  }, []);

  //Code for vertical tabs functionality
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
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
          </TabPanel>
        );
      })}
    </Box>
  );

  const userHasNoNotes = notes.length === 0;

  return (
    <div className="h-screen w-screen bg-slate-500">
      {loading && <SpinnerDiv />}
      {!loading && userHasNoNotes && (
        <GeneralMessageScreen
          text={'You have no notes. Go to the "Create" tab to make one.'}
        />
      )}
      {!loading && !userHasNoNotes && content}
    </div>
  );
};

export default Read;
