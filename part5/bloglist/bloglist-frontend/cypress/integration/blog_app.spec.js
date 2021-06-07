describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })

  it('Login form is shown', function () {
    cy.contains('log in to application').click()
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'mluukkai', password: 'salainen' })
      })

      it('A blog can be created', function () {
        cy.contains('new blog').click()
        cy.get('#title').type('testBlog')
        cy.get('#author').type('testAuthor')
        cy.get('#url').type('url.test')
        cy.get('#createBlog-button').click()

        cy.contains('testBlog - testAuthor')
      })

      it.only('A user can like a blog', function () {
        cy.contains('new blog').click()
        cy.get('#title').type('testBlog')
        cy.get('#author').type('testAuthor')
        cy.get('#url').type('url.test')
        cy.get('#createBlog-button').click()

        cy.contains('view').click()
        cy.get('#like-button').click()

        cy.get('.blogLikes').contains('likes: 1')
      })
    })

  })
})