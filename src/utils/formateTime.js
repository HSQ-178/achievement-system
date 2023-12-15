//格式化时间函数
const formateTime = (time) => {
    const hours = (time.getHours() < 10 ? "0" + (time.getHours()) : time.getHours())
    const minutes = (time.getMinutes() < 10 ? "0" + (time.getMinutes()) : time.getMinutes())
    const seconds = (time.getSeconds() < 10 ? "0" + (time.getSeconds()) : time.getSeconds())

    return `${hours}:${minutes}:${seconds}`
}

export default formateTime;