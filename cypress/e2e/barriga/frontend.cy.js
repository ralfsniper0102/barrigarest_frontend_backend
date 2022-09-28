/// <reference types="cypress" />

const xpath = require('cypress-xpath');

import loc from '../../support/locators';
import '../../support/commands';

describe('Frontend', () => {
    before(() => {
        cy.visit(loc.SITE_BARRIGA.LINK);
        cy.login('ralfsniper0102@gmail.com', '123456');  
    })

    it('criar conta', () => {
        cy.resetar();
        cy.criarTaxa('Conta Teste');
    })

    it('atualizar conta', () => {
        cy.acessarMenuConta();
        cy.atualizarConta('Conta atualizada');
        
    })

    it('criar conta repetida', () => {
        cy.duplicarTaxa('Conta atualizada');
        
    })
       
    
})