import React, { useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
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
          <h2>Together better</h2>
        </div>
        <div className="content">
          <div className="email">
            <MailOutlineIcon/>
            <TextField id="email" label="Enter email" variant="outlined"/>
          </div>
          <div class="password">
            <LockOpenIcon />
            <TextField id="password" label="Enter password" variant="outlined" />
          </div>
          
        </div>
        <div className="footer">
          <Button variant="contained" color="primary" onClick={submit}>Login</Button>
        </div>
      </form>
    </div>
  );
};
export default Auth;
