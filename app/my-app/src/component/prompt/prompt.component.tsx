import React, {useState} from 'react';
import { ChatResponse } from '../../model/Response';
import axios from 'axios';

const URL = "http://localhost:4000"

export interface PromptProps {
  onSubmit: (response: ChatResponse) => void;
}

const PromptComponent = (props: PromptProps) => {
  const { onSubmit } = props;
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
    const response = await axios.post<ChatResponse>(URL, { fileName, prompt });
    onSubmit(response.data);
  }

  return (
    <div>
      <h1>Prompt your expression</h1>
      <form onSubmit={handleSubmit}>
        <input id="fileName" name="fileName" type="text" value={fileName} onChange={handleFileNameChange}/>
        <textarea id="promptExpression" name="promptExpression" rows={4} cols={50} value={prompt} onChange={handlePromptChange}>
        </textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PromptComponent;