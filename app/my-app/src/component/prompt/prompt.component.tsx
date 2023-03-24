import React, {useState} from 'react';
import { ChatResponse } from '../../model/Response';
import axios from 'axios';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const URL = "http://localhost:4000"

export interface PromptProps {
  onSubmit: (response: ChatResponse) => void;
  onRequest: () => void;
  isLoading: boolean;
}

const PromptComponent = (props: PromptProps) => {
  const { onSubmit, onRequest, isLoading } = props;
  const [fileName, setFileName] = useState('');
  const [prompt, setPrompt] = useState('');

  
  const handleFileNameChange = (e: any) => {
    setFileName(e.target.value);
  }

  const handlePromptChange = (e: any) => {
    setPrompt(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchData()
  }

  const fetchData = async () => {
    onRequest();
    const response = await axios.post<ChatResponse>(URL, { fileName, prompt });
    onSubmit(response.data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          style={{ display: "grid", marginTop: '20px' }}
          id="fileName"
          name="fileName"
          label="File name"
          type="text"
          placeholder='Type your E2E test file name'
          value={fileName}
          onChange={handleFileNameChange}
          disabled={isLoading}
        />
        <TextField
          style={{ display: "grid", marginTop: '20px' }}
          id="promptExpression"
          name="promptExpression"
          label="Expression"
          placeholder="Type you test case expression"
          minRows={4}
          multiline
          value={prompt}
          onChange={handlePromptChange}
          disabled={isLoading}
        />
        <Button
          style={{ marginTop: '12px' }}
          variant="outlined"
          type="submit"
          disabled={isLoading}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}

export default PromptComponent;