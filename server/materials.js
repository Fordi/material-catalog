const { readFile, writeFile } = require('fs/promises');


async function get(data_file, id) {
  const data = JSON.parse(await readFile(data_file, 'utf8'));
  if (!!id) {
    return { ...data[id], id };
  }
  return Object.keys(data).map((id) => ({ ...data[id], id }));
};

async function post(data_file, { name, color, volume, cost, deliveryDate }) {
  const data = JSON.parse(await readFile(data_file, 'utf8'));
  const id = Math.random().toString(36).substring(2);
  data[id] = { name, color, volume, cost, deliveryDate };
  await writeFile(data_file, JSON.stringify(data, null, 2), 'utf8');
  return { ...data[id], id };
}

async function put(data_file, id, update) {
  const data = JSON.parse(await readFile(data_file, 'utf8'));
  if (!id) {
    throw new Error('Method PUT must contain an ID');
  }
  data[id] = { ...data[id], ...update };
  await writeFile(data_file, JSON.stringify(data, null, 2), 'utf8');
  return { ...data[id], id };
}

async function remove(data_file, id) {
  const data = JSON.parse(await readFile(data_file, 'utf8'));
  if (!id) {
    throw new Error('Method DELETE must contain an ID');
  }
  if (!data[id]) { 
    throw new Error(`Unknown ID: ${id}`);
  }
  delete data[id];
  await writeFile(data_file, JSON.stringify(data, null, 2), 'utf8');
  return null;

}
function endpoint(data_file) {
  return async function materials({ body, method, path }, response) {
    let id = path.replace(/^\//, '') || null;
    try {
      switch (method) {
        case 'GET': return response.json(await get(data_file, id));
        case 'POST':
          if (!!id) {
            throw new Error('Cannot use an ID with POST.');
          }      
          return response.json(await post(data_file, body));
        case 'PUT': return response.json(await put(data_file, id, body));
        case 'DELETE': return response.json(await remove(data_file, id));
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
    } catch (e) {
      response.status(500);
      response.write(e.message);
    }
  };
};

module.exports = endpoint;