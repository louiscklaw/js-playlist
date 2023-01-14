describe('viewports', () => {
  it('Does not do much!', () => {
    expect(true).to.equal(true)
  })

  it('example.com self test!', () => {
    cy.viewport('ipad-2')
    cy.visit('https://www.example.com')
    cy.compareSnapshot('example_com_self_test', 0.0)
  })

  it('Visits the pureudon by ipad-2', () => {
    cy.viewport('ipad-2')

    cy.visit('https://www.example.com')
    cy.compareSnapshot('homepage', 0.0)

    cy.visit('https://pureudon.github.io/seo_optimize/', {
      failOnStatusCode: false,
    })
    cy.compareSnapshot('seo_optimize', 0.0)

    cy.visit('https://pureudon.github.io/service_table/')
    cy.compareSnapshot('service_table', 0.0)

    cy.visit('https://pureudon.github.io/contact/')
    cy.compareSnapshot('contact', 0.0)
  })
})
