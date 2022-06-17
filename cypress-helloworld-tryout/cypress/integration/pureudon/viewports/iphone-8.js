describe('viewports', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('Visits the pureudon by iphone-8', () => {
    cy.viewport('iphone-8');

    cy.visit('https://pureudon.github.io');

    cy.visit('https://pureudon.github.io');
    cy.screenshot();
  });
});
