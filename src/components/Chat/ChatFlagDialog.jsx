import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InfoOutlined from "@mui/icons-material/InfoOutlined";

export default function ChatFlagDialog({
  propsValues: { openFlag, handleCloseFlag, RComponent }
}) {
  return (
    <div>
      <Dialog
        open={openFlag.length !== 0}
        // onClose={handleCloseFlag}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{ fontSize: 16, fontWeight: "bold" }}
        >
          <InfoOutlined color="primary" sx={{ m: -0.5 }} />{" "}
          {openFlag.map((flag) => flag.name).join(", ")}
        </DialogTitle>
        <DialogContent>{RComponent}</DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleCloseFlag}
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
