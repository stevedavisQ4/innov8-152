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

  const [loading, setLoading] = useState(isLoading);

  const handleFileNameChange = (e: any) => {
    setFileName(e.target.value);
  };

  const handlePromptChange = (e: any) => {
    setPrompt(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    fetchData();
  };

  const handleTest = (e: any) => {
    e.preventDefault();
    getTest();
  };

  const fetchData = async () => {
    onRequest();
    const response = await axios
      .post<ChatResponse>(URL, { fileName, prompt })
      .finally(() => {
        setLoading(false);
      });
    onSubmit(response.data);
  };

  const getTest = async () => {
    setLoading(true);
    await axios
      .post(URL + "/nightwatch", { fileName })
      .then((response) => {
        spawnDocument(response.data, {});
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // @ts-ignore
  function spawnDocument(content, options) {
    let opt = {
      window: "",
      closeChild: true,
      childId: "_blank",
    };
    Object.assign(opt, options);
    // minimal error checking
    if (
      content &&
      typeof content.toString == "function" &&
      content.toString().length
    ) {
      let child = window.open("", opt.childId, opt.window) as Window;
      child.document.write(content.toString());
      if (opt.closeChild) child.document.close();
      return child;
    }
  }

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
        disabled={loading}
      />
      <TextField
        style={{ display: "grid", marginTop: "20px" }}
        id="promptExpression"
        name="promptExpression"
        label="Expression"
        placeholder="Type you test case expression"
        minRows={8}
        multiline
        value={prompt}
        onChange={handlePromptChange}
        disabled={loading}
      />
      <Button
        style={{ marginTop: "12px" }}
        variant="outlined"
        type="submit"
        disabled={loading}
        onClick={handleSubmit}
      >
        Submit
      </Button>

      <Button
        style={{ marginTop: "12px", marginLeft: "20px" }}
        variant="outlined"
        type="submit"
        disabled={!fileName || loading}
        onClick={handleTest}
      >
        Test
      </Button>
    </div>
  );
};

export default PromptComponent;
