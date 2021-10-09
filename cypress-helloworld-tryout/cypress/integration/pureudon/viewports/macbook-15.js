describe("viewports", () => {
  it("Does not do much!", () => {
    expect(true).to.equal(true);
  });

  it("Visits the pureudon by macbook-15", () => {
    cy.viewport("macbook-15");

    cy.visit("https://pureudon.github.io");

    cy.visit("https://pureudon.github.io/seo_optimize/", {
      failOnStatusCode: false,
    });
    cy.screenshot();

    cy.visit("https://pureudon.github.io/service_table/");
    cy.screenshot();

    cy.visit("https://pureudon.github.io/contact/");
    cy.screenshot();
  });
});
