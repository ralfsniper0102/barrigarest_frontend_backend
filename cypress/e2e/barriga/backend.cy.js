/// <reference types="cypress" />


describe('backend', () => {
    it('cria conta', () => {
        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/signin',
            body: {
                email: "ralfsniper0102@gmail.com",
                senha: "123456",
                redirecionar: false
            }
        }).its('body.token').should('not.be.empty')
            .then(token => {
                cy.request({
                    method: 'POST',
                    url: 'https://barrigarest.wcaquino.me/contas',
                    headers: { Authorization: `JWT ${token}` },
                    body: {
                        nome: "Conta via rest"
                    }
                }).as('response')
            })
        
            cy.get('@response').then(res => {
                expect(res.status).to.be.equal(201)
                expect(res.body).to.have.property('id')
                expect(res.body).to.have.property('nome', 'Conta via rest')
            }) 

    })

})


