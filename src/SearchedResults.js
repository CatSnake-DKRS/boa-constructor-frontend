import React from 'react';

//dropdown for history elements
function SearchedResults(props) {
  //searched is an array of objects returned from the DB, each object contains past search query
  const { searched, handleElementClick } = props;

  return (
    //renders history objects in state to components with two primary html subcomponents:
    //the javascript code sent by user and the english translation send back by API
    <div className='searchedContainer'>
      {searched.map((obj) => (
        <div onClick={() => handleElementClick(obj)} className='element'>
          <p>
            <span>
              <strong>QUERY:</strong>
            </span>
            {obj.query.slice(0, 100)}
            ...
          </p>
          <p>
            <span>
              <strong>TRANSLATION:</strong>
            </span>
            {obj.translation.slice(0, 100)}
            ...
          </p>
        </div>
      ))}
    </div>
  );
}

export default SearchedResults;
