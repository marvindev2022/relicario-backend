const https = require("https");
const querystring = require("querystring");

async function realizarPagamento(req, res) {
  // Extrair informações do corpo da requisição
  const { token, email, produtos, total, cliente } = req.body;

  // Criar sessão no PagSeguro
  const session = await criarSessaoPagSeguro(token, email);

  // Enviar informações da transação para o PagSeguro
  const pagamento = await enviarTransacaoPagSeguro(
    token,
    email,
    produtos,
    total,
    cliente,
    session
  );

  // Retornar código de transação para o front-end
  return res.json({ codigoTransacao: pagamento.code });
}

function criarSessaoPagSeguro(token, email) {
  return new Promise((resolve, reject) => {
    // Configurar dados da requisição
    const options = {
      hostname: "ws.pagseguro.uol.com.br",
      port: 443,
      path: "/v2/sessions",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    // Configurar dados da requisição
    const data = querystring.stringify({
      email: email,
      token: token,
    });

    // Enviar requisição para o PagSeguro
    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const response = JSON.parse(data);
        resolve(response.session.id);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}
function enviarTransacaoPagSeguro(
  token,
  email,
  produtos,
  total,
  cliente,
  session
) {
  return new Promise((resolve, reject) => {
    // Configurar dados da requisição
    const options = {
      hostname: "ws.pagseguro.uol.com.br",
      port: 443,
      path: "/v2/transactions",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    // Configurar dados da requisição
    const data = querystring.stringify({
      email: email,
      token: token,
      paymentMode: "default",
      paymentMethod: "creditCard",
      receiverEmail: email,
      currency: "BRL",
      extraAmount: "0.00",
      itemId1: "1",
      itemDescription1: produtos,
      itemAmount1: total,
      itemQuantity1: "1",
      senderName: cliente.nome,
      senderCPF: cliente.cpf,
      senderAreaCode: cliente.telefone.substr(0, 2),
      senderPhone: cliente.telefone.substr(2),
      senderEmail: cliente.email,
      senderHash: cliente.hashCartao,
      shippingAddressRequired: "false",
      sessionId: session,
    });

    // Enviar requisição para o PagSeguro
    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        const response = JSON.parse(data);
        resolve(response);
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.write(data);
    req.end();
  });
}
