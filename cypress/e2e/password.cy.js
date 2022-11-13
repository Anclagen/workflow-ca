describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.clearLocalStorage();
    cy.wait(500);
    cy.get("#registerForm").within(() => {
      cy.get(".btn-close:visible").click();
      cy.wait(500);
    });
    cy.get("button[data-auth='login']:visible").click();
    cy.wait(500);
  });

  it("Can submit form submits with too short password", () => {
    cy.get("#loginForm").within(() => {
      cy.get("input[type='email']:visible")
        .should("exist")
        .type(Cypress.env("EMAIL"));
      cy.get("input[type='password']:visible").should("exist").type("p");
      cy.get("button[type='submit']").click();
    });
    cy.wait(2000);
    cy.on("window:alert", (msg) => {
      expect(msg).to.equal(
        "Either your username was not found or your password is incorrect"
      );
    });
    cy.then(() => expect(window.localStorage.getItem("token")).to.be.null);
    cy.then(() => expect(window.localStorage.getItem("profile")).to.be.null);
  });
});
