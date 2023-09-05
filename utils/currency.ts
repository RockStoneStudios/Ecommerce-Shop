

export const format = (value : number) => {
    const formatter = new Intl.NumberFormat('COP',{
        style : 'currency',
        currency : 'COP',
        minimumFractionDigits : 0,
        maximumFractionDigits : 0
    })
    return formatter.format(value);
}