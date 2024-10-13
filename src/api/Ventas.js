import base from "./Base.js";

const endpoint = "ventas";

const obtenerTodasLasVentas = async () => await base.get(endpoint);

const crearVenta = async (datos) => await base.post(endpoint, datos);

const api = { crearVenta, obtenerTodasLasVentas };

export default api;
