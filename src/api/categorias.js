import base from "./Base.js";

const endpoint = "categorias";

const obtenerTodasLasCategorias = async () => await base.get(endpoint);

const findOne = async (id) => await base.get(`${endpoint}/${id}`);

const crearCategoria = async (payload) => await base.post(endpoint, payload);

const api = { crearCategoria, obtenerTodasLasCategorias, findOne };

export default api;
