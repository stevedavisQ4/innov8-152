import React from 'react';
import { ChatResponse } from '../../model/Response';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export interface ResponseProps {
  response: Partial<ChatResponse> | undefined;
}

const ResponseComponent = (props: ResponseProps): JSX.Element => {
  const { response } = props;
  return (
    <Box sx={{ width: '100%', minHeight: 220, p: 2, border: '1px solid rgba(0, 0, 0, 0.3)', borderRadius: '4px', marginTop: '20px' }}>
      <Typography variant="body1" gutterBottom>
        <SyntaxHighlighter language="javascript" style={docco}>
          {response?.text as string}
        </SyntaxHighlighter>
      </Typography>
    </Box>
  );
}

export default ResponseComponent;