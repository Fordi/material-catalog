const { dirname, join } = require('path');
const { readFile, writeFile } = require('fs/promises');

const DATA_FILE = join(dirname(__dirname), 'data/materials.json');

async function get(id) {
  const data = JSON.parse(await readFile(DATA_FILE, 'utf8'));
  if (!!id) {
    return { ...data[id], id };
  }
  return Object.keys(data).map((id) => ({ ...data[id], id }));
};

async function post({ name, color, volume, cost, deliveryDate }) {
  const data = JSON.parse(await readFile(DATA_FILE, 'utf8'));
  const id = Math.random().toString(36).substring(2);
  data[id] = { name, color, volume, cost, deliveryDate };
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  return { ...data[id], id };
}

async function put(id, update) {
  const data = JSON.parse(await readFile(DATA_FILE, 'utf8'));
  if (!id) {
    throw new Error('Method PUT must contain an ID');
  }
  data[id] = { ...data[id], ...update };
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  return { ...materials[id], id };
}

async function remove(id) {
  const data = JSON.parse(await readFile(DATA_FILE, 'utf8'));
  if (!id) {
    throw new Error('Method DELETE must contain an ID');
  }
  if (!data[id]) { 
    throw new Error(`Unknown ID: ${id}`);
  }
  delete data[id];
  await writeFile(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  return null;

}

async function materials({ body, method, path }, response) {
  let id = path.replace(/^\//, '') || null;
  try {
    switch (method) {
      case 'GET': return response.json(await get(id));
      case 'POST':
        if (!!id) {
          throw new Error('Cannot use an ID with POST.');
        }      
        return response.json(await post(body));
      case 'PUT': return response.json(await put(id, body));
      case 'DELETE': return response.json(await remove(id));
      default:
        throw new Error(`Unsupported method: ${method}`);
    }
  } catch (e) {
    response.status(500);
    response.write(e.message);
  }
};

module.exports = materials;