import React, { useCallback, useState } from 'react';
import './App.css';
import PromptComponent from './component/prompt/prompt.component';
import ResponseComponent from './component/response/response.component';
import { ChatResponse } from './model/Response';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

function App() {

  const [response, setResponse] = useState<Partial<ChatResponse>>();

  const handleSubmitResponse = useCallback((response: ChatResponse) => {
    setResponse(response);
  }, [setResponse]);

  return (
    <Container>
      <Box sx={{ width: '100%' }}>
        <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
          Prompt your E2E test case
        </Typography>
        <Grid container spacing={6}>
          <Grid item xs={6}>
            <PromptComponent onSubmit={handleSubmitResponse}/>
          </Grid>
          <Grid item xs={6}>
            <ResponseComponent response={response}/>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default App;
