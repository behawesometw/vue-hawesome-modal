const NAME_ATTR = "name";

export const isEveryItemReturnTrue = (arr) => {
    return !(arr.some(m => !(m === true)));
}

export const isObjContainCertainAttrs = (obj, certainAttrs) => {
    var result = [];
    certainAttrs.forEach(attr => {
        result.push(Object.prototype.hasOwnProperty.call(obj, attr));
    })
    return isEveryItemReturnTrue(result);
}

export const isArrEveryElementContainCertainAttrs = (arr, certainAttrs) => {
    var result = arr.map(obj => {
        return isObjContainCertainAttrs(obj, certainAttrs)
    })
    return isEveryItemReturnTrue(result);
}

const hasNameDuplicate = (arr) => {
    return arr.map((obj, idx, arr) => {
        return {
            name: obj[NAME_ATTR],
            cnt: arr.map(m => m[NAME_ATTR] === obj[NAME_ATTR]).reduce((acc, cur) => {
                return cur ? ++acc : acc;
            }, 0)
        }
    }).some(m => m.cnt > 1);
}

export const isArrElementContainNameAttrAndNameBeUnique = (arr) => {
    if (!isArrEveryElementContainCertainAttrs(arr, [NAME_ATTR])) {
        return false
    }
    return !hasNameDuplicate(arr);
}
