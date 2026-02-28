// Servicio para generar reportes
class ReportService {
    generateReport(data) {
        console.log(`📊 Reporte generado con los datos: ${JSON.stringify(data)}`);
    }
}

module.exports = ReportService;