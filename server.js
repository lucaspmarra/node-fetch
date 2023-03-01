const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Please use /cep/:cep endpoint passing a CEP to get data" });
});

app.get("/cep/:cep", async (req, res) => {
  // if (req.params.cep.length <= 8) {
  //   res.status(406).send({ error: "Erro, menos que 7" });
  // } else {
  try {
    const response = await fetch(
      `https://viacep.com.br/ws/${req.params.cep}/json/`
    );
    const data = await response.json();
    const { cep, logradouro, localidade, uf } = data;
    console.log(data);
    res.status(200).send({
      cep,
      logradouro,
      localidade,
      uf,
    });
  } catch (error) {
    res.status(406).send({
      error: "Desculpe, não foi possível encontrar o CEP informado.",
    });
    console.log(error);
  }
  // }
});

app.get("/users", async function (req, res) {
  try {
    const response = await fetch(
      `https://cors.sh/https://jsm-challenges.s3.amazonaws.com/frontend-challenge.json`
    )
    const data = await response.json();
    res.status(200).status(data)
    console.log(data);
  } catch (error) {
    console.log(error);
    res.send(error)
    // res.status(404).send({ error: 'Não foi possível realizar a requisição' })

  }
})


app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
module.export = app;
