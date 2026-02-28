// Servicio para enviar notificaciones
class NotificationService {
    sendNotification(user, message) {
        console.log(`✅ Notificación enviada a ${user}: ${message}`);
    }
}

module.exports = NotificationService;