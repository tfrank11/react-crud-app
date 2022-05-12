import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

interface Props {
  switchToSignup: (e: React.MouseEvent) => void;
}

const Login: React.FC<Props> = ({ switchToSignup }) => {
  const auth = getAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const disableSubmitButton = !email || !password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000)); //artistic license
    signInWithEmailAndPassword(auth, email, password)
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
        <h1 className="text-2xl font-semibold">Login to your Account</h1>
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

        {loading ? (
          <LoadingButton loading variant="contained">
            login
          </LoadingButton>
        ) : (
          <Button
            variant="contained"
            type="submit"
            disabled={disableSubmitButton}
          >
            Login
          </Button>
        )}
      </form>
      <div>
        <span className="text-xs text-red-500 font-semibold mt-3 block h-[16px]">
          {error}
        </span>
      </div>
      <div className="mt-3 text-xs">
        <span className="text-gray-500">Dont have an account? </span>{" "}
        <span
          className="text-blue-700 font-semibold hover:cursor-pointer hover:underline"
          onClick={switchToSignup}
        >
          Sign Up.
        </span>
      </div>
    </div>
  );
};

export default Login;
