import React from "react";
import Alert from "@mui/material/Alert";

const Message = ({ type, message }) => {
  return (
    <div>
      <Alert severity={type}>{message}</Alert>
    </div>
  );
};

export default Message;
