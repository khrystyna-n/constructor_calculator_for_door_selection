import { CreateObjProps, CreateObject, CreateChildProps, Divider } from "./--createObject.js";

const createElement = (id, elementClass, child, props) => {
  return new CreateObject(id, elementClass, child, props).createOptions();
};

const elementProperty = (width, height, move, type, price) => {
  const getWheels = null; // get from db
  return new CreateObjProps(width, height, move, type, price).createProps();
};

const divider = (id, classN) => {
  return new Divider(id, classN).createDivider();
}
const createChildProps =  (a, b, c, d, glass) => {
    return new CreateChildProps(a, b, c, d, glass).createProps();
}

export { createElement, elementProperty, createChildProps, divider };
