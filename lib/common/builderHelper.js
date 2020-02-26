export const arrToObj = (arr) => {
    return arr.reduce((acc, cur) => {
        acc[cur.name] = cur.defaultVal
        return acc;
    }, {})
}