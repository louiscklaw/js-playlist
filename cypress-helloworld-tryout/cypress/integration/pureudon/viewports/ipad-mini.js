describe('viewports', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('Visits the pureudon by ipad-mini', () => {
    cy.viewport('ipad-mini');

    cy.visit('https://pureudon.github.io');

    cy.visit('https://pureudon.github.io');
    cy.screenshot();
  });
});
