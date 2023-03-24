import React, { useState } from "react";
import { ChatResponse } from "../../model/Response";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const URL = "http://localhost:4000";

export interface PromptProps {
  onSubmit: (response: ChatResponse) => void;
  onRequest: () => void;
  isLoading: boolean;
}

const PromptComponent = (props: PromptProps): JSX.Element => {
  const { onSubmit, onRequest, isLoading } = props;
  const [fileName, setFileName] = useState("");
  const [prompt, setPrompt] = useState("");

  const handleFileNameChange = (e: any) => {
    setFileName(e.target.value);
  };

  const handlePromptChange = (e: any) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchData();
  };

  const handleTest = (e: any) => {
    e.preventDefault();
    getTest();
  };

  const fetchData = async () => {
    onRequest();
    const response = await axios.post<ChatResponse>(URL, { fileName, prompt });
    onSubmit(response.data);
  };

  const getTest = async () => {
    await axios
      .post(URL + "/nightwatch", { fileName })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <TextField
        style={{ display: "grid", marginTop: "20px" }}
        id="fileName"
        name="fileName"
        label="File name"
        type="text"
        placeholder="Type your E2E test file name"
        value={fileName}
        onChange={handleFileNameChange}
        disabled={isLoading}
      />
      <TextField
        style={{ display: "grid", marginTop: "20px" }}
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
        style={{ marginTop: "12px" }}
        variant="outlined"
        type="submit"
        disabled={isLoading}
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <Button
        style={{ marginTop: "12px", marginLeft: "20px" }}
        variant="outlined"
        type="submit"
        disabled={!fileName}
        onClick={handleTest}
      >
        Test
      </Button>
    </div>
  );
};

export default PromptComponent;
