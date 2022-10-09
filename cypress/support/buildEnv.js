const login = () => {

  cy.intercept("POST", "**/signin", (req) => {
    req.reply({
      statusCode: 200,
      body: {
        id: 1000,
        nome: "Usuario falso",
        token:
          "Uma string muito grande que nao deveria ser aceita mas na verdade, vai",
      },
    });
  }).as("signin");

  cy.intercept("GET", "**/saldo", (req) => {
    req.reply({
      statusCode: 200,
      body: [
        {
          conta_id: 1421400,
          conta: "Conta para movimentacoes",
          saldo: "-100000500.00",
        },
        {
          conta_id: 142100,
          conta: "Conta para movimentacoes1",
          saldo: "100000500.00",
        },
      ],
    });
  }).as("saldo")



}






module.exports = {
  login,
}