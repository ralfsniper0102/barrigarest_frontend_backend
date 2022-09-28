const locators = {
    SITE_BARRIGA: {
        LINK:'https://barrigareact.wcaquino.me/'
    },
    
    LOGIN:{
        USER: '[data-test="email"]',
        PASSWORD: '[data-test="passwd"]',
        BTN_ENTRAR: '.btn'
    },

    TOAST:{
        MSG: '.toast-message'
    },
 
    REGISTER:{
        OPEN_REGISTER: ':nth-child(2) > .nav-link',
        NOME: '.jumbotron > :nth-child(1) > .form-control',
        EMAIL: '.input-group > .form-control',
        SENHA: ':nth-child(3) > .form-control',
        BTN_REGISTRAR: '.btn' 
    },

    CRIAR_CONTA:{
        OPEN_MENU_CRIAR_CONTA: '[data-test="menu-settings"]',
    
        NOME: '[data-test="nome"]',
        BTN_CRIAR_CONTA: '.btn',
        MESSAGE: '.toast-message',
        LINK_CONTAS: '[href="/contas"]'
    },

    MENU:{
        OPEN_MENU: '[data-test="menu-settings"]',
        RESETAR: '[href="/reset"]'
        
    },
    ATUALIZAR_CONTA:{
        BTN_ATUALIZAR: ':nth-child(7) > :nth-child(2) > :nth-child(1) > .far',
        CAMPO_TEXTO: '[data-test="nome"]',
        BTN_CONFIRMAR_ATUALIZACAO: '.btn'
      
    },
    
    
    
    // cy.get('[data-test="email"]').type('ralfsniper0102@gmail.com');
    //     cy.get('[data-test="passwd"]').type('123456');
}

export default locators;
