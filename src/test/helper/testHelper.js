const NAME = "name";

export const isTestableArray = (arr) => {
    return Array.isArray(arr) && arr.length > 0;
}

export const isEveryItemReturnTrue = (arr) => {

    if (!isTestableArray(arr)) {
        return false;
    }

    return Boolean(eval(arr.join('&')))
}

export const isObjContainCertainAttrs = (obj, certainAttrs) => {

    if (!isTestableArray(certainAttrs)) {
        return false;
    }

    var result = [];
    certainAttrs.forEach(attr => {
        result.push(Object.prototype.hasOwnProperty.call(obj, attr));
    })
    return isEveryItemReturnTrue(result);
}

export const isArrEveryElementContainCertainAttrs = (arr, certainAttrs) => {

    if (!(isTestableArray(arr) && isTestableArray(certainAttrs))) {
        return false;
    }

    var result = arr.map(obj => {
        return isObjContainCertainAttrs(obj, certainAttrs)
    })
    return isEveryItemReturnTrue(result);
}

const hasNameDuplicate = (arr) => {
    return arr.map((obj, idx, arr) => {
        return {
            name: obj[NAME],
            cnt: arr.map(m => m[NAME] === obj[NAME]).reduce((acc, cur) => {
                return cur ? ++acc : acc;
            }, 0)
        }
    }).some(m => m.cnt > 1);
}

export const isArrElementContainNameAttrAndNameBeUnique = (arr) => {

    if (!isTestableArray(arr)) {
        return false;
    }

    if (!isArrEveryElementContainCertainAttrs(arr, [NAME])) {
        return false
    }
    return !hasNameDuplicate(arr);
}
