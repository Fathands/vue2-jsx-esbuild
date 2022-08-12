/**
 * makeMap
 * @param {*} str
 * @returns
 */
function makeMap(str) {
    var map = Object.create(null)
    var list = str.split(',')
    for (var i = 0; i < list.length; i++) {
        map[list[i]] = true
    }
    return val => map[val]
}

export default makeMap;
