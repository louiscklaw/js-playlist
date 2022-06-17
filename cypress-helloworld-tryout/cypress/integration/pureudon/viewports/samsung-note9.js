describe('viewports', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('Visits the pureudon by samsung-note9', () => {
    cy.viewport('samsung-note9');

    cy.visit('https://pureudon.github.io');
    cy.screenshot();
  });
});
