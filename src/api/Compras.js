import base from "./Base.js";

const endpoint = "compras";

const obtenerTodasLasCompras = async () => await base.get(endpoint);

// const findOne = async (id) => await base.get(`${endpoint}/${id}`);

const crearCompra = async (datos) => await base.post(endpoint, datos);

const api = { crearCompra, obtenerTodasLasCompras };

export default api;
