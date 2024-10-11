import base from "./Base.js";

const endpoint = "usuarios";

const obtenerTodasLasCategorias = async () => await base.get(endpoint);

const findOne = async (id) => await base.get(`${endpoint}/${id}`);

const crearCategoria = async (datos) => await base.post(endpoint, datos);

const iniciarSesion = async (datos) =>
  await base.post(endpoint + "/autenticacion/iniciarSesion", datos);

const obtenerUsuario = async (token) =>
  await base.getWithToken(endpoint + "/usuario/obtener", token);

const api = {
  crearCategoria,
  obtenerTodasLasCategorias,
  findOne,
  iniciarSesion,
  obtenerUsuario,
};

export default api;
