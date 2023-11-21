export default function formatDateAgo(data) {
    const currentDate = new Date();
    const createdDate = new Date(data);
    const timeDifference = currentDate - createdDate;
    const minutesAgo = Math.floor(timeDifference / 60000);

    if (minutesAgo < 1) {
        return "Agora mesmo";
    }

    if (minutesAgo === 1) {
        return "1 minuto atrás";
    }

    if (minutesAgo < 60) {
        return `${minutesAgo} minutos atrás`;
    }

    const hoursAgo = Math.floor(minutesAgo / 60);

    if (hoursAgo === 1) {
        return "1 hora atrás";
    }

    if (hoursAgo < 24) {
        return `${hoursAgo} horas atrás`;
    }

    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo === 1) {
        return "1 dia atrás";
    }

    return `${daysAgo} dias atrás`;



}