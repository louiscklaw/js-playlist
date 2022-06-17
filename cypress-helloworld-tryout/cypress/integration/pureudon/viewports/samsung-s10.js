describe('viewports', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('Visits the pureudon by samsung-s10', () => {
    cy.viewport('samsung-s10');
    cy.visit('https://pureudon.github.io');
    cy.screenshot();
  });
});
