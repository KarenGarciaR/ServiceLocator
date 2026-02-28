**Descripción**

El Service Locator es un patrón de diseño que permite desacoplar la creación y uso de servicios de la lógica de negocio.
En vez de que un objeto cree o conozca directamente otro servicio, pregunta al Service Locator por el servicio que necesita.
Esto permite cambiar implementaciones sin afectar el código principal y facilita la escalabilidad.

---Objetivos del patrón en este proyecto:---

*Centralizar los servicios de la aplicación.
*Facilitar la reutilización de servicios en distintas partes del código.
*Mantener el código limpio y desacoplado.

---Estructura de archivos---

ServiceLocatorDemo/
│
├─ services/
│   ├─ NotificationService.js
│   └─ ReportService.js
│
├─ ServiceLocator.js
└─ index.js

services/ → Contiene los servicios concretos que realiza la aplicación.
ServiceLocator.js → Clase central que gestiona los servicios.
index.js → Punto de entrada para probar y usar los servicios.

---Código comentado---

ServiceLocator.js
// ServiceLocator.js
// Clase principal que gestiona los servicios de la aplicación
class ServiceLocator {
    constructor() {
        // Map para almacenar los servicios registrados con su nombre
        this.services = new Map();
    }

    /**
     * Registrar un servicio en el Service Locator
     * @param {string} name - Nombre del servicio
     * @param {Object} instance - Instancia del servicio
     */
    addService(name, instance) {
        this.services.set(name, instance);
    }

    /**
     * Obtener un servicio previamente registrado
     * @param {string} name - Nombre del servicio
     * @returns {Object} - Instancia del servicio solicitado
     * @throws {Error} - Si el servicio no se encuentra
     */
    getService(name) {
        const service = this.services.get(name);
        if (!service) {
            throw new Error(`Servicio "${name}" no encontrado.`);
        }
        return service;
    }
}

module.exports = ServiceLocator;
services/NotificationService.js
// Servicio para enviar notificaciones
class NotificationService {
    /**
     * Enviar notificación a un usuario
     * @param {string} user - Nombre del usuario
     * @param {string} message - Mensaje de la notificación
     */
    sendNotification(user, message) {
        console.log(`Notificación enviada a ${user}: ${message}`);
    }
}

module.exports = NotificationService;
services/ReportService.js
// Servicio para generar reportes
class ReportService {
    /**
     * Genera un reporte a partir de datos proporcionados
     * @param {Object} data - Datos para generar el reporte
     */
    generateReport(data) {
        console.log(`Reporte generado con los datos: ${JSON.stringify(data)}`);
    }
}

module.exports = ReportService;
index.js (Uso de los servicios con Service Locator)
const ServiceLocator = require('./ServiceLocator');
const NotificationService = require('./services/NotificationService');
const ReportService = require('./services/ReportService');

// Crear instancia del Service Locator
const serviceLocator = new ServiceLocator();

// Registrar servicios en el Service Locator
serviceLocator.addService('notification', new NotificationService());
serviceLocator.addService('report', new ReportService());

// Obtener servicios desde cualquier parte del código
const notifier = serviceLocator.getService('notification');
notifier.sendNotification('Karen', 'Tu reporte está listo.');

const reporter = serviceLocator.getService('report');
reporter.generateReport({ ventas: 200, ganancias: 120 });

---Cómo funciona el Service Locator---

*Registrar servicios:
Cada servicio se crea una sola vez y se registra con un nombre único:

serviceLocator.addService('notification', new NotificationService());

+Solicitar servicios:
Cuando se necesita un servicio, se pide al locator:

const notifier = serviceLocator.getService('notification');
Esto devuelve la instancia del servicio, sin que el código principal necesite saber cómo se creó.

**Ventaja:**

Si mañana cambias NotificationService por EmailService, solo cambias el registro en ServiceLocator, el resto del código no se toca.

----Instrucciones de instalación y ejecución---

Instalar Node.js si no está instalado: https://nodejs.org
Abrir terminal en la carpeta ServiceLocatorDemo
Ejecutar el proyecto:
node index.js

**-----Resultado esperado:---**

Notificación enviada a Karen: Tu reporte está listo.
Reporte generado con los datos: {"ventas":200,"ganancias":120}

----Diagrama UML del patrón----

+----------------+
|  ServiceLocator|
+----------------+
| -services: Map |
+----------------+
| +addService()  |
| +getService()  |
+----------------+
        ^
        |
        |
+-----------------------+    +--------------------+
| NotificationService   |    | ReportService      |
+-----------------------+    +--------------------+
| +sendNotification()   |    | +generateReport()  |
+-----------------------+    +--------------------+

*ServiceLocator guarda referencias a los servicios.
*Cada servicio implementa su propia funcionalidad.
*Las flechas representan que ServiceLocator conoce y gestiona los servicios.
