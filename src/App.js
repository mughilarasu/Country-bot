import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import SmartToy from "@mui/icons-material/SmartToy";
import ChatWindow from "./components/Chat/ChatWindow";
import ChatButton from "./components/Chat/ChatButton";
import ErrorBoundary from "./ErrorBoundary";
import { countriesData } from "./utils";
import "./styles.css";
import FlagImg from "../flag.png";

let bottomScrollTimer;

export default function App() {
  const [openChatWindow, setOpenChatWindow] = React.useState(false);
  const [expandChatWindow, setExpandChatWindow] = React.useState(false);
  const [
    storeCurrentSelectedCountry,
    setStoreCurrentSelectedCountry
  ] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [typeCountriesText, setTypeCountriesText] = React.useState("");
  const [allCountries, setAllCountries] = React.useState(countriesData);
  const [searchCountries, setSearchCountries] = React.useState("");
  const messagesEndRef = React.useRef(null);
  const scrollToBottom = () => {
    return messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    bottomScrollTimer = setTimeout(() => {
      scrollToBottom();
    }, 50);
    return () => {
      clearTimeout(bottomScrollTimer);
    };
  }, [messages]);

  const handleClickStoreCurrentSelectedCountry = (currentSelectedCountry) => {
    setStoreCurrentSelectedCountry((countryState) => {
      let newState = [];
      let countriesAlreadyPresent = countryState.filter(
        (s) =>
          s.name.toLowerCase() === currentSelectedCountry.name.toLowerCase()
      );
      if (countriesAlreadyPresent.length === 0) {
        newState = [...countryState, currentSelectedCountry];
      } else {
        newState = countryState.filter(
          (s) =>
            s.name.toLowerCase() !== currentSelectedCountry.name.toLowerCase()
        );
      }
      return newState;
    });
  };

  const pushChipMessage = (countriesArray) => {
    setMessages((state) => [...state, countriesArray]);
    setStoreCurrentSelectedCountry([]);
    setTypeCountriesText("");
  };

  const pushMessage = () => {
    let filterArr =
      storeCurrentSelectedCountry.length > 0
        ? storeCurrentSelectedCountry
        : allCountries;
    const selectedCountryNames = filterArr.map((country) =>
      country.name.toLowerCase().trim()
    );
    const newCountryNames = typeCountriesText
      .split(",")
      .map((name) => name.trim())
      .filter((name) => !selectedCountryNames.includes(name.toLowerCase()));
    const oldCountryNames = typeCountriesText
      .split(",")
      .map((name) => name.trim())
      .filter((name) => selectedCountryNames.includes(name.toLowerCase()));
    // const missingCountries = newCountryNames.map((name) => ({
    //   name,
    //   code: "NW",
    //   emoji: "nw",
    //   unicode: "U+1N1E6 U+1N1E8",
    //   image: FlagImg
    // }));

    let newArr = [...newCountryNames, ...oldCountryNames];
    let presentCountries = allCountries.filter((f) =>
      newArr.includes(f.name.toLowerCase())
    );
    const updatedSelectedCountries = presentCountries;
    setMessages((state) => [...state, updatedSelectedCountries]);
    setStoreCurrentSelectedCountry([]);
    setTypeCountriesText("");
  };

  React.useEffect(() => {
    let getCountriesName = storeCurrentSelectedCountry.map((country) =>
      country.name.toLowerCase().trim()
    );
    setTypeCountriesText((state) => {
      let oldState = [];
      if (state) {
        oldState = state
          .split(",")
          .map((v) => v.trim())
          .filter((f) => f !== "")
          .filter((f) => getCountriesName.includes(f.toLowerCase().trim()));
      }
      let newStateMerged = [...oldState, ...getCountriesName];
      let newState = [...new Set(newStateMerged)];
      return newState.join(",");
    });
  }, [storeCurrentSelectedCountry]);

  const handleClickExpandChatWindow = () => {
    setExpandChatWindow((state) => !state);
  };

  const handleClickOpenChatWindow = () => {
    setOpenChatWindow(true);
  };

  const handleCloseChatWindow = () => {
    setOpenChatWindow(false);
  };
  return (
    <Box>
      <ErrorBoundary>
        <Box sx={{ textAlign: "center", margin: 3 }}>
          <Typography variant="h4">COUNTRY BOT</Typography>
          <SmartToy sx={{ fontSize: 150, color: "red" }} />
        </Box>
        <ChatButton
          propsValues={{
            handleClickOpenChatWindow
          }}
        />
        <ChatWindow
          propsValues={{
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
          }}
        />
      </ErrorBoundary>
    </Box>
  );
}
