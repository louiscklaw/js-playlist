describe("viewports", () => {
  it("Does not do much!", () => {
    expect(true).to.equal(true);
  });

  it("Visits the pureudon by iphone-4", () => {
    cy.viewport("iphone-4");

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
