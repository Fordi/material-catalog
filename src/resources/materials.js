const fetchWithErrors = (...args) => fetch(...args).then(response => {
  if (!String(response.status).startsWith(2)) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }
  return response;
});

export async function get(id = null) {
  if (id === null) {
    return fetchWithErrors('/materials').then(r => r.json());
  }
  return fetchWithErrors(`/materials/${id}`).then(r => r.json());
};

export async function create({ name, color, volume, cost, deliveryDate }) {
  return fetchWithErrors('/materials', {
    method: 'post',
    body: JSON.stringify({ name, color, volume, cost, deliveryDate }),
    headers: { 'content-type': 'application/json' },
  }).then(r => r.json());
};

export async function update(id, changes) {
  console.log({ id, changes });
  return fetchWithErrors(`/materials/${id}`, {
    method: 'put',
    body: JSON.stringify(changes),
    headers: { 'content-type': 'application/json' },
  }).then(r => r.json());
};

export async function remove(id) {
  return fetchWithErrors(`/materials/${id}`, {
    method: 'delete',
  }).then(r => r.json());
};
