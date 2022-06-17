describe('viewports', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('Visits the pureudon by iphone-5', () => {
    cy.viewport('iphone-5');

    cy.visit('https://pureudon.github.io');

    cy.visit('https://pureudon.github.io');
    cy.screenshot();
  });
});
