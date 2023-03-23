import React, { useCallback, useState } from 'react';
import './App.css';
import PromptComponent from './component/prompt/prompt.component';
import ResponseComponent from './component/response/response.component';
import { ChatResponse } from './model/Response';

function App() {

  const [response, setResponse] = useState<Partial<ChatResponse>>();

  const handleSubmitResponse = useCallback((response: ChatResponse) => {
    setResponse(response);
  }, [setResponse]);
  return (
    <div>
      <PromptComponent onSubmit={handleSubmitResponse}/>
      <ResponseComponent response={response}/>
    </div>
  );
}

export default App;
