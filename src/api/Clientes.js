import base from "./Base.js";

const endpoint = "clientes";

const obtenerTodosLosClientes = async () => await base.get(endpoint);

const findOne = async (id) => await base.get(`${endpoint}/${id}`);

const crearCliente = async (payload) => await base.post(endpoint, payload);

const actualizarCliente = async (id, payload) =>
    await base.put(`${endpoint}/${id}`, payload);

const eliminarCliente = async (id) =>
    await base.remove(`${endpoint}/${id}`);

const api = { 
    crearCliente, 
    actualizarCliente, 
    obtenerTodosLosClientes, 
    eliminarCliente,
    findOne
};

export default api;
