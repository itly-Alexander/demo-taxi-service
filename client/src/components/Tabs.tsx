import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BasicTable from "./Table";
import BasicAvatarList from "./AvatarList";
import { Button } from "@mui/material";
import FormDialog from "./Dialog";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 10 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export interface User {
  _id?: string;
  name: string;
  email: string;
  phone: string;
}

type GenericObject = { [key: string]: string | number | [] };

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [selectedClient, setSelectedClient] = React.useState<User | null>(null);
  const [selectedFleet, setSelectedFleet] = React.useState<User | null>(null);
  const [clientRidesData, setClientRidesData] = React.useState<GenericObject[]>(
    []
  );
  const [clientsData, setClientsData] = React.useState<User[]>([]);
  const [fleetData, setFleetData] = React.useState<User[]>([]);
  const [fleetRidesData, setFleetRidesData] = React.useState<GenericObject[]>(
    []
  );

  const createUser = async (
    data: { [key: string]: string },
    type: "fleet" | "client"
  ) => {
    const res = await fetch(
      `http://localhost:3000/api/${type === "client" ? "clients" : "fleets"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (type === "client") {
      res.json().then((value) => setClientsData((curr) => [...curr, value]));
    } else {
      res.json().then((value) => setFleetData((curr) => [...curr, value]));
    }
  };

  const createRideRequest = async (data: {
    [key: string]: string | number;
  }) => {
    const res = await fetch(`http://localhost:3000/api/rides`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...data, client: selectedClient?._id }),
    });

    res.json().then((value) => setClientRidesData((curr) => [...curr, value]));
  };

  const fetchFleets = async () => {
    const res = await fetch(`http://localhost:3000/api/fleets`);

    res.json().then((value) => setFleetData(value));
  };

  const fetchClients = async () => {
    const res = await fetch(`http://localhost:3000/api/clients`);

    res.json().then((value) => setClientsData(value));
  };

  const fetchClientRides = async (clientId: string) => {
    const res = await fetch(
      `http://localhost:3000/api/clients/${clientId}/rides`
    );

    res.json().then((value) => setClientRidesData(value));
  };

  const fetchFleetRides = async () => {
    const res = await fetch(`http://localhost:3000/api/rides`);

    res.json().then((value) => setFleetRidesData(value));
  };

  // Fetch fleets and clients
  React.useEffect(() => {
    (async () => {
      if (!clientsData?.length) {
        await fetchClients();
      }

      if (!fleetData?.length) {
        await fetchFleets();
      }
    })();
  }, []);

  // Fetch client's rides
  React.useEffect(() => {
    (async () => {
      if (selectedClient?._id) {
        await fetchClientRides(selectedClient._id);
      }
    })();
  }, [selectedClient]);

  // Fetch fleet's rides
  React.useEffect(() => {
    (async () => {
      await fetchFleetRides();
    })();
  }, [selectedFleet]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{ pl: 5 }}
        >
          <Tab label="Client View" {...a11yProps(0)} />
          <Tab label="Fleet View" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box
          sx={{
            display: "grid",
            justifyContent: "center",
          }}
        >
          {selectedClient ? (
            <React.Fragment>
              <Typography sx={{ mb: 2 }} variant="h6">
                My Ride requests
              </Typography>
              {clientRidesData?.length ? (
                <BasicTable
                  columns={[
                    "Request ID",
                    "Pick up location",
                    "Pick up time",
                    "Drop-off location",
                    "Proposed price",
                  ]}
                  data={clientRidesData.map((data) => ({
                    _id: data._id,
                    pickupLocation: data.pickupLocation,
                    pickupTime: data.pickupTime,
                    dropoffLocation: data.dropoffLocation,
                    proposedPrice: data.proposedPrice,
                  }))}
                  selectedUser={selectedClient}
                  isFleetView={false}
                />
              ) : (
                <Typography>
                  You haven't created any ride requests yet...
                </Typography>
              )}
              <Box sx={{ mt: 4 }}>
                <FormDialog
                  btnText="Create a new ride request"
                  description="Fill out the form to create a new ride request"
                  formType="ride"
                  title="New ride request"
                  btnVariant="text"
                  onSubmit={(value) =>
                    createRideRequest(
                      value as { [key: string]: string | number }
                    )
                  }
                />
              </Box>
              <Box sx={{ mt: 6 }}>
                <Typography>Logged in as: {selectedClient.name}</Typography>
                <Button
                  onClick={() => {
                    setSelectedClient(null);
                    setClientRidesData([]);
                  }}
                >
                  Log out
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {clientsData.length ? (
                <React.Fragment>
                  <Typography>Log in as: </Typography>
                  <BasicAvatarList
                    items={clientsData.map((client) => ({
                      action: (client: User) => setSelectedClient(client),
                      icon: "",
                      user: client,
                    }))}
                  />
                  <Typography>or</Typography>
                </React.Fragment>
              ) : (
                <Typography sx={{ mb: 4 }}>No clients yet</Typography>
              )}
              <FormDialog
                btnText="Create a new client user"
                description="Fill out the form to create your very own client"
                formType="user"
                onSubmit={(value) =>
                  createUser(value as { [key: string]: string }, "client")
                }
                title="Create client user"
                btnVariant="text"
              />
            </React.Fragment>
          )}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Box
          sx={{
            display: "grid",
            justifyContent: "center",
          }}
        >
          {selectedFleet ? (
            <React.Fragment>
              <Typography sx={{ mb: 2 }} variant="h6">
                All Ride requests
              </Typography>
              {fleetRidesData?.length ? (
                <BasicTable
                  columns={[
                    "Request ID",
                    "Client ID",
                    "Pick up location",
                    "Pick up time",
                    "Drop-off location",
                    "Proposed price",
                  ]}
                  data={fleetRidesData.map((data) => ({
                    _id: data._id,
                    client: data.client,
                    pickupLocation: data.pickupLocation,
                    pickupTime: data.pickupTime,
                    dropoffLocation: data.dropoffLocation,
                    proposedPrice: data.proposedPrice,
                  }))}
                  selectedUser={selectedFleet}
                  isFleetView
                />
              ) : (
                <Typography>
                  No ride requests have been posted yet...
                </Typography>
              )}
              <Box sx={{ mt: 6 }}>
                <Typography>Logged in as: {selectedFleet.name}</Typography>
                <Button
                  onClick={() => {
                    setSelectedFleet(null);
                    setFleetRidesData([]);
                  }}
                >
                  Log out
                </Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {fleetData.length ? (
                <React.Fragment>
                  <Typography>Log in as: </Typography>
                  <BasicAvatarList
                    items={fleetData.map((fleet) => ({
                      action: (fleet: User) => setSelectedFleet(fleet),
                      icon: "",
                      user: fleet,
                    }))}
                  />
                  <Typography>or</Typography>
                </React.Fragment>
              ) : (
                <Typography sx={{ mb: 4 }}>No fleets yet</Typography>
              )}
              <FormDialog
                btnText="Create a new fleet user"
                description="Fill out the form to create your very own fleet"
                formType="user"
                onSubmit={(value) =>
                  createUser(value as { [key: string]: string }, "fleet")
                }
                title="Create fleet user"
                btnVariant="text"
              />
            </React.Fragment>
          )}
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
