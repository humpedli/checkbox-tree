describe('Checkbox-tree', () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('should load correctly', () => {
    cy.contains('Checkbox-tree').should('exist');
    cy.get('h2').contains('Állatok').should('exist');
    cy.get('h2').contains('Színek').should('exist');
    cy.get('h3').should('have.length', 2);
  });

  it('should leaf checkbox work in standalone mode', () => {
    cy.get('#check-Kígyó').click();
    cy.get('#check-Kígyó').should('be.checked');

    cy.get('#check-Kígyó').click();
    cy.get('#check-Kígyó').should('not.be.checked');
  });

  it('should parent checkbox click trigger child checkboxes', () => {
    cy.get('#check-Hüllők').click();
    cy.get('#check-Hüllők').should('be.checked');
    cy.get('#check-Kígyó').should('be.checked');
    cy.get('#check-Gyík').should('be.checked');

    cy.get('#check-Hüllők').click();
    cy.get('#check-Hüllők').should('not.be.checked');
    cy.get('#check-Kígyó').should('not.be.checked');
    cy.get('#check-Gyík').should('not.be.checked');

    cy.get('#check-Összes').click();
    cy.get('#check-Kígyó').should('be.checked');
    cy.get('#check-Tyúk').should('be.checked');

    cy.get('#check-Összes').click();
    cy.get('#check-Kígyó').should('not.be.checked');
    cy.get('#check-Tyúk').should('not.be.checked');
  });

  it('should child checkbox click trigger parent checkboxes', () => {
    cy.get('#check-Kígyó').click();
    cy.get('#check-Gyík').click();
    cy.get('#check-Hüllők').should('be.checked');

    cy.get('#check-Gyík').click();
    cy.get('#check-Hüllők').should('not.be.checked');

    cy.get('#check-Madarak').click();
    cy.get('#check-Hüllők').click();
    cy.get('#check-Emlősök').click();
    cy.get('#check-Összes').should('be.checked');

    cy.get('#check-Macska').click();
    cy.get('#check-Összes').should('not.be.checked');
    cy.get('#check-Emlősök').should('not.be.checked');
    cy.get('#check-Hüllők').should('be.checked');
  });

  it('should have colors in object based checkbox tree', () => {
    cy.get('label[for="check-Khaki"]').should('have.css', 'color', 'rgb(238, 230, 151)');
    cy.get('label[for="check-Égkék"]').should('have.css', 'color', 'rgb(83, 188, 249)');
  });

});
