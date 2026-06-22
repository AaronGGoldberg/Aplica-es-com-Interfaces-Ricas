const http = require('node:http');
const { readFile, writeFile } = require('node:fs/promises');
const { join } = require('node:path');

const dbPath = join(__dirname, 'db.json');
const port = Number(process.env.PORT ?? 3000);

async function readDb() {
  return JSON.parse(await readFile(dbPath, 'utf8'));
}

async function writeDb(db) {
  normalizarIdsProdutos(db);    
  await writeFile(dbPath, `${JSON.stringify(db, null, 2)}\n`);
}

function normalizarIdsProdutos(db) {
  let idsAlterados = false;

  db.produtos = db.produtos.map((produto, index) => {
    const idSequencial = index + 1;

    if (produto.id === idSequencial) {
      return produto;
    }

    idsAlterados = true;
    return { ...produto, id: idSequencial };
  });

  return idsAlterados;
}

function sendJson(response, statusCode, body) {
  response.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  });
  response.end(body === undefined ? undefined : JSON.stringify(body));
}

function getBody(request) {
  return new Promise((resolve, reject) => {
    let rawBody = '';
    request.on('data', chunk => (rawBody += chunk));
    request.on('end', () => {
      if (!rawBody) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(rawBody));
      } catch (error) {
        reject(error);
      }
    });
  });
}

function parseProdutoUrl(url) {
  const { pathname } = new URL(url, `http://localhost:${port}`);
  const match = pathname.match(/^\/produtos\/?(\d+)?$/);
  return match ? { id: match[1] ? Number(match[1]) : null } : null;
}

const server = http.createServer(async (request, response) => {
  if (request.method === 'OPTIONS') {
    sendJson(response, 204);
    return;
  }

  const produtoUrl = parseProdutoUrl(request.url);

  if (!produtoUrl) {
    sendJson(response, 404, { message: 'Rota não encontrada.' });
    return;
  }

  try {
    const db = await readDb();

    if (normalizarIdsProdutos(db)) {
      await writeDb(db);
    }    

    if (request.method === 'GET' && produtoUrl.id === null) {
      sendJson(response, 200, db.produtos);
      return;
    }

    if (request.method === 'GET') {
      const produto = db.produtos.find(item => item.id === produtoUrl.id);
      sendJson(response, produto ? 200 : 404, produto ?? { message: 'Produto não encontrado.' });
      return;
    }

    if (request.method === 'POST' && produtoUrl.id === null) {
      const body = await getBody(request);
      const novoProduto = { ...body, id: db.produtos.length + 1 };
      db.produtos.push(novoProduto);
      await writeDb(db);
      sendJson(response, 201, novoProduto);
      return;
    }

    if (request.method === 'PUT' && produtoUrl.id !== null) {
      const produtoIndex = db.produtos.findIndex(item => item.id === produtoUrl.id);

      if (produtoIndex === -1) {
        sendJson(response, 404, { message: 'Produto não encontrado.' });
        return;
      }

      const body = await getBody(request);
      const produtoAtualizado = { ...body, id: produtoUrl.id };
      db.produtos[produtoIndex] = produtoAtualizado;
      await writeDb(db);
      sendJson(response, 200, produtoAtualizado);
      return;
    }

    if (request.method === 'DELETE' && produtoUrl.id !== null) {
      const tamanhoAnterior = db.produtos.length;
      db.produtos = db.produtos.filter(item => item.id !== produtoUrl.id);

      if (db.produtos.length === tamanhoAnterior) {
        sendJson(response, 404, { message: 'Produto não encontrado.' });
        return;
      }

      await writeDb(db);
      sendJson(response, 204);
      return;
    }

    sendJson(response, 405, { message: 'Método não permitido.' });
  } catch (error) {
    sendJson(response, 500, { message: 'Erro interno no backend.', error: String(error) });
  }
});

server.listen(port, () => {
  console.log(`Backend REST/JSON disponível em http://localhost:${port}/produtos`);
});