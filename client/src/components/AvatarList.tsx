import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { User } from "./Tabs";

interface ListItem {
  icon: string;
  user: User;
  action: (user: User) => void;
}

interface Props {
  items: ListItem[];
}

export default function BasicAvatarList(props: Props) {
  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {props.items.map((item, index) => {
        const labelId = `checkbox-list-secondary-label-${item.user.name}`;
        return (
          <ListItem
            key={index}
            disablePadding
            onClick={() => item.action(item.user)}
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={item.user.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
}
