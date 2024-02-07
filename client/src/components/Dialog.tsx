import * as React from "react";
import Button, { ButtonOwnProps } from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

type FormType = "bid" | "user" | "ride";

interface Props {
  btnText: string;
  btnVariant?: ButtonOwnProps["variant"];
  title: string;
  description: string;
  formType: FormType;
  onSubmit: (value: { [key: string]: string | number | [] }) => void;
}

export default function FormDialog(props: Props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant={props.btnVariant || "outlined"}
        onClick={handleClickOpen}
      >
        {props.btnText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            props.onSubmit(formJson);
            handleClose();
          },
        }}
      >
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{props.description}</DialogContentText>
          {props.formType === "bid" && (
            <TextField
              autoFocus
              required
              margin="dense"
              id="amount"
              name="amount"
              label="Amount (SEK)"
              type="number"
              fullWidth
              variant="standard"
            />
          )}

          {props.formType === "user" && (
            <React.Fragment>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="name"
                label="First and lastname"
                type="text"
                fullWidth
                variant="standard"
              />
              <TextField
                required
                margin="dense"
                id="email"
                name="email"
                label="Email adress"
                type="email"
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                required
                margin="dense"
                id="phone"
                name="phone"
                label="Phone no."
                type="tel"
                fullWidth
                variant="standard"
              />
            </React.Fragment>
          )}

          {props.formType === "ride" && (
            <React.Fragment>
              <TextField
                autoFocus
                required
                margin="dense"
                id="pickupLocation"
                name="pickupLocation"
                label="Pickup Location"
                type="text"
                fullWidth
                variant="standard"
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DateTimePicker
                    name="pickupTime"
                    label="Desired time of pickup"
                  />
                </DemoContainer>
              </LocalizationProvider>

              <TextField
                autoFocus
                required
                margin="dense"
                id="dropoffLocation"
                name="dropoffLocation"
                label="Dropoff Location"
                type="text"
                fullWidth
                variant="standard"
              />

              <TextField
                autoFocus
                required
                margin="dense"
                id="proposedPrice"
                name="proposedPrice"
                label="Proposed price (SEK)"
                type="number"
                fullWidth
                variant="standard"
              />
            </React.Fragment>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
