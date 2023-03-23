import React, {useState} from 'react';
import { ChatResponse } from '../../model/Response';

export interface ResponseProps {
  response: Partial<ChatResponse> | undefined;
}

const ResponseComponent = (props: ResponseProps): JSX.Element => {

  return (
    <div>
        {props.response?.choices?.map((choice): JSX.Element => (
            <div>{choice.text}</div>
        ))}
    </div>
  );
}

export default ResponseComponent;