import React, { useCallback, useState } from "react";
import "./App.css";
import PromptComponent from "./component/prompt/prompt.component";
import ResponseComponent from "./component/response/response.component";
import { ChatResponse } from "./model/Response";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import LoadingSpinner from "./component/loader/loader.component";

function App() {
  const [response, setResponse] = useState<Partial<ChatResponse>>();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmitResponse = useCallback(
    (response: ChatResponse) => {
      setResponse(response);
      setIsLoading(false);
    },
    [setResponse]
  );

  const handleRequestStarting = useCallback(
    () => setIsLoading(true),
    [setIsLoading]
  );

  return (
    <Container maxWidth="xl">
      {isLoading && <LoadingSpinner />}
      <Box sx={{ maxWidth: "100%" }} className={"Root-Container"}>
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          Prompt your E2E test case
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <PromptComponent
              onRequest={handleRequestStarting}
              onSubmit={handleSubmitResponse}
              isLoading={isLoading}
            />
          </Grid>
          <Grid item xs={6}>
            {!!response && <ResponseComponent response={response} />}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
