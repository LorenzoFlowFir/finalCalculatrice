describe('My First Test', () => {
    it('appui sur une touche/nombre de la calculatrice affiche ce nombre', () => {
      cy.visit('https://lpsil.iutmetz.univ-lorraine.fr/applis/cypress/index.html');
      cy.get('#1').click();
      cy.get('#display').should('contain', '1');
    })
  })

  describe('My First addition', () => {
    it('test 9+3=', () => {
      cy.visit('https://lpsil.iutmetz.univ-lorraine.fr/applis/cypress/index.html');
      cy.get('#9').click();
      cy.get('#plus').click();
      cy.get('#3').click();
      cy.get('#evaluate').click();
      cy.get('#display').should('contain', '12');
    })
  })
  /*
  describe('Toutes les additions de 1 à 100', () => {
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        it(`test $i+3=`, () => {
          cy.visit('https://lpsil.iutmetz.univ-lorraine.fr/applis/cypress/index.html');
          cy.get('#9').click();
          cy.get('#plus').click();
          cy.get('#3').click();
          cy.get('#evaluate').click();
          cy.get('#display').should('contain', '12');
        })
      }
    }
    
  })*/

  describe('My First addition', () => {
    let i=7
    it('test ',i,'+3=', () => {
      cy.visit('https://lpsil.iutmetz.univ-lorraine.fr/applis/cypress/index.html');
      cy.get('#',7).click();
      cy.get('#plus').click();
      cy.get('#3').click();
      cy.get('#evaluate').click();
      cy.get('#display').should('contain', 7+3);
    })
  })
  