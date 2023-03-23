import React, {useState} from 'react';
import { ChatResponse } from '../../model/Response';

export interface ResponseProps {
  response: Partial<ChatResponse> | undefined;
}

const ResponseComponent = (props: ResponseProps): JSX.Element => {
  const { response } = props;
  return (
    <div>
      <div>{response?.text}</div>
    </div>
  );
}

export default ResponseComponent;