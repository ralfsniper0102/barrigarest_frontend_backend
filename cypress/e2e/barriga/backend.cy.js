/// <reference types="cypress" />

import loc from '../../support/locators';

var moment = require('moment');

describe('backend', () => {
    let token;

    before(() => {
        cy.getToken('ralfsniper0102@gmail.com', '123456')
            .then(tkn => {
                token = tkn;
            })
    })
    beforeEach(() => {
        cy.resetRest(token);
    })

    it('cria conta', () => {

        cy.request({
            method: 'POST',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: "Conta via rest"
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })
    })

    it('alterar conta', () => {
        cy.getContaByName('Conta para alterar', token)
            .then(res => {
                cy.request({
                    method: 'PUT',
                    url: `/contas/${res}`,
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        nome: 'Conta alterada via rest'
                    }
                }).as('response')

                cy.get('@response').its('status').should('be.equal', 200)
            })


    })

    it('duplicar conta', () => {


        cy.request({
            method: 'POST',
            url: '/contas',
            headers: { Authorization: `JWT ${token}` },
            body: {
                nome: "Conta para alterar"
            },
            failOnStatusCode: false
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    })

    it('criar movimentação', () => {
        cy.getContaByName('Conta para movimentacoes', token)
            .then(contaId => {
                cy.request({
                    method: 'POST',
                    url: '/transacoes',
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        conta_id: contaId,
                        data_pagamento: moment().add({ days: 1 }).format('DD/MM/YYYY'),
                        data_transacao: moment().format('DD/MM/YYYY'),
                        descricao: "desc",
                        envolvido: "inter",
                        status: true,
                        tipo: "REC",
                        valor: "123"
                    }
                }).as('response')

                cy.get('@response').its('status').should('be.equal', 201)
                cy.get('@response').its('body.id').should('exist')
            })

        it('saldo', () => {
            cy.request({
                method: 'GET',
                url: '/contas',
                headers: { Authorization: `JWT ${token}` }
            }).then(res => console.log(res))
        })

    })

    it('saldo', () => {
        cy.request({
            method: 'GET',
            url: '/saldo',
            headers: { Authorization: `JWT ${token}` }

        }).then(res => {
            let saldoConta = null

            res.body.forEach(c => {
                if (c.conta === 'Conta para saldo') saldoConta = c.saldo
                console.log(saldoConta)
            })
            expect(saldoConta).to.be.equal('534.00')
        }


        ).as('response')

        cy.get('@response').its('status').should('be.equal', 200)

    })



})









