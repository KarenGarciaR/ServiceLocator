const ServiceLocator = require('./ServiceLocator');
const NotificationService = require('./services/NotificationService');
const ReportService = require('./services/ReportService');

// Creamos el Service Locator
const serviceLocator = new ServiceLocator();

// Registramos los servicios
serviceLocator.addService('notification', new NotificationService());
serviceLocator.addService('report', new ReportService());

// Usamos los servicios desde cualquier parte del código
const notifier = serviceLocator.getService('notification');
notifier.sendNotification('Karen', 'Tu reporte está listo.');

const reporter = serviceLocator.getService('report');
reporter.generateReport({ ventas: 200, ganancias: 120 });