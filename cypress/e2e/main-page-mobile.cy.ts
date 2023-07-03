describe("<Home />", () => {
  it("Вход на аккаунт", () => {
    cy.viewport("iphone-xr")
    cy.visit("/")
    cy.get("[data-cy='button-enter']").click()
    cy.fixture("login.json")
      .then(response => {
        const email = response.email
        const password = response.password

        cy.get("[data-cy='input-email']").clear().type(email)
        cy.get("[data-cy='input-password']").clear().type(password)
        cy.get("[data-cy='submit']").click()
      })
  })
})