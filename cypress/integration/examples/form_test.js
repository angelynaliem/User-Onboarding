// run this spec with : npx cypress run --spec "cypress/integration/form_test.js"

// you can use context instead of describe
describe("Testing form inputs", () => {
    // beforeEach runs before each "it" or "specify" block inside of this context/describe block
    beforeEach(() => {
      cy.visit("http://localhost:3000");
    });
    // you can use "specify" instead of it
    it("adding text to inputs and submits the form", () => {
      // make sure you add the data-cy attribute to your actual code that you're testing!
      cy.get("[data-cy=name]").type("Angelyn Liem").should("have.value", "Angelyn Liem");
      // create test for email
      cy.get("[data-cy=email]")
        .type("angelynaliem@gmail.com")
        .should("have.value", "angelynaliem@gmail.com");
  
      cy.get("[data-cy=password]")
        .type("123456")
        .should("have.value", "123456");
  
      cy.get("[data-cy=role]")
        .select("Full Stack Web Developer") // select by option "value" str in Form.js
        .should("have.value", "Full Stack Web Developer");
  
      cy.get("[data-cy=terms]").check().should("be.checked"); // checks a type="checkbox" input
  
      cy.get("[data-cy=submit]").click();
      cy.screenshot("my-name-of-image"); // takes a screenshot at this point in time where the position has been selected by the checkbox has not been checked
    });
  });