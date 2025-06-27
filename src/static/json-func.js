import testData from "./test.json";
import Cate from "./Categories.json";
import {ref,reactive} from "vue";
export function getData(item) {
    return Map.groupBy(item, ({ category }) => category);
}
export const Data = reactive(
    getData(testData.data)
)

export function removeItem(cate,name) {
    let index = Data.get(cate).indexOf(Data.get(cate).find(val => val.name.includes(name)));
    Data.get(cate).splice(index,1);
}
export function getCate(){
    return Cate.data;
}
export function getRanStr(){
    return crypto.randomUUID();
}
// Updates the category of an item with a given id from one category to another
export function updateCate(cate, id, newCate) {
    // Get the array of items in the current category
    const items = Data.get(cate);
    // Find the index of the item with the specified id
    let index = items.findIndex(val => val.id === id);
    // If item not found, exit the function
    if (index === -1) return;
    // Remove the item from the current category
    const [item] = items.splice(index, 1);
    // Update the item's category property
    item.category = newCate;
    // Update the Data map for the old category
    Data.set(cate, items);
    // Add the item to the new category in the Data map
    Data.set(newCate, [...(Data.get(newCate) || []), item]);
    // Log the update for debugging
}
export function updateItemName(cate,id,newName) {
    // Get the array of items in the specified category
    const items = Data.get(cate);
    let index = items.findIndex(val => val.id === id);
    if(index === -1)return;
    //const [item] = items.splice(index,1);
    items[index].name = newName;
    Data.set(cate,items);
    //Data.set(cate, [...(Data.get(cate) || []),item]);
}
export function addItem(itemName, category) {
    const newItem = {
        name: itemName,
        category: category,
        status: false,
        id: getRanStr()
    }
    Data.get(category).push(newItem);
    console.log(`Added item: ${itemName} to category: ${category}`);
}
export default { getData, removeItem,getRanStr,Data,Cate};