describe('viewports', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true);
  });

  it('Visits the pureudon by macbook-16', () => {
    cy.viewport('macbook-16');

    cy.visit('https://pureudon.github.io');
    cy.screenshot();
  });
});
