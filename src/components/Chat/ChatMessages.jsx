import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import ChatFlagDialog from "./ChatFlagDialog";

export default function ChatMessages({
  propsValues: {
    messages,
    expandChatWindow,
    messagesEndRef,
    openFlag,
    handleClickOpenFlag,
    handleCloseFlag
  }
}) {
  return (
    <>
      <Box
        sx={
          expandChatWindow
            ? { height: "70vh", overflowY: "auto" }
            : { height: messages.length === 0 ? "50vh" : "auto" }
        }
      >
        {messages.length > 0 ? (
          messages.map((message, i) => {
            return (
              <Box key={i} ref={messagesEndRef}>
                <List sx={{ bgcolor: "background.paper" }}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar sx={{ background: "blue" }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      sx={{
                        margin: "10px",
                        background: "#dddddd",
                        padding: "4px",
                        borderRadius: "10px"
                      }}
                      primary={
                        message.length === 0
                          ? "Invalid Input"
                          : message.map((m) => m.name).join(", ")
                      }
                    />
                  </ListItem>
                  <div style={{ margin: "0px 5rem" }}>
                    <span style={{ fontSize: 14 }}>a few seconds ago</span>
                  </div>
                </List>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar sx={{ background: "red" }}>
                      <SmartToyIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Paper
                        sx={{
                          flexGrow: 1,
                          width: expandChatWindow
                            ? { xs: "auto", sm: "auto", md: "40vw" }
                            : "auto",
                          padding: 1,
                          border: "1px solid rgba(0, 0, 0, 0.12)",
                          cursor: "pointer",
                          "&:hover": {
                            background: "rgba(0, 0, 0, 0.12)"
                          }
                        }}
                        onClick={(e) => handleClickOpenFlag(e, message)}
                      >
                        <Grid container spacing={1}>
                          {message.length === 0 ? (
                            <Box>
                              <span style={{ fontSize: 14, margin: 8 }}>
                                Invalid Country
                              </span>
                            </Box>
                          ) : (
                            message.map((items) => {
                              let splitGrid =
                                message.length > 1 &&
                                (message.length - 1) % 3 === 0 &&
                                items.name === message[message.length - 1].name;
                              return (
                                <Grid
                                  item
                                  xs={splitGrid ? 12 : 12}
                                  md={splitGrid ? 12 : 4}
                                  sm={splitGrid ? 12 : 6}
                                  key={items.image}
                                >
                                  <div
                                    style={{
                                      textAlign: "center",
                                      border: "1px solid rgba(0, 0, 0, 0.32)"
                                    }}
                                  >
                                    <img
                                      style={{ maxWidth: "150px" }}
                                      src={items.image}
                                      alt={items.name}
                                    />
                                    <Divider
                                      sx={{
                                        borderColor: "rgba(0, 0, 0, 0.32)"
                                      }}
                                    />
                                    <Typography
                                      gutterBottom
                                      variant="body2"
                                      sx={{ margin: "2px 0px" }}
                                    >
                                      {items.name.toUpperCase()}
                                    </Typography>
                                  </div>
                                </Grid>
                              );
                            })
                          )}
                        </Grid>
                      </Paper>
                    }
                  />
                </ListItem>
                <div style={{ margin: "0px 5rem" }}>
                  <span style={{ fontSize: 14 }}>a few seconds ago</span>
                </div>
              </Box>
            );
          })
        ) : (
          <List sx={{ bgcolor: "background.paper" }}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                sx={{
                  margin: "10px",
                  // background: "#dddddd",
                  padding: "4px"
                  //borderRadius: "10px"
                }}
                primary={"No Messages Found"}
              />
            </ListItem>
          </List>
        )}
      </Box>

      <ChatFlagDialog
        propsValues={{
          openFlag,
          handleCloseFlag,
          RComponent: (
            <>
              <Box>
                <Paper
                  sx={{
                    flexGrow: 1,
                    padding: 1,
                    border: "1px solid rgba(0, 0, 0, 0.12)"
                  }}
                >
                  <Grid container spacing={1}>
                    {openFlag.map((items, i) => {
                      let splitGrid =
                        openFlag.length > 1 &&
                        (openFlag.length - 1) % 3 === 0 &&
                        items.name === openFlag[openFlag.length - 1].name;
                      return (
                        <Grid
                          item
                          xs={splitGrid ? 12 : 12}
                          md={splitGrid ? 12 : 4}
                          sm={splitGrid ? 12 : 6}
                          key={items.image}
                        >
                          <div
                            style={{
                              textAlign: "center",
                              border: "1px solid rgba(0, 0, 0, 0.32)"
                            }}
                          >
                            <img
                              style={{ maxWidth: "150px" }}
                              src={items.image}
                              alt={items.name}
                            />
                            <Divider
                              sx={{
                                borderColor: "rgba(0, 0, 0, 0.32)"
                              }}
                            />
                            <Typography
                              gutterBottom
                              variant="body2"
                              sx={{ margin: "2px 0px" }}
                            >
                              {items.name.toUpperCase()}
                            </Typography>
                          </div>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Paper>
              </Box>
            </>
          )
        }}
      />
    </>
  );
}
