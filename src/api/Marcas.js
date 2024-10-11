import base from "./Base.js";

const endpoint = "marcas";

const obtenerTodasLasMarcas = async () => await base.get(endpoint);

const api = { obtenerTodasLasMarcas };

export default api;
