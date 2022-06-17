describe('viewports', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('Visits the pureudon by macbook-15', () => {
    cy.viewport('macbook-15');

    cy.visit('https://pureudon.github.io');
    cy.screenshot();
  });
});
