describe('viewports', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('Visits the pureudon by iphone-xr', () => {
    cy.viewport('iphone-xr');

    cy.visit('https://pureudon.github.io');
    cy.screenshot();
  });
});
