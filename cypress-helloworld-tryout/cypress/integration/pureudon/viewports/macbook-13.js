describe('viewports', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('Visits the pureudon by macbook-13', () => {
    cy.viewport('macbook-13');
    cy.visit('https://pureudon.github.io');
    cy.screenshot();
  });
});
