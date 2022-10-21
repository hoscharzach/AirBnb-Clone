
export function convertISODateToRange(startDate, endDate) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const startMonth = Number(startDate.slice(5, 7))
    const endMonth = Number(endDate.slice(5, 7))
    return `${months[startMonth - 1]} ${startDate.slice(8)} - ${months[endMonth - 1]} ${endDate.slice(8)}`
}

// To convert dataUrl (which we get from our blob) to a a file object
export const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) u8arr[n] = bstr.charCodeAt(n);

    return new File([u8arr], filename, { type: mime });
};
