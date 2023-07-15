import React from "react";
import Typography from "@mui/material/Typography";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    // console.log("error");
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    // You can also log error messages to an error reporting service here
  }
  render() {
    // console.log("error", this.state.error);
    // console.log("errorInfo", this.state.errorInfo);
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <Typography variant="h4" color="error">
            Something went wrong.
          </Typography>
          <details style={{ whiteSpace: "pre-wrap", padding: 8 }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    // Normally, just render children
    return this.props.children;
  }
}
export default ErrorBoundary;
