import React, { useState } from 'react';
import { postUrls } from '../../apiCalls';

function UrlForm({ addUrl }) {
  const [title, setTitle] = useState('');
  const [urlToShorten, setUrlToShorten] = useState('');
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    setFormError('');

    if(title.trim().length < 3 || !urlToShorten.includes('http')) {
      setFormError(`Title must be at least 3 characters, and URL needs to contain 'http'.`)
    } else {
      postUrls({ long_url: urlToShorten, title: title })
        .then(data => addUrl(data))
        .catch(err => setError(err.message))
    }
    clearInputs();
  }

  const clearInputs = () => {
    setTitle('');
    setUrlToShorten('');
  }

  return (
    <>
      <form>
        <input
          type='text'
          placeholder='Title...'
          name='title'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          type='text'
          placeholder='URL to Shorten...'
          name='urlToShorten'
          value={urlToShorten}
          onChange={e => setUrlToShorten(e.target.value)}
        />

        <button onClick={e => handleSubmit(e)}>
          Shorten Please!
        </button>
      </form>
      { error && <h2>{error}</h2> }
      { formError && <h2>{formError}</h2> }
    </>
  )
}

export default UrlForm;
