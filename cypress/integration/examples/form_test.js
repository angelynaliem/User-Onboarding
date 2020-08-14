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
      cy.get("[data-cy=name]").type("Emily").should("have.value", "Emily");
      // create test for email
      cy.get("[data-cy=email]")
        .type("test@gmail.com")
        .should("have.value", "test@gmail.com");
  
      cy.get("[data-cy=motivation]")
        .type("I want to help")
        .should("have.value", "I want to help");
  
      cy.get("[data-cy=positions]")
        .select("Tabling") // select by option "value" str in Form.js
        .should("have.value", "Tabling");
  
      cy.screenshot("my-name-of-image"); // takes a screenshot at this point in time where the position has been selected by the checkbox has not been checked
      cy.get("[data-cy=terms]").check().should("be.checked"); // checks a type="checkbox" input
  
      cy.get("[data-cy=submit]").click();
    });
  });