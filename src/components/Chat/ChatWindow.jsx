import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Slide from "@mui/material/Slide";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import SplitPane, { Pane } from "split-pane-react";
import "split-pane-react/esm/themes/default.css";
import ChatMessages from "./ChatMessages";
import Drawer from "@mui/material/Drawer";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ChatWindow({
  propsValues: {
    openChatWindow,
    expandChatWindow,
    handleClickExpandChatWindow,
    handleCloseChatWindow,
    storeCurrentSelectedCountry,
    handleClickStoreCurrentSelectedCountry,
    allCountries,
    searchCountries,
    setSearchCountries,
    typeCountriesText,
    setTypeCountriesText,
    pushMessage,
    messages,
    messagesEndRef,
    pushChipMessage
  }
}) {
  const [sizes, setSizes] = React.useState(["70%", "auto"]);
  const [
    bottomDrawerSearchCountries,
    setBottomDrawerSearchCountries
  ] = React.useState(false);
  const [openFlag, setOpenFlag] = React.useState([]);
  const theme = useTheme();
  const greaterThanMid = useMediaQuery(theme.breakpoints.up("md"));
  const smallToMid = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const lessThanSmall = useMediaQuery(theme.breakpoints.down("sm"));
  // if (greaterThanMid) {
  //   console.log("Greater than mid");
  // } else if (smallToMid) {
  //   console.log("Between small to mid");
  // } else if (lessThanSmall) {
  //   console.log("Less than small");
  // }
  // console.log("theme", theme);
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setBottomDrawerSearchCountries((state) => !state);
  };
  const handleClickOpenFlag = (e, value) => {
    e.preventDefault();
    setOpenFlag(value);
  };
  const handleCloseFlag = () => {
    setOpenFlag([]);
  };
  let getCountriesName = storeCurrentSelectedCountry.map((c) => c.name);
  let filteredCountries = allCountries.filter((country) =>
    country.name.toLowerCase().includes(searchCountries.toLowerCase())
  );
  let arrChip1 = allCountries.slice(0, 3);
  let arrChip2 = allCountries.slice(4, 6);
  let arrChip3 = allCountries.slice(7, 10);
  let arrChip = [arrChip1, arrChip2, arrChip3];
  const handleTextChange = (e) => {
    setTypeCountriesText(e.target.value);
  };
  return (
    <div>
      <Dialog
        fullScreen={expandChatWindow}
        maxWidth={"sm"}
        fullWidth={true}
        open={openChatWindow}
        // onClose={handleCloseChatWindow}
        TransitionComponent={Transition}
        hideBackdrop={true}
        scroll={"paper"}
        sx={
          !expandChatWindow
            ? {
                "& .MuiDialog-container": {
                  justifyContent: "flex-end"
                },
                "& .MuiDialog-paper": {
                  margin: "32px 10px",
                  maxHeight: "calc(90% - 64px)"
                }
              }
            : {}
        }
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{ padding: 0, background: "#f3f3f3" }}
        >
          <Toolbar>
            <Typography sx={{ ml: 0, flex: 1 }} variant="h6" component="div">
              Country Flags
            </Typography>

            {expandChatWindow ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleClickExpandChatWindow}
                >
                  Collapse
                </Button>
                <IconButton
                  edge="start"
                  color="primary"
                  onClick={handleCloseChatWindow}
                  aria-label="close"
                  sx={{ ml: 2 }}
                >
                  <CancelOutlinedIcon />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  onClick={handleClickExpandChatWindow}
                >
                  Expand
                </Button>
                <IconButton
                  edge="start"
                  color="primary"
                  onClick={handleCloseChatWindow}
                  aria-label="close"
                  sx={{ ml: 2 }}
                >
                  <CancelOutlinedIcon />
                </IconButton>
              </>
            )}
          </Toolbar>
        </DialogTitle>
        {expandChatWindow && (
          <DialogContent>
            {smallToMid || lessThanSmall ? (
              <Box
                sx={{
                  padding: "12px"
                  //  height: "80vh"
                }}
              >
                <Box sx={{ textAlign: "center" }}>
                  <Button
                    onClick={toggleDrawer}
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Search Countries
                  </Button>
                </Box>
                <List
                  sx={{
                    //   width: "70vw",
                    border: "1px solid #cecece",
                    height: "80vh",
                    padding: 0
                  }}
                >
                  <ChatMessages
                    propsValues={{
                      messages,
                      expandChatWindow,
                      messagesEndRef,
                      openFlag,
                      handleClickOpenFlag,
                      handleCloseFlag
                    }}
                  />
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { width: "100%" },
                      background: "#efe2ff",
                      //borderRadius: "10px",
                      // margin: "25px 0px 0px 0px",

                      padding: "10px 10px 10px 10px"
                      //  position: "absolute",
                      //  width: { xs: "95%", sm: "98%" },
                      // bottom: 0
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-country">
                        Type here
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-country"
                        type="text"
                        value={typeCountriesText}
                        onChange={(e) => {
                          handleTextChange(e);
                        }}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="send country visibility"
                              onClick={pushMessage}
                              edge="end"
                              disabled={!typeCountriesText}
                            >
                              <SendOutlinedIcon />
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Type here"
                      />
                    </FormControl>
                  </Box>
                </List>
                <Drawer
                  anchor={"bottom"}
                  open={bottomDrawerSearchCountries}
                  onClose={toggleDrawer}
                  sx={{ zIndex: 1500 }}
                >
                  <Button onClick={toggleDrawer} sx={{ margin: 1 }}>
                    Close
                  </Button>
                  <List
                    sx={{
                      // width: "30vw",
                      // height: "80vh",
                      borderLeft:
                        messages.length > 1
                          ? "0px solid #cecece"
                          : "5px solid #cecece",
                      borderRight: "1px solid #cecece",
                      borderTop: "1px solid #cecece",
                      borderBottom: "1px solid #cecece",
                      padding: 0
                    }}
                  >
                    {" "}
                    <ListSubheader
                      sx={{
                        background: "#efe2ff",
                        padding: "10px"
                      }}
                    >
                      {" "}
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { width: "100%" }
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-basic"
                          label="Search Countries"
                          variant="outlined"
                          value={searchCountries}
                          onChange={(e) => setSearchCountries(e.target.value)}
                        />
                      </Box>
                    </ListSubheader>
                    <Box
                      sx={{
                        height: "70vh",
                        overflowY: "auto",
                        padding: "12px"
                      }}
                    >
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country, i) => {
                          return (
                            <Box key={i}>
                              <ListItem
                                button
                                sx={{
                                  color: getCountriesName.includes(country.name)
                                    ? "#2f62b5"
                                    : "inherit"
                                }}
                                onClick={() =>
                                  handleClickStoreCurrentSelectedCountry(
                                    country
                                  )
                                }
                              >
                                <ListItemText
                                  primary={
                                    <span
                                      style={{
                                        fontSize: "14px"
                                      }}
                                    >
                                      {country.name}
                                    </span>
                                  }
                                />
                              </ListItem>
                              <Divider />
                            </Box>
                          );
                        })
                      ) : (
                        <ListItem>
                          <ListItemText
                            primary={
                              <span
                                style={{
                                  fontSize: "14px"
                                }}
                              >
                                No Country Found
                              </span>
                            }
                          />
                        </ListItem>
                      )}
                    </Box>
                  </List>
                </Drawer>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  padding: "12px"
                  //  height: "80vh"
                }}
              >
                <SplitPane
                  split="vertical"
                  sizes={sizes}
                  onChange={setSizes}
                  style={{
                    display: "flex"
                  }}
                >
                  <Pane
                    minSize={"50%"}
                    maxSize="70%"
                    style={{
                      whiteSpace: "normal",

                      height: "auto",
                      position: "inherit",
                      overflow: "unset"
                    }}
                  >
                    <List
                      sx={{
                        //   width: "70vw",
                        borderLeft: "1px solid #cecece",
                        borderTop: "1px solid #cecece",
                        borderBottom: "1px solid #cecece",
                        height: "80vh",
                        padding: 0
                      }}
                    >
                      <ChatMessages
                        propsValues={{
                          messages,
                          expandChatWindow,
                          messagesEndRef,
                          openFlag,
                          handleClickOpenFlag,
                          handleCloseFlag
                        }}
                      />
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { width: "100%" },
                          background: "#efe2ff",
                          //borderRadius: "10px",
                          // margin: "25px 0px 0px 0px",

                          padding: "10px 10px 10px 10px"
                          // position: "absolute",
                          // width: "98%",
                          // bottom: 0
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <FormControl variant="outlined">
                          <InputLabel htmlFor="outlined-adornment-country">
                            Type here
                          </InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-country"
                            type="text"
                            value={typeCountriesText}
                            onChange={(e) => {
                              handleTextChange(e);
                            }}
                            endAdornment={
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="send country visibility"
                                  onClick={pushMessage}
                                  edge="end"
                                  disabled={!typeCountriesText}
                                >
                                  <SendOutlinedIcon />
                                </IconButton>
                              </InputAdornment>
                            }
                            label="Type here"
                          />
                        </FormControl>
                      </Box>
                    </List>
                  </Pane>
                  <List
                    sx={{
                      // width: "30vw",
                      height: "80vh",
                      borderLeft:
                        messages.length > 1
                          ? "0px solid #cecece"
                          : "5px solid #cecece",
                      borderRight: "1px solid #cecece",
                      borderTop: "1px solid #cecece",
                      borderBottom: "1px solid #cecece",
                      padding: 0,
                      display: { xs: "none", sm: "none", md: "block" }
                    }}
                  >
                    {" "}
                    <ListSubheader
                      sx={{
                        background: "#efe2ff",
                        padding: "10px"
                      }}
                    >
                      {" "}
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { width: "100%" }
                        }}
                        noValidate
                        autoComplete="off"
                      >
                        <TextField
                          id="outlined-basic"
                          label="Search Countries"
                          variant="outlined"
                          value={searchCountries}
                          onChange={(e) => setSearchCountries(e.target.value)}
                        />
                      </Box>
                    </ListSubheader>
                    <Box
                      sx={{
                        height: "70vh",
                        overflowY: "auto",
                        padding: "12px"
                      }}
                    >
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country, i) => {
                          return (
                            <Box key={i}>
                              <ListItem
                                button
                                sx={{
                                  color: getCountriesName.includes(country.name)
                                    ? "#2f62b5"
                                    : "inherit"
                                }}
                                onClick={() =>
                                  handleClickStoreCurrentSelectedCountry(
                                    country
                                  )
                                }
                              >
                                <ListItemText
                                  primary={
                                    <span
                                      style={{
                                        fontSize: "14px"
                                      }}
                                    >
                                      {country.name}
                                    </span>
                                  }
                                />
                              </ListItem>
                              <Divider />
                            </Box>
                          );
                        })
                      ) : (
                        <ListItem>
                          <ListItemText
                            primary={
                              <span
                                style={{
                                  fontSize: "14px"
                                }}
                              >
                                No Country Found
                              </span>
                            }
                          />
                        </ListItem>
                      )}
                    </Box>
                  </List>
                </SplitPane>
              </Box>
            )}
          </DialogContent>
        )}
        {!expandChatWindow && (
          <>
            <DialogContent sx={{ padding: !expandChatWindow && 1 }}>
              <List
                sx={{
                  // border: "1px solid #cecece",
                  padding: 0
                }}
              >
                <ChatMessages
                  propsValues={{
                    messages,
                    expandChatWindow,
                    messagesEndRef,
                    openFlag,
                    handleClickOpenFlag,
                    handleCloseFlag
                  }}
                />
              </List>
            </DialogContent>
            <DialogActions sx={{ display: "block" }}>
              {" "}
              <Box>
                {" "}
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { width: "100%" },
                    background: "#efe2ff",
                    padding: "10px 10px 10px 10px"
                  }}
                  noValidate
                  autoComplete="off"
                >
                  {arrChip.length !== 0 && (
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        margin: "8px 8px 12px 8px",
                        "&:hover": {
                          overflow: "auto"
                        }
                      }}
                    >
                      {arrChip.map((m, i) => {
                        return (
                          <Chip
                            key={i}
                            label={m.map((m) => m.name).join(", ")}
                            onClick={() => pushChipMessage(m)}
                            sx={{
                              fontWeight: "bold",
                              fontSize: 13,
                              height: 25
                            }}
                          />
                        );
                      })}
                    </Stack>
                  )}
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-country">
                      Type here
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-country"
                      type="text"
                      value={typeCountriesText}
                      onChange={(e) => {
                        handleTextChange(e);
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="send country visibility"
                            onClick={pushMessage}
                            edge="end"
                            disabled={!typeCountriesText}
                          >
                            <SendOutlinedIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Type here"
                    />
                  </FormControl>
                </Box>
              </Box>
            </DialogActions>
          </>
        )}
      </Dialog>
    </div>
  );
}
