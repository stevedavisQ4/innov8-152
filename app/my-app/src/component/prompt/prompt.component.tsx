import React, {useState} from 'react';
import { ChatResponse } from '../../model/Response';
import axios from 'axios';

const URL = "http://localhost:4000"

export interface PromptProps {
  onSubmit: (response: ChatResponse) => void;
}

const PromptComponent = (props: PromptProps) => {
  const { onSubmit } = props;
  const [input, setInput] = useState('');

  const handleChange = (e: any) => {
    setInput(e.target.value);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    fetchData()
  }

  const fetchData = async () => {
    const response = await axios.get<ChatResponse>(`${URL}?prompt=${input}`);
    onSubmit(response.data);
  }

  return (
    <div>
      <h1>Prompt your expression</h1>
      <form onSubmit={handleSubmit}>
        <textarea id="w3review" name="w3review" rows={4} cols={50} value={input} onChange={handleChange}>
        </textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PromptComponent;