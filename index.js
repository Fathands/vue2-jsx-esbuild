import { h } from 'vue';
import groupProps from './group-props';
/**
 *
 * @param {*} tag
 * @param {*} props
 * @param {*} children
 * @returns
 */
function vue2JsxEsbuild(tag, props = null, ...children) {
    const newPros = groupProps(props);
    return h(tag, newPros, children);
}

export default vue2JsxEsbuild;
