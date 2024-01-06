//格式化日期时间函数
export const formateDate = (date) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()

    return `${year}-${month}-${day}`
}

export const formateDateTime = (dateTime) => {
    const year = dateTime.getFullYear()
    const month = dateTime.getMonth() + 1
    const day = dateTime.getDate()
    const hours = (dateTime.getHours() < 10 ? "0" + (dateTime.getHours()) : dateTime.getHours())
    const minutes = (dateTime.getMinutes() < 10 ? "0" + (dateTime.getMinutes()) : dateTime.getMinutes())
    const seconds = (dateTime.getSeconds() < 10 ? "0" + (dateTime.getSeconds()) : dateTime.getSeconds())

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}