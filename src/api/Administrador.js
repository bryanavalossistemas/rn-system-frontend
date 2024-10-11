import base from "./Base.js";

const endpoint = "administradores";

const crearVendedor = async (datos) =>
  await base.post(endpoint + "/vendedores/crear", datos);

const actualizarVendedor = async (id, datos) =>
  await base.put(endpoint + `/vendedores/actualizar/${id}`, datos);

const eliminarVendedor = async (id) =>
  await base.remove(endpoint + `/vendedores/eliminar/${id}`);

const api = { crearVendedor, actualizarVendedor, eliminarVendedor };

export default api;
