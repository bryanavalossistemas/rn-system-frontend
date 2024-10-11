import base from "./Base.js";

const endpoint = "clientes";

const obtenerTodosLosClientes = async () => await base.get(endpoint);

const findOne = async (id) => await base.get(`${endpoint}/${id}`);

const crearCliente = async (payload) => await base.post(endpoint, payload);

const api = { crearCliente, obtenerTodosLosClientes, findOne };

export default api;
