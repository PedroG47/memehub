export default function formatDateAgo(data) {
    const currentDate = new Date();
    const createdDate = new Date(data);
    const timeDifference = currentDate - createdDate;
    const minutesAgo = Math.floor(timeDifference / 60000);

    if (minutesAgo < 1) {
        return "Agora mesmo";
    } else if (minutesAgo === 1) {
        return "1 minuto atrás";
    } else if (minutesAgo < 60) {
        return `${minutesAgo} minutos atrás`;
    } else {
        const hoursAgo = Math.floor(minutesAgo / 60);
        if (hoursAgo === 1) {
            return "1 hora atrás";
        } else if (hoursAgo < 24) {
            return `${hoursAgo} horas atrás`;
        } else {
            const daysAgo = Math.floor(hoursAgo / 24);
            if (daysAgo === 1) {
                return "1 dia atrás";
        } else {
            return `${daysAgo} dias atrás`;
        }
        }
    }
}