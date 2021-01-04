import React, { useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import "../styles/auth.css";
const Auth = (props) => {
  useEffect(() => {
    return () => {};
  }, []);
  const submit = () => {
    props.history.push("/post-management");
  };
  return (
    <div className="auth-page">
      <form noValidate autoComplete="off">
        <div className="header">
          <h2>Together better admin app</h2>
        </div>
        <div className="content">
          <TextField id="email" label="email" />
          <TextField id="password" label="password" />
        </div>
        <div className="footer">
          <Button onClick={submit}>Login</Button>
        </div>
      </form>
    </div>
  );
};
export default Auth;
