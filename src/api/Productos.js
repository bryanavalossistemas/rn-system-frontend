import base from "./Base.js";

const endpoint = "productos";

const crearProducto = async (formData) =>
  await base.postFormData(endpoint, formData);

const obtenerTodosLosProductos = async () => await base.get(endpoint);

const actualizarProducto = async (id, formData) =>
  await base.putFormData(endpoint + `/${id}`, formData);

const api = { crearProducto, obtenerTodosLosProductos, actualizarProducto };

export default api;
