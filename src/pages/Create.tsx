import React, { useState } from "react";
import { TextField, Button, Snackbar } from "@mui/material";
import BackupIcon from "@mui/icons-material/Backup";
import { LoadingButton } from "@mui/lab";
import { doc, Firestore, setDoc, Timestamp } from "firebase/firestore";

interface Props {
  db: Firestore;
  userUuid: string;
}

const Create: React.FC<Props> = ({ db, userUuid }) => {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const disableSubmitButton = !title || !text;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); //artistic license

    if (userUuid) {
      const randomId = String(Math.random() * Date.now()).split(".")[0];
      try {
        await setDoc(doc(db, "notes", randomId), {
          title,
          text,
          userUuid,
          date: Timestamp.now(),
          noteId: randomId,
        });
        setLoading(false);
        setShowSnackbar(true);
        setTitle("");
        setText("");
      } catch (err) {
        console.log("error uploading note");
        setLoading(false);
      }
    } else {
      console.log("error getting user uuid");
    }
  };

  return (
    <div className="h-screen w-full bg-slate-400 overflow-y-auto">
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        open={showSnackbar}
        message="Succeessfully Uploaded Note!"
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: "green",
          },
        }}
      />
      <form onSubmit={handleSubmit}>
        <div className="bg-white mt-10 ml-10 w-2/3 shadow-lg">
          <TextField
            label="Title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            variant="filled"
            InputProps={{ style: { fontSize: 35 } }}
            fullWidth={true}
            disabled={loading}
          />
        </div>

        <div className="bg-white mt-10 ml-10 w-4/5 shadow-lg">
          <TextField
            label="Text Input"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
            }}
            multiline
            rows={7}
            variant="filled"
            InputProps={{ style: { fontSize: 35 } }}
            fullWidth={true}
            disabled={loading}
          />
        </div>
        <div className="ml-10 mt-10 w-fit shadow-lg">
          {loading && (
            <LoadingButton loading variant="contained">
              Upload to Database
            </LoadingButton>
          )}
          {!loading && (
            <Button
              variant="contained"
              endIcon={<BackupIcon />}
              size="large"
              color="primary"
              disabled={disableSubmitButton}
              type="submit"
            >
              Upload to Database
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default Create;
