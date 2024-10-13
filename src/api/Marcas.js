import base from "./Base.js";

const endpoint = "marcas";

const obtenerTodasLasMarcas = async () => await base.get(endpoint);

const obtenerMarcaPorId = async (id) => await base.get(`${endpoint}/${id}`);

const crearMarca = async (payload) => await base.post(endpoint, payload);

const actualizarMarca = async (id, payload) =>
  await base.put(`${endpoint}/${id}`, payload);

const eliminarMarca = async (id) => await base.remove(`${endpoint}/${id}`);

const api = {
  obtenerTodasLasMarcas,
  obtenerMarcaPorId,
  crearMarca,
  actualizarMarca,
  eliminarMarca,
};

export default api;
