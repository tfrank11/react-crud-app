import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

interface Props {
  switchToLogin: (e: React.MouseEvent) => void;
}

const Signup: React.FC<Props> = ({ switchToLogin }) => {
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const disableSubmitButton =
    !email || !password || !confirmPassword || password !== confirmPassword;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); //artistic license
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        setLoading(false);
      });
  };

  return (
    <div className="absolute m-auto top-0 bottom-0 left-0 right-0 text-center h-fit">
      <div className="">
        <h1 className="text-2xl font-semibold">Create a New Account</h1>
        <span className="text-gray-400 text-xs">
          Note: Account info is only stored on Google servers
        </span>
        <a
          className="text-gray-400 italic underline hover:text-blue-300 hover:cursor-pointer text-xs ml-1"
          href="https://firebaseopensource.com/projects/firebase/scrypt/"
          target="_blank"
        >
          (Learn more)
        </a>
      </div>

      <form className="mt-10 inline-grid gap-3" onSubmit={handleSubmit}>
        <TextField
          label="Email"
          variant="outlined"
          size="small"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <TextField
          label="Password"
          variant="outlined"
          size="small"
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <TextField
          label="Confirm Password"
          variant="outlined"
          size="small"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          error={password !== confirmPassword}
          helperText={password !== confirmPassword && "Passwords do not match"}
        />

        {loading ? (
          <LoadingButton loading variant="contained">
            Sign Up
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            type="submit"
            disabled={disableSubmitButton}
          >
            Sign Up
          </Button>
        )}
      </form>
      <div>
        <span className="text-xs text-red-500 font-semibold mt-3 block h-[16px]">
          {error}
        </span>
      </div>

      <div className="mt-3 text-xs">
        <span className="text-gray-500">Already have an account? </span>{" "}
        <span
          className="text-blue-700 font-semibold hover:cursor-pointer hover:underline"
          onClick={switchToLogin}
        >
          Login.
        </span>
      </div>
    </div>
  );
};

export default Signup;
