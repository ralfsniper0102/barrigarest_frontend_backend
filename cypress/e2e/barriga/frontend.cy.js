/// <reference types="cypress" />

const xpath = require("cypress-xpath");

import loc from "../../support/locators";
import "../../support/commands";
import "../../support/buildEnv";
import buildEnv from "../../support/buildEnv";

describe("Frontend", () => {
    after(() => {
        cy.clearLocalStorage();
    });

    before(() => {

        // buildEnv.login()

        // cy.login("ralfsniper0102@gmail.com", "123456");
    })

    beforeEach(() => {

        buildEnv.login()

        cy.login("ralfsniper0102@gmail.com", "123456");

        cy.wait('@signin')
            .then(res => console.log(res))
            .its('request.body.email').should('eql', 'ralfsniper0102@gmail.com')



        //cy.wrap({ age: 52 }).its('age').should('eq', 52) 
        //.should('equal','ralfsniper0102@gmail.com');


        //then(res => console.log(res.request.body.email));



    });

    it("criar conta", () => {
        buildEnv.contas();


        buildEnv.novaConta();

        cy.get(loc.CRIAR_CONTA.OPEN_MENU_CRIAR_CONTA).click();

        cy.get(loc.CRIAR_CONTA.LINK_CONTAS).click();

        cy.get(loc.CRIAR_CONTA.NOME).type("Conta Teste");
        cy.get(loc.CRIAR_CONTA.BTN_CRIAR_CONTA).click({ force: true });

        buildEnv.contaInserida();
    })

    it("atualizar conta", () => {
        buildEnv.contaInserida();
        cy.acessarMenuConta();

        cy.get(loc.ATUALIZAR_CONTA.BTN_ATUALIZAR).click({ force: true });
        cy.get(loc.ATUALIZAR_CONTA.CAMPO_TEXTO).clear().type("Conta atualizada1");

        buildEnv.contaAtualizada();

        cy.get(loc.ATUALIZAR_CONTA.BTN_CONFIRMAR_ATUALIZACAO).click({
            force: true,
        });
    });

    it("criar conta repetida", () => {

        buildEnv.contaAtualizada();

        cy.acessarMenuConta();

        buildEnv.contaAtualizada1();

        buildEnv.contaDuplicada();

        cy.duplicarTaxa("Conta atualizada1");

        cy.viewport('iphone-xr')
    });
});

