import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ButtonGroup, TextField } from '@mui/material';
import UserInput from './UserInput';
import OutputBox from './OutputBox';
import SearchedResults from './SearchedResults';
import Shark from './static/shark.png';
import SignInButtons from './SignInButtons';
import SchemaBox from './schemaBox';

// mock data for searched:
// to test first update username in the state to any mock string as well
const mockDataForSearch = [
  {
    code: `<!DOCTYPE html>
    <html>
    <head>
        <title>
            How to insert spaces/tabs in text using HTML/CSS?
        </title>
    </head>
    <body>
        <h1 style="color: green">GeeksforGeeks</h1>
        <b>How to insert spaces/tabs in text using HTML/CSS?</b>

        <p>This is a &nbsp; regular space.</p>
        <p>This is a &ensp; two spaces gap.</p>
        <p>This is a &emsp; four spaces gap.</p>
    </body>
    </html>`,
    translation: 'This is a function with console.log',
  },
  {
    code: 'useEffect(() => {setInputTextLength(inputText.toString().length)',
    translation: 'this is another function',
  },
];

function BoxContainer() {
  // updates current text in user input box
  const [inputText, setInputText] = useState('');
  // updates length of current input text
  const [inputTextLength, setInputTextLength] = useState(0);
  // displays text returned from server
  const [outputText, setOutputText] = useState('');
  // keeps track of the current username in the session
  const [username, setUsername] = useState('Robbie');
  // sets history menu to open or close
  const [open, setHistoryOpen] = useState(false);
  // fixes mui text field bug when label doesn't shrink after text is copied into input
  const [shrinkComponent, setShrinkComponent] = useState({});
  // keeps track of search history
  const [searched, setSearched] = useState(mockDataForSearch);
  // text displayed in input box
  const [inputLabel, setInputLabel] = useState('Paste your code');
  // keeps track of currently selected query method
  const [queryMode, setQueryMode] = useState('code-to-en');
  // text displayed in output box
  const [outputLabel, setOutputLabel] = useState('Plain English');
  // changes text in copy button
  const [expButtonText, setExpButtonText] = useState('COPY EXPLANATION');
  // changes text of input box placeholder
  const [inputBoxPlaceholder, setInputBoxPlaceholder] = useState('');
  // keeps track of user inputted schema
  const [userSchema, setUserSchema] = useState('');

  useEffect(() => {
    setInputTextLength(inputText.toString().length);
  });

  // functionality to get previously researched queries from the database
  useEffect(() => {
    if (username.length !== 0) {
      console.log('useEffect hook: ', username);
      const requestURI = `${process.env.BACKEND_USER_URI}/getRequests`;
      const getRequests = async () => {
        const response = await axios.post(requestURI, {
          username,
        });
        console.log(response.data);
        setSearched(response.data);
      };
      getRequests();
    }
  }, [username]);

  // function to invoke when user clicks one previously searched query
  // we expect to see full code and translation in the input / output boxes

  // function utilizes hooks to shrink the label component within the user input text field
  // label within text field does not shrink when text is inputted programattically
  // rather than manually typed
  // use this method anywhere you are programatically copying and pasting into the user input field
  function handleElementClick(obj) {
    setShrinkComponent({ shrink: 'true' });
    document.querySelector('#filled-multiline-static').value = obj.code;
    // REMINDER: DOUBLECHECK THIS. To test you can click on an element in the history dropdown
    setOutputText(obj.translation);
  }

  // adds whatever is in user input text field into state
  // attached to event listener in component
  const handleTyping = (event) => {
    setInputText(event.target.value);
  };

  // copies the output box to user's clipboard
  const CopyToClipBoardNormal = (event) => {
    if (!outputText) return;

    // functionality formats copied text with line break is created first space after 40 characters
    const lineLength = 40;
    let copyOutput = outputText[0];
    let readyToCopy = false;
    for (let i = 1; i < outputText.length; i++) {
      if (i % lineLength === 0) readyToCopy = true;
      if (readyToCopy && outputText[i] === ' ') {
        copyOutput += '\n';
        readyToCopy = false;
        continue;
      }
      copyOutput += outputText[i];
    }
    // utilizes clipboard API to copy text to user's clipboard
    navigator.clipboard.writeText(copyOutput);
  };

  // adds sudocode styling so user's can easily copy directly into code
  const CopyToClipBoardSudo = (event) => {
    if (!outputText) return;

    // REMINDER:  condense this into one function that can also be used with copyclipboard normal
    const lineLength = 40;
    let copyOutput = outputText[0];
    let readyToCopy = false;
    for (let i = 1; i < outputText.length; i++) {
      if (i % lineLength === 0) readyToCopy = true;
      if (readyToCopy && outputText[i] === ' ') {
        copyOutput += '\n';
        readyToCopy = false;
        continue;
      }
      copyOutput += outputText[i];
    }
    const textToCopy = `/*\n ${copyOutput} \n */`;
    navigator.clipboard.writeText(textToCopy);
  };

  // sends contents of user input text field to backend
  const handleSubmit = async (event) => {
    // console.log(JSON.stringify(inputText));
    event.preventDefault();
    let requestURI;
    if (queryMode === 'code-to-en') requestURI = `${process.env.BACKEND_API_URI}/entocode`;
    if (queryMode === 'en-to-code') requestURI = `${process.env.BACKEND_API_URI}/codetoen`;
    if (queryMode === 'en-to-sql') requestURI = `${process.env.BACKEND_API_URI}/entosql`;

    // request body to be sent to backend
    const json = {
      query: inputText,
    };

    if (userSchema) {
      json.schema = userSchema;
    }

    // sending username if user is logged in
    if (username.length > 0) {
      json.username = username;
    }

    // axios request to backend
    const response = await axios.post(requestURI, json, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
    // sets output text element in state to equal what is returned from backend
    setOutputText(response.data);
  };

  // handles opening of dropdown menu
  const handleHistoryOpen = () => {
    setHistoryOpen(!open);
  };

  // handling query mode changes -> setting mode
  const handleCodeToEnClick = () => {
    setQueryMode('code-to-en');
  };
  const handleEnToCodeClick = () => {
    setQueryMode('en-to-code');
  };
  const handleEnToSQLClick = () => {
    setQueryMode('en-to-sql');
  };
  // handling updating of variables depending on query mode
  let schemaBox;
  useEffect(() => {
    if (queryMode === 'code-to-en') {
      setInputLabel('Paste your code');
      setOutputLabel('Plain English');
      setExpButtonText('COPY EXPLANATION');
      schemaBox = [];
    }
    if (queryMode === 'en-to-code') {
      setInputLabel('Type your plain english to be translated');
      setOutputLabel('Generated Code');
      setExpButtonText('COPY CODE');
      schemaBox = [];
    }
    if (queryMode === 'en-to-sql') {
      setInputLabel('Type what you want your query to search for');
      setOutputLabel('Generated SQL Query');
      setExpButtonText('COPY SQL QUERY');
    }
  }, [queryMode]);

  // handles updating of user schema on submission of schema box
  const handleSchemaSubmit = (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const tableName = data.get('table-name');
    const columnNames = data.get('column-names');
    const schemaObj = {};
    schemaObj[tableName] = columnNames;

    setUserSchema(schemaObj);
  };

  // renders schema information when current mode is en-to-sql and schema is present in state

  return (
    <>
      <div id='headerButtons'>
        <SignInButtons setUsername={setUsername} stateUsername={username} />
        <div id='header'>
          <h1>Boa Constructor</h1>
        </div>
        {username && (
          <div className='dropdown'>
            <Button onClick={handleHistoryOpen}>Your History</Button>
            {open ? (
              <SearchedResults
                handleElementClick={handleElementClick}
                searched={searched}
              />
            ) : null}
          </div>
        )}
      </div>
      <div id='button-group-container'>
        <ButtonGroup variant='outlined' aria-label='outlined button group'>
          <Button
            onClick={handleCodeToEnClick}
            variant={(queryMode === 'code-to-en') ? 'contained' : 'outlined'}
          >
            Code to English
          </Button>
          <Button
            onClick={handleEnToCodeClick}
            variant={(queryMode === 'en-to-code') ? 'contained' : 'outlined'}
          >
            English to Code
          </Button>
          <Button
            onClick={handleEnToSQLClick}
            variant={(queryMode === 'en-to-sql') ? 'contained' : 'outlined'}
          >
            English to SQL
          </Button>
        </ButtonGroup>
      </div>
      <main id='BoxContainer' style={{ display: 'flex' }}>
        <SchemaBox userSchema={userSchema} queryMode={queryMode} />
        <UserInput
          inputLabel={inputLabel}
          shrinkComponent={shrinkComponent}
          inputText={inputText}
          handleTyping={handleTyping}
          handleSubmit={handleSubmit}
          queryMode={queryMode}
          inputTextLength={inputTextLength}
          handleSchemaSubmit={handleSchemaSubmit}
        />
        <div id='imgWrapper'>
          <img id='shark' src={Shark} />
        </div>
        <OutputBox
          outputLabel={outputLabel}
          outputText={outputText}
          queryMode={queryMode}
          expButtonText={expButtonText}
          copyNormal={CopyToClipBoardNormal}
          copySudo={CopyToClipBoardSudo}
        />
      </main>
    </>
  );
}

export default BoxContainer;
