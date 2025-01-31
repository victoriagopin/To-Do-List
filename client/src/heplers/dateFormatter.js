export function formatDate(){

    const date = new Date();
    const day = date.getUTCDate().toString().padStart(2, '0');
    let month = date.getMonth() + 1;
    const formattedMonth = month.toString().padStart(2, '0');
    const year = date.getFullYear();
    
    const today = {
        day,
        formattedMonth,
        year
    }
    return today;
}