describe("Navigation", () => {

  /* test 1 - visit index */
  it("should visit root", () => {
    cy.visit("/");
  });

  /* test 2 - check the daylist component */
  it("Should contain the text Tuesday", () => {
    cy.visit("/")

    cy.contains('[data-testid="day"]', "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected", "rgb(242, 242, 242)");
  })
});

