import makeMap from './make-map';

let isTopLevel = makeMap('class,staticClass,style,key,ref,refInFor,slot,scopedSlots');
let nestableRE = /^(props|domProps|on|nativeOn|hook)([\-_A-Z])/;
let dirRE = /^v-/;
let xlinkRE = /^xlink([A-Z])/;

/**
 * groupProps
 * @param {*} obj
 * @returns
 */
function groupProps(obj) {
    if (!obj) {
        return {}
    }
    let currentNewPropObjects = Object.create(null);
    let props = [];
    Object.keys(obj).forEach(function (key) {
        props.push({
            key,
            value: obj[key]
        });
    });
    props.forEach(function (prop) {
        let name = prop.key;
        if (isTopLevel(name)) {
            currentNewPropObjects[name] = prop.value;
        } else {
            let nestMatch = name.match(nestableRE);
            if (nestMatch) {
                let prefix = nestMatch[1];
                let suffix = name.replace(nestableRE, function (_, $1, $2) {
                    return $2 === '-' ? '' : $2.toLowerCase();
                });
                let nestedProp = { [suffix]: prop.value };
                let nestedObject = currentNewPropObjects[prefix];
                if (!nestedObject) {
                    currentNewPropObjects = { ...currentNewPropObjects, [prefix]: nestedProp };
                    nestedObject = currentNewPropObjects[prefix];
                } else {
                    currentNewPropObjects[prefix] = { ...nestedObject, ...nestedProp }
                }
            } else if (dirRE.test(name)) {
                name = name.replace(dirRE, '');
                let dirs = currentNewPropObjects.directives;
                if (!dirs) {
                    dirs = currentNewPropObjects.directives = [];
                }
                dirs.push({
                    name: name,
                    value: prop.value
                })

            } else {
                let attrs = currentNewPropObjects.attrs;
                if (xlinkRE.test(prop.key)) {
                    prop.key = JSON.stringify(
                        prop.key.replace(xlinkRE, function (m, p1) {
                            return 'xlink:' + p1.toLowerCase();
                        })
                    );
                }
                if (!attrs) {
                    attrs = currentNewPropObjects.attrs = { [prop.key]: prop.value };
                } else {
                    currentNewPropObjects.attrs = { ...currentNewPropObjects.attrs, [prop.key]: prop.value }
                }
            }
        }
    });

    return currentNewPropObjects;
}

export default groupProps;
