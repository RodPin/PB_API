// let apiUrl = "http://localhost:4003/veiculo";
// let axios = require("axios");
// let api;

// describe("Veiculo Tests", () => {
//   step("Login SOCIO - Correto", async () => {
//     const { assert } = await import("chai");

//     let login = "socio@gmail.com";
//     let senha = "123123";

//     let resposta = await axios.post("http://localhost:4003/auth/login", { login, senha });
//     assert.equal(resposta.status, 200);
//     assert.exists(resposta.data.token);

//     api = axios.create({
//       baseURL: apiUrl,
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${resposta.data.token}`,
//       },
//     });
//   });

//   step("Criar Veiculo - Invalida", async () => {
//     const { assert } = await import("chai");
//     let veiculo = {
//       modeloVeiculo: "T",
//       marcaVeiculo: "T",
//       portasVeiculo: "T",
//       corVeiculo: "T",
//       placaVeiculo: "T",
//       chassiVeiculo: "T",
//       renavamVeiculo: "T",
//       tipoVeiculo: "F",
//     };

//     veiculosAttributeRequired.map(async (att) =>{
//         let copy = veiculo[att];
//         delete veiculo[att]
//         try {
//             let resposta = await api.post("/", veiculo);
//           } catch (e) {
//             assert.isTrue(e.response.data.message.includes("forneci"));
//             assert.equal(e.response.data.status, 400);
//           }
//           veiculo[att]= copy;
//     })
//   });

//   step("Criar Veiculo - Valida", async () => {
//     const { assert } = await import("chai");
//     let veiculo = {
//       modeloVeiculo: "T",
//       marcaVeiculo: "T",
//       portasVeiculo: "T",
//       corVeiculo: "T",
//       placaVeiculo: "T",
//       chassiVeiculo: "T",
//       renavamVeiculo: "T",
//       tipoVeiculo: "F",
//     };

//       let resposta = await api.post("/", veiculo);
//       assert.equal(resposta.status, 200);
//   });
// });

// const veiculosAttributeRequired = [
//     "modeloVeiculo",
//     "marcaVeiculo",
//     "portasVeiculo",
//     "corVeiculo",
//     "placaVeiculo",
//     "chassiVeiculo",
//     "renavamVeiculo",
//   ];
  