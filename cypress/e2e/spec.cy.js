describe('dashboard tests', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 200,
      fixture: 'get-data'
    })
    .intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 201,
      fixture: 'post-data'
    })
    .visit('http://localhost:3000/')
  })

  it('should load the homepage', () => {
    cy.get('h1').contains('URL Shortener')
    cy.get('form').children().should('have.length', 3)
    cy.get('form').children().first().should('have.attr', 'placeholder', 'Title...')
    cy.get('form').children().eq(1).should('have.attr', 'placeholder', 'URL to Shorten...')
    cy.get('.all-urls').children().first().children().should('have.length', 3)
    cy.get('.all-urls').children().first().children().contains('Awesome photo 1')
    cy.get('.all-urls').children().first().children().contains('http://localhost:3001/useshorturl/1')
    cy.get('.all-urls').children().first().children().contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })

  it('should update value for input fields', () => {
    cy.get('form').children().first().type('Really Cool Stuff').should('have.attr', 'value', 'Really Cool Stuff')
    cy.get('form').children().eq(1).type('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80').should('have.attr', 'value', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })

  it('post new url and add it to the dom', () => {
    cy.get('form').children().first().type('Really Cool Stuff').should('have.attr', 'value', 'Really Cool Stuff')
    cy.get('form').children().eq(1).type('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80').should('have.attr', 'value', 'https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
    cy.get('button').click()
    cy.get('.all-urls').children().should('have.length', 2)
    cy.get('.all-urls').children().last().children().contains('Really Cool Stuff')
    cy.get('.all-urls').children().last().children().contains('http://localhost:3001/useshorturl/2')
    cy.get('.all-urls').children().last().children().contains('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
  })

  it('should show error if api GET call fails', () => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/urls', {
      statusCode: 500
    })
    cy.get('h2').contains('Could not retrieve data')
  })

  it('should show error if api POST call fails', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/urls', {
      statusCode: 500
    })
    cy.get('form').children().first().type('Really Cool Stuff')
    cy.get('form').children().eq(1).type('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
    cy.get('button').click()
    cy.get('h2').contains('Could not add data')
  })

  it('should show error if form is not filled out correctly', () => {
    cy.get('form').children().first().type('hello')
    cy.get('button').click()
    cy.get('h2').contains(`Title must be at least 3 characters, and URL needs to contain 'http'.`)
    cy.reload()
    cy.get('form').children().eq(1).type('https://images.unsplash.com/photo-1531898418865-480b7090470f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')
    cy.get('button').click()
    cy.get('h2').contains(`Title must be at least 3 characters, and URL needs to contain 'http'.`)
    cy.reload()
    cy.get('button').click()
    cy.get('h2').contains(`Title must be at least 3 characters, and URL needs to contain 'http'.`)
  })
})