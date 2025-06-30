import testData from "./test.json";
import Cate from "./Categories.json";
import { reactive } from "vue";
/**
 * Returns Data; Which is a Map of Arrays with each Array tied to a Category
 * @param {Array Todo} item 
 * @returns {Map Array}
 */
export function getData(item) {
    const mapArr = Map.groupBy(item, ({ category }) =>  category);
    // Add toggleExpand attribute to each category array in the map
    for (const [cate, arr] of mapArr.entries()) {
        arr.toggleExpand = true;
        mapArr.set(cate, arr);
    }
    // This just adds a blank array inside mapArr, when it doesn't have a cate inside mapArr
    for (let cate of getCate()) {
        if (mapArr.get(cate) === undefined) {
            mapArr.set(cate, []);
        }
    }
    return mapArr;
}
export const Data = reactive(localStorage.getItem(btoa("Todos-Data")) === null? new Map() : getData(JSON.parse(atob(localStorage.getItem(btoa("Todos-Data"))))));
/**
 * Combines all the array for Data
 * @returns Array
 */
export function getTotalArray() {
    let totalArr = [];
    for (let arr of Data.values()) {
        totalArr = totalArr.concat(arr);
    }
    return totalArr;
}
/**
 * Quick Note; The name of the variable has to match the keys!!
 * @returns Object -> {Category, Array of that Category}
 */
function getArrayCategory(id){
    const items = getTotalArray();
    let index = items.findIndex(val => val.id === id);
    if (index === -1) return -1;
    const cate = items[index].category;
    return {cate: cate, arrCate: Data.get(cate)};
}
/**
 * Removes Item using ID
 * @param {String} cate 
 * @param {String} name 
 */
export function removeItem(id) {
    const {arrCate} = getArrayCategory(id);
    let index = arrCate.findIndex(item => item.id === id);
    arrCate.splice(index,1);
    updateLocalStorage();
}
/**
 * Returns an Array of Category
 * @returns Array
 */
export function getCate() {
    return Cate.data;
}
/**
 * Returns a Unique String ID
 * @returns {String} UUID
 */
export function getRanStr() {
    return crypto.randomUUID();
}
/**
 * Updates the category of an item with a given id from one category to another
 * @param {String} id 
 * @param {String} newCate 
 */
export function updateCate(id, newCate) {
    const {cate,arrCate} = getArrayCategory(id);
    if (cate === newCate) return;
    const [item] = arrCate.splice(arrCate.findIndex(val => val.id === id), 1);
    item.category = newCate;
    Data.set(cate, arrCate);
    Data.set(newCate, [...(Data.get(newCate) || []), item]);
    Data.get(newCate).toggleExpand = true;
    updateLocalStorage();
}
/**
 * Updates an Item Name 
 * @param {String} id 
 * @param {String} newName 
 */
export function updateItemName(id, newName) {
    const {cate,arrCate} = getArrayCategory(id);
    let index = arrCate.findIndex(val => val.id === id);
    if (index === -1) return;
    arrCate[index].name = newName;
    Data.set(cate, arrCate);
    updateLocalStorage();
}
/**
 * Updates the Status of Todo
 * @param {String} id 
 * @param {String} state  
 */
export function updateStatus(id,state){
    const {cate,arrCate} = getArrayCategory(id);
    let index = arrCate.findIndex(val => val.id === id);
    if (index === -1) return;
    arrCate[index].status = !state;
    Data.set(cate, arrCate);
    updateLocalStorage();
}
/**
 * Creates a new Todo Object and then Adds it to Data
 * @param {String} itemName 
 * @param {String} category 
 */
export function addItem(itemName, category) {
    const newItem = {
        name: itemName,
        category: category,
        status: false,
        id: getRanStr()
    }
    // This is when the category doesn't exist and needs to be created.
    if (getCate().includes(category) && !Data.has(category)) {
        Data.set(category, []);
        Data.get(category).toggleExpand = true;
    }
    if (Data.get(category).length === 0) {
        Data.get(category).toggleExpand = true;
    }
    Data.get(category).push(newItem);
    updateLocalStorage();
}
/**
 * Finds list of items from Name
 * @param {String} name 
 * @return {Array} Arrays
 */
export function searchName(name){
    if (!name || name.length < 1) return [];
    const total = getTotalArray();
    const result = total.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
    if (result.length > 0) return result;
    return [];
}
/**
 * 
 * @returns {Array}
 */
export function getTotalStatus(){
    const total = getTotalArray(), totalCompleted = total.filter(item => item.status);
    return {total: total.length, completed: totalCompleted.length};
}
/**
 * Updates the Local Storage with the current Data & Encodes it with Base64
 */
function updateLocalStorage() {
    localStorage.setItem(btoa("Todos-Data"), btoa(JSON.stringify(getTotalArray().flat())));
}
/**
 * Returns either total Array is empty or not
 * @returns {Boolean}
 */
export function isEmpty(){
    return getTotalArray().length === 0;
}
/**
 * Returns a sorted array based on Status
 * @param {Array} arr 
 * @returns {Array} Sorted Array
 */
export function sortByStatus(arr) {
    return arr.toSorted((a, b) => {
        if (a === b) return 0;
        return a.status ? -1 : 1; 
    });
}
export default { getData, removeItem, getRanStr, Data, Cate };