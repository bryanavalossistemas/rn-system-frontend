import base from "./Base.js";

const endpoint = "categorias";

const obtenerTodasLasCategorias = async () => await base.get(endpoint);

const findOne = async (id) => await base.get(`${endpoint}/${id}`);

const crearCategoria = async (payload) => await base.post(endpoint, payload);

const actualizarCategoria = async (id, payload) => await base.put(`${endpoint}/${id}`, payload);

const eliminarCategoria = async (id) => await base.remove(`${endpoint}/${id}`);
const api = { crearCategoria, obtenerTodasLasCategorias, findOne, actualizarCategoria, eliminarCategoria };

export default api;
