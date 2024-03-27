let apiUrl = 'http://localhost:4003/loja';
let axios = require("axios");
let api;
let gerarCNPJ = require('./utils/gerarCnpj')

describe("Loja Tests", () => {
    step('Login ADMIN - Correto', async () => {
        const { assert } = await import("chai");

        let login = "admin@admin.com";
        let senha = "adminsenha";
    
        let resposta = await axios.post("http://localhost:4003/auth/login", { login, senha });
        assert.equal(resposta.status, 200);
        assert.exists(resposta.data.token);

        api = axios.create({
            baseURL: apiUrl,
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resposta.data.token}`
            },
        });
        
    });

    step('Criar Loja - CNPJ invalido', async () => {
        const { assert } = await import("chai");

        let loja = {
            "cnpjLoja": `23542354`,
            "DTYPE":"Loja",
            "emailLoja":"krx@gasdf.com",
            "nomeLoja":"kRX SISTEMAS",
            "isEstadualLoja":"123",
            "isMunicipalLoja":"1323",
            "siteLoja":"krx@asd.com"
        }

        try {
            let resposta = await api.post("/", loja);
        }catch(e){
            assert.isTrue(e.response.data.message.includes("CNPJ Invalido"));
            assert.equal(e.response.data.status, 400);
        }
    });

    step('Criar Loja - Valida', async () => {
        const { assert } = await import("chai");
        const  cnpjGerador  = gerarCNPJ();

        let loja = {
            "cnpjLoja": cnpjGerador,
            "DTYPE":"Loja",
            "emailLoja":`test-${generateRandomString(10)}@test.com`,
            "nomeLoja":`TEST ${generateRandomString(10)}`,
            "isEstadualLoja":"123",
            "isMunicipalLoja":"1323",
            "siteLoja":"krx@asd.com",
            "estadoEnderecoLoja": 'RJ',
        }

        try {
            let resposta = await api.post("/", loja);
        }catch(e){
            assert.isTrue(e.response.data.message.includes("CNPJ Invalido"));
            assert.equal(e.response.data.status, 400);
        }
    });

    step('Login USUARIO - Correto', async () => {
        const { assert } = await import("chai");

        let login = "socio@gmail.com";
        let senha = "123123";
    
        let resposta = await axios.post("http://localhost:4003/auth/login", { login, senha });
        assert.equal(resposta.status, 200);
        assert.exists(resposta.data.token);

        api = axios.create({
            baseURL: apiUrl,
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resposta.data.token}`
            },
        });
    });

    step('Criar Loja - Sem Permissao', async () => {
        const { assert } = await import("chai");

        let cnpjGerador = gerarCNPJ();
        let loja = {
            "cnpjLoja": cnpjGerador,
            "DTYPE":"Loja",
            "emailLoja":`test-${generateRandomString(10)}@test.com`,
            "nomeLoja":`TEST ${generateRandomString(10)}`,
            "isEstadualLoja":"123",
            "isMunicipalLoja":"1323",
            "siteLoja":"krx@asd.com",
            "estadoEnderecoLoja": 'RJ',
        }

        try {
            let resposta = await api.post("/", loja);
        }catch(e){
            assert.equal(e.response.data.status, 403);
        }
    });
});


function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

  module.exports.generateRandomString = generateRandomString;