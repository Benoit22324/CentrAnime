export const convertDateToText = (date: Date) => {
    let month = "";
    const monthNumber = date.getMonth() + 1;
    const monthNames = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];

    if (monthNumber >= 1 && monthNumber <= 12) {
        month = monthNames[monthNumber - 1];
    } else month = monthNames[0];

    return `${date.getDate()} ${month} ${date.getFullYear()}`
}