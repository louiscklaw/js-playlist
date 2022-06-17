describe('viewports', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('Visits the pureudon by iphone-x', () => {
    cy.viewport('iphone-x');

    cy.visit('https://pureudon.github.io');
    cy.screenshot();
  });
});
