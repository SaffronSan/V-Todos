import testData from "./test.json";
import {ref} from "vue";
export function getData() {
    return Map.groupBy(testData.data, ({ category }) => category);
}
export const data = ref(getData())

export function removeItem(cate,name) {
    let index = data.value.get(cate).indexOf(data.value.get(cate).find(val => val.name.includes(name)));
    data.value.get(cate).splice(index,1);
    console.log(data.value.get(cate))
}


export default { getData, removeItem,data};