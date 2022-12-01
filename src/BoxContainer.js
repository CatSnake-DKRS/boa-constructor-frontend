import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, ButtonGroup, TextField } from '@mui/material';
import UserInput from './UserInput';
import OutputBox from './OutputBox';
import SearchedResults from './SearchedResults';
import Snake from './static/snake.png';
import SignInButtons from './SignInButtons';
import SchemaBox from './SchemaBox';

function BoxContainer() {
  // updates current text in user input box
  const [inputText, setInputText] = useState('');

  // updates length of current input text
  const [inputTextLength, setInputTextLength] = useState(0);

  // displays text returned from server
  const [outputText, setOutputText] = useState('');

  // keeps track of the current username in the session
  const [username, setUsername] = useState('');
  // sets history menu to open or close
  const [open, setHistoryOpen] = useState(false);

  // fixes mui text field bug when label doesn't shrink after text is copied into input
  const [shrinkComponent, setShrinkComponent] = useState({});

  // keeps track of search history
  const [searched, setSearched] = useState([]);
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

  // keeps track of string schema that was entered and will be displayed
  const [stringSchema, setStringSchema] = useState('');

  // use effect hook checks if we have a username set in sessionStorage
  useEffect(() => {
    const activeUsername = sessionStorage.getItem('username');
    if (activeUsername) {
      setUsername(activeUsername);
    }
  }, [username]);

  // use effect hook to display the length of the input text (cannot be over 250 characters)
  useEffect(() => {
    setInputTextLength(inputText.toString().length);
  }, [inputTextLength]);

  // functionality to get previously researched queries from the database
  useEffect(() => {
    if (username.length !== 0) {
      const requestURI = `${process.env.BACKEND_USER_URI}/getRequests`;

      // get request to backend for previous search history
      const getRequests = async () => {
        const response = await axios.post(requestURI, {
          username,
        });
        // if there are previous searches in the databases, set search in state to the
        // array of previous searches that are returned from the backend
        if (response.data.length > 0) setSearched(response.data.reverse());
      };
      getRequests();
    }
  }, [username]);

  // handling updating of variables depending on query mode
  let schemaBox;
  useEffect(() => {
    if (queryMode === 'code-to-en') {
      setInputLabel('Paste your code');
      setOutputLabel('Plain English');
      setExpButtonText('COPY EXPLANATION');
      setInputBoxPlaceholder('Code');
      schemaBox = [];
    }
    if (queryMode === 'en-to-code') {
      setInputLabel('Type your plain english to be translated');
      setOutputLabel('Generated Code');
      setExpButtonText('COPY CODE');
      setInputBoxPlaceholder('Plain English Explanation');

      schemaBox = [];
    }
    if (queryMode === 'en-to-sql') {
      setInputLabel('Type what you want your query to search for');
      setOutputLabel('Generated SQL Query');
      setExpButtonText('COPY SQL QUERY');
      setInputBoxPlaceholder('Plain English Explanation');
    }
  }, [queryMode]);

  // function to invoke when user clicks on previously searched query
  function handleElementClick(historyel) {
    // label within inputtext  does not shrink when text is inputted programattically
    // rather than manually typed (this is a MUI bug)
    // use setShrinkComponent anywhere you are programatically copying and pasting into the user input field
    setShrinkComponent({ shrink: 'true' });

    // set value (i.e. html text) of the inputBox to equal the query field of the history element
    document.querySelector('#filled-multiline-static').value = historyel.query;

    // set input text + output text + schema in state to be equal to the history element
    setOutputText(historyel.translation);
    setUserSchema(historyel.schema);
    const copySchema = { ...userSchema };
    let string = '';
    for (const [key, value] of Object.entries(copySchema)) {
      string += key;
      string += `(${value})` + '/n';
    }
    setStringSchema(string);
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
    if (queryMode === 'code-to-en') {
      requestURI = `${process.env.BACKEND_API_URI}/codetoen`;
    }
    if (queryMode === 'en-to-code') {
      requestURI = `${process.env.BACKEND_API_URI}/entocode`;
    }
    if (queryMode === 'en-to-sql') {
      requestURI = `${process.env.BACKEND_API_URI}/entosql`;
    }

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
    try {
      const response = await axios.post(requestURI, json, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
      setOutputText(response.data.translation);
      return;
    } catch (error) {
      console.log(error);
    }
    // sets output text element in state to equal what is returned from backend
  };

  // handles opening of dropdown menu
  const handleHistoryOpen = () => {
    setHistoryOpen(!open);
  };

  // function for handling changing the mode of the query -> setting mode
  const handleQueryModeClick = (queryModeString) => {
    setQueryMode(queryModeString);
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
            onClick={() => handleQueryModeClick('code-to-en')}
            variant={queryMode === 'code-to-en' ? 'contained' : 'outlined'}
          >
            Code to English
          </Button>
          <Button
            onClick={() => handleQueryModeClick('en-to-code')}
            variant={queryMode === 'en-to-code' ? 'contained' : 'outlined'}
          >
            English to Code
          </Button>
          <Button
            onClick={() => handleQueryModeClick('en-to-sql')}
            variant={queryMode === 'en-to-sql' ? 'contained' : 'outlined'}
          >
            English to SQL
          </Button>
        </ButtonGroup>
      </div>
      <main id='BoxContainer' style={{ display: 'flex' }}>
        <SchemaBox
          userSchema={userSchema}
          queryMode={queryMode}
          stringSchema={stringSchema}
        />
        <UserInput
          inputBoxPlaceholder={inputBoxPlaceholder}
          inputLabel={inputLabel}
          shrinkComponent={shrinkComponent}
          inputText={inputText}
          handleTyping={handleTyping}
          handleSubmit={handleSubmit}
          queryMode={queryMode}
          inputTextLength={inputTextLength}
          setUserSchema={setUserSchema}
          stringSchema={stringSchema}
          setStringSchema={setStringSchema}
        />
        <div id='imgWrapper'>
          <img id='snake' src={Snake} />
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
