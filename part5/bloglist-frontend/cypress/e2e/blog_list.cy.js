describe('blog list app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Elleonora',
      username: 'elly',
      password: 'together'
    }

    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('login window shows', function () {
    cy.contains('login')
  })

  describe('login', function () {
    it('success with correct credentials', function () {
      cy.get('input:first').type('elly')
      cy.get('input:last').type('together')
      cy.get('#login-button').click()
      cy.contains('Elleonora logged in')
    })

    it('fails with incorrect credentials', function () {
      cy.get('input:first').type('elle')
      cy.get('input:last').type('elle')
      cy.get('#login-button').click()
      cy.contains('invalid username or password')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', { username: 'elly', password: 'together' })
        .then(response => window.localStorage.setItem('user', JSON.stringify(response.body)))
      cy.visit('http://localhost:3000')
    })

    it('a blog can be created', function () {
      cy.contains('new blog').click()
      cy.contains('create a blog')
      cy.get('#1').type('Love is in the air')
      cy.get('#2').type('Elly Zonaris')
      cy.get('#3').type('ellyzonaris.com')
      cy.get('#createButton').click()
      cy.contains('a new blog Love is in the air by Elly Zonaris added')
    })

    it('users can like the blog', function () {
      const blog = {
        title: 'Love is in the air',
        author: 'Elly Zonaris',
        likes: 0,
        url: 'ellyzonaris.com'
      }
      const token = JSON.parse(window.localStorage.getItem('user')).token
      cy.request({
        method: 'POST',
        url: 'http://localhost:3000/api/blogs',
        headers: {
          Authorization: `bearer ${token}`
        },
        body: blog
      })
      cy.visit('http://localhost:3000/api/blogs')
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains('1')
    })
  })
})