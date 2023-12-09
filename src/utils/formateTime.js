//格式化时间函数
const formateTime = (time) => {
    const hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()

    return `${hours}:${minutes}:${seconds}`
}

export default formateTime;