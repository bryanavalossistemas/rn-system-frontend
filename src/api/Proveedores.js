import base from "./Base.js";

const endpoint = "proveedores";

const crearProveedor = async (payload) => await base.post(endpoint, payload)
  
const obtenerTodosLosProveedores = async () => await base.get(endpoint);

const obtenerUnProveedor = async (id) => await base.get(`${endpoint}/${id}`);

const actualizarProveedor = async (id, payload) =>  
  await base.put(`${endpoint}/${id}`, payload);

const eliminarProveedor = async (id) =>
  await base.remove(`${endpoint}/${id}`);

const api = {
  crearProveedor,
  obtenerTodosLosProveedores,
  obtenerUnProveedor,
  actualizarProveedor,
  eliminarProveedor,
};

export default api;
