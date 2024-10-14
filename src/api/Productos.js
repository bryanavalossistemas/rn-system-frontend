import base from "./Base.js";

const endpoint = "productos";

const crearProducto = async (formData) =>
  await base.postFormData(endpoint, formData);

const obtenerTodosLosProductos = async () => await base.get(endpoint);

const actualizarProducto = async (id, formData) =>
  await base.putFormData(endpoint + `/${id}`, formData);

const eliminarProducto = async (id) => await base.remove(`${endpoint}/${id}`);

const api = {
  crearProducto,
  obtenerTodosLosProductos,
  actualizarProducto,
  eliminarProducto,
};

export default api;
