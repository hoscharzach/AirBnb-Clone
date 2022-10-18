
export function convertISODateToRange(startDate, endDate) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const startMonth = Number(startDate.slice(5, 7))
    const endMonth = Number(endDate.slice(5, 7))
    return `${months[startMonth - 1]} ${startDate.slice(8)} - ${months[endMonth - 1]} ${endDate.slice(8)}`
}
