describe("DoConnect Login Test", () => {

  it("User should login successfully", () => {

    cy.visit("http://localhost:3000/login")

    cy.get('input[placeholder="Enter Email"]').type("manojkumar@gmail.com")

    cy.get('input[placeholder="Enter Password"]').type("Krsnaradha@1")

    cy.get("form").submit()
=
    cy.contains("All Questions", { timeout: 10000 }).should("be.visible")

  });

});