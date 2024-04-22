import React, { useState, useEffect } from 'react';
import './App.css';
import { getUrls } from '../../apiCalls';
import UrlContainer from '../UrlContainer/UrlContainer';
import UrlForm from '../UrlForm/UrlForm';

function App () {
  const [urls, setUrls] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    setError('');
    getUrls()
      .then(data => setUrls([...data.urls]))
      .catch(err => setError(err.message))

  }, [])

  const addUrl = (newUrl) => {
    setUrls([...urls, newUrl])
  }

  return (
    <main className="App">
      <header>
        <h1>URL Shortener</h1>
        <UrlForm addUrl={addUrl} />
      </header>
      { error && <h2>{error}</h2>}
      { urls.length && !error ? <UrlContainer urls={urls}/> : <p>No urls yet! Find some to shorten!</p> }
    </main>
  );
}

export default App;
