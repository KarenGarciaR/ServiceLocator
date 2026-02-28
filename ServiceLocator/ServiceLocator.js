// ServiceLocator.js
class ServiceLocator {
    constructor() {
        this.services = new Map();
    }

    // Registrar un servicio con nombre
    addService(name, instance) {
        this.services.set(name, instance);
    }

    // Obtener un servicio por su nombre
    getService(name) {
        const service = this.services.get(name);
        if (!service) {
            throw new Error(`Servicio "${name}" no encontrado.`);
        }
        return service;
    }
}

module.exports = ServiceLocator;