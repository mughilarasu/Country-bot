import * as React from "react";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import { CommonStylesFunction } from "../../styles.js";

export default function ChatButton({
  propsValues: { handleClickOpenChatWindow }
}) {
  const commonStyles = CommonStylesFunction();

  return (
    <Box sx={[commonStyles.chatButtonBottom]}>
      <Fab
        variant="extended"
        size="medium"
        color="primary"
        aria-label="ask me"
        onClick={handleClickOpenChatWindow}
      >
        <ChatBubbleOutlineIcon sx={[commonStyles.chatIconBottom]} />
        Ask Me
      </Fab>
    </Box>
  );
}
