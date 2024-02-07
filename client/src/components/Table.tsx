import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Button } from "@mui/material";
import FormDialog from "./Dialog";
import { User } from "./Tabs";
import { format } from "date-fns";

interface Props {
  columns: string[];
  data: { [key: string]: string | number | [] }[];
  selectedUser: User;
  isFleetView: boolean;
}

function Row(props: {
  row: Props["data"][number];
  selectedUser: User;
  isFleetView: boolean;
}) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const [rowBids, setRowBids] = React.useState<
    { [key: string]: string | number }[]
  >([]);

  React.useEffect(() => {
    (async () => {
      if (open) {
        const res = await fetch(
          `http://localhost:3000/api/rides/${row._id}/bids`
        );

        res.json().then((value) => setRowBids(value));
      }
    })();
  }, [open, row]);

  const acceptBid = async (rideId: string, bidId: string) => {
    const res = await fetch(
      `http://localhost:3000/api/rides/${rideId}/bids/${bidId}/accept`,
      {
        method: "PATCH",
      }
    );

    res
      .json()
      .then((value) =>
        setRowBids((curr) =>
          curr.map((bid) => (bid._id === value._id ? value : bid))
        )
      );
  };

  const placeBid = async (rideId: string, amount: number) => {
    const res = await fetch(`http://localhost:3000/api/rides/${rideId}/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fleet: props.selectedUser._id,
        amount,
      }),
    });

    res.json().then((value) => setRowBids((curr) => [...curr, value]));
  };

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <Button
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            <Typography sx={{ fontSize: 14 }}>
              {open ? "Hide" : "View"} bids
            </Typography>
          </Button>
        </TableCell>
        {Object.values(row).map((value, index) => (
          <TableCell key={index} align={index === 0 ? "left" : "right"}>
            {`${value}`.endsWith("Z") ? format(value as string, "PPp") : value}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Bids
              </Typography>

              {(rowBids as { [key: string]: string | number }[]).length ? (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Fleet ID</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Status</TableCell>
                      {!props.isFleetView && <TableCell align="right" />}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {(rowBids as { [key: string]: string | number }[]).map(
                      (bidRow) => (
                        <TableRow key={bidRow._id}>
                          <TableCell component="th" scope="row">
                            {bidRow.updatedAt}
                          </TableCell>
                          <TableCell scope="row">{bidRow.fleet}</TableCell>
                          <TableCell scope="row" align="right">
                            {bidRow.amount}
                          </TableCell>
                          <TableCell scope="row" align="right">
                            {bidRow.status}
                          </TableCell>
                          {!props.isFleetView &&
                            bidRow.status !== "accepted" && (
                              <TableCell scope="row" align="right">
                                <Button
                                  onClick={() =>
                                    acceptBid(
                                      row._id as string,
                                      bidRow._id as string
                                    )
                                  }
                                >
                                  Accept
                                </Button>
                              </TableCell>
                            )}
                        </TableRow>
                      )
                    )}
                  </TableBody>
                </Table>
              ) : (
                <Typography sx={{ mb: 6 }}>No bids</Typography>
              )}
              {props.isFleetView && (
                <FormDialog
                  btnText="Place bid"
                  btnVariant="text"
                  title="Place new bid"
                  description="Enter an amount to place a new bid"
                  formType="bid"
                  onSubmit={(value) =>
                    placeBid(row._id as string, value.amount as number)
                  }
                />
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function BasicTable(props: Props) {
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            {props.columns.map((column, index) => (
              <TableCell key={index} align={index === 0 ? "left" : "right"}>
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <Row
              key={row._id as string}
              row={row}
              selectedUser={props.selectedUser}
              isFleetView={props.isFleetView}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
