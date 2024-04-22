export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => {
        if(!response.ok) {
          throw new Error('Could not retrieve data')
        }
        return response.json()
      })
}

export const postUrls = (data) => {
  return fetch('http://localhost:3001/api/v1/urls', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" }
  })
      .then(response => {
        if(!response.ok) {
          throw new Error('Could not add data')
        }
        return response.json()
      })
}

