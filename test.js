// const { Schema } = require("mongoose");
// const mongoose = require("mongoose");
// mongoose.connect(
//   "mongodb://mariogomes:kmos4442437SADYHASdjASHxc12ANDAss@localhost:23217/"
// );

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// const rows = [
//   "AVALIACAO",
//   "CARTEIRA",
//   "CARTEIRAHISTORICO",
//   "CONTASAPAGAR",
//   "CONTASARECEBER",
//   "DESPESAOP",
//   "Envelope",
//   "FOTO",
//   "FichaCadastral",
//   "Grupo",
//   "LOGUE",
//   "Loja",
//   "MANUTENCAO",
//   "Marca",
//   "Modelo",
//   "NFe",
//   "NFeMensagem",
//   "PLANODECONTAS",
//   "Pessoa",
//   "Recibo",
//   "TRAMITACAO",
//   "marca",
//   "Veiculo",
//   "Versao",
// ];

// // rows.map((row) => {
// //   con.query(`SELECT * FROM mydb.${row}`, async function (err, result) {
// //     if (err) throw err;

// //     let xSchema = await getSchema(row);
// //     console.log("xSchema", xSchema);
// //     let xRow = mongoose.model(row.toLocaleLowerCase(), xSchema);

// //     xRow
// //       .create(result)
// //       .then((x) => console.log("bom"))
// //       .catch((e) => console.log("RUIM", e));
// //     // result.map((x) => console.log(x));
// //   });
// // });

// // function getSchema(column) {
// //   return new Promise((res, rej) => {
// //     con.query(`SHOW FIELDS FROM mydb.${column}`, function (err, result) {
// //       if (err) throw rej(err);
// //       let xSchema = {};
// //       result.map((x) => {
// //         xSchema[x.Field] = getType(x);
// //       });
// //       res(xSchema);
// //     });
// //   });
// // }

// // function getType(x) {
// //   if (
// //     x?.Type?.includes("varchar") ||
// //     x?.Type?.includes("text") ||
// //     x?.Type?.includes("blob")
// //   ) {
// //     return String;
// //   } else if (x?.Type?.includes("int")) {
// //     return Number;
// //   } else if (x?.Type?.includes("date")) {
// //     return Date;
// //   }
// // }

// let count = 0;

// let promises = rows.map((row) => {
//   return new Promise((res, rej) => {
//     con.query(`SHOW FIELDS FROM mydb.${row}`, function (err, result) {
//       if (err) throw err;

//       console.log("row", row);
//       result.map((x) => {
//         if (x.Key === "MUL") {
//           count++;
//         }
//       });
//       res();
//     });
//   });
// });

// Promise.all(promises).then((x) => console.log("count", count));

// const { Sequelize, DataTypes } = require("sequelize");
// const marca = require("./src/models/marca");

// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize("mydb", "root", null, {
//   host: "localhost",
//   dialect: "mysql",
// });

// async function auth() {
//   try {
//     await sequelize.authenticate();
//     console.log("Connection has been established successfully.");
//   } catch (error) {
//     console.error("Unable to connect to the database:", error);
//   }
// }

// try {
//   marca(sequelize, DataTypes)
//     .findAll({ where: { idMarca: 2222 } })
//     .then((x) => console.log(x));
// } catch (e) {
//   console.log("123", e);
// }
