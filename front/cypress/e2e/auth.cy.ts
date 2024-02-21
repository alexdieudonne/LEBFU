
describe('Test login', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/')

    // Find a link with an href attribute containing "login" and click it
    cy.get('a[href*="login"]').click()

    cy.intercept('POST', `${Cypress.env('NEXT_PUBLIC_API_URL')}/auth/login`, {
      statusCode: 200,
      body: {
        "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoyLCJzZXNzaW9uX2lkIjoxNCwiaWF0IjoxNzA4NDczMzMxLCJleHAiOjE3MDkwNzgxMzF9.HopkENTXSaI64iTKDWajiWaqFpchPOjJVKpaxyDCnUs",
        "expires_at": 1709078131,
        "refresh_token": "clsv0wr660000s2dv24dz4i10"
      }
    })

    cy.intercept('GET', `${Cypress.env('NEXT_PUBLIC_API_URL')}/users/me`, {
      statusCode: 200,
      body: {
        user: {
          "id": 1,
          "email": "Alexdieudonne02@gmail.com",
          "lastname": "Dieudonne",
          "firstname": "Alex",
          "last_sign_in_at": "2024-02-20T23:56:44.000+00:00",
          "created_at": "2024-02-19T21:42:03.000+00:00",
          "updated_at": "2024-02-20T23:56:44.000+00:00"
        }
      }
    })

    // The new url should include "/login"
    cy.url().should('include', '/login')

    cy.get('h1').contains('Login to your account')

    // Fill in the form
    cy.get('input[name="email"]').type('Alexdieudonne02@gmail.com')
    cy.get('input[name="password"]').type('Alexdieudonne02@gmail.com')


    // Click on the submit button
    cy.get('button[type="submit"]').click()

    cy.get('h2').contains('Welcome Alex')
  })
})

describe('Test create card', () => {
  
})