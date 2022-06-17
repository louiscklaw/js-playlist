describe('viewports', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('Visits the pureudon by iphone-se2', () => {
    cy.viewport('iphone-se2');

    cy.visit('https://pureudon.github.io');
    cy.screenshot();
  });
});
