import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState();

  useEffect(() => {
    getUrls()
      .then(data => setUrls(data))
      .catch(err => console.log(err))

  }, [])

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm />
      </header>

      { urls ? <UrlContainer urls={urls}/> : <p>No urls yet! Find some to shorten!</p> }
    </main>
  );
}

export default App;
