import React, { useEffect, useState } from 'react';

//dropdown for history elements
function SearchedResults(props) {
  //searched is an array of objects returned from the DB, each object contains past search query info
  const { searched, handleElementClick } = props;
  return (
    //renders history objects in state to components with two primary html subcomponents:
    //the javascript code sent by user and the english translation send back by API
    <div className='searchedContainer'>
      {searched.map((obj) => (
        <div
          onClick={() => handleElementClick(obj)}
          className='element'
          key={obj.translation}
        >
          <p>
            <span>Code: </span>
            {obj.code.slice(0, 100)}
            ...
          </p>
          <p>
            <span>Plain English: </span>
            {obj.code.slice(0, 100)}
            ...
          </p>
        </div>
      ))}
    </div>
  );
}

export default SearchedResults;
