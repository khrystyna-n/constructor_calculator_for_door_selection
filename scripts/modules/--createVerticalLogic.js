import { checkId } from "./--idGenerator.js";
import {
  createElement,
  elementProperty,
  createChildProps,
  divider,
} from "./--createElements.js";
import { eventHandler } from "./--eventHandler.js";
import { infoBlock } from "./--infoBlock.js";
import state from './--calculate.js';

/**
 * DOM Element constructor helper class.
 *
 * Usage:
 * -------
 * var newDiv = Element.create('div');
 * var newDiv = Element.create('div', {text: "Hi"});
 * var newDiv = Element.create('div', {text: "Hi "}, [
 *   Element.create('span', {style: 'color: #CC0000', html:"<b>you</b>"}, [
 *     // Infinitely chainable
 *   ])
 * ]);
 *
 */
(function (window) {
  const document = window.document;

  const _Element = window.Element || {};

  _Element.create = function (tag, props, children) {
    const el = document.createElement(tag);
    if (props) {
      _Element.setAttributes(el, props);
    }
    if (children) {
      for (let i = 0, l = children.length; i < l; i += 1) {
        el.appendChild(children[i]);
      }
    }
    return el;
  };

  _Element.setAttributes = function (el, props) {
    for (let prop in props) {
      if (props.hasOwnProperty(prop)) {
        let name = _Element.attributeNameMap[prop],
          value = props[prop];
        if (value) {
          if (name) {
            el[name] = value;
          } else {
            el.setAttribute(prop, value);
          }
        }
      }
    }
  };

  _Element.attributeNameMap = {
    className: "className",
    for: "htmlFor",
    html: "innerHTML",
    text: "textContent",
    checked: "checked",
    disabled: "disabled",
    selected: "selected",
  };

  window.Element = _Element;
})(window);
let toggle = false;
let glassDefault = '';
let glassDefaultId = '';

const createGlass = (container, id, url) => {
  if (!toggle) {
    glassDefault = url;
    glassDefaultId = 'type-'+id;
    toggle = !toggle;
  }
  return container.appendChild(
    Element.create("li", {
      id: `type-${id}`,
      class: "glass__dnd-element draggable",
      draggable: true,
      "data-drag": "glass",
    }, [
      Element.create('img', {src: `${url}`})
    ])
  );
};

const addSelectOptions = (select, id, item) => {
  return select.appendChild(
    Element.create("option", {
      id: `${id}`,
      class: "rolikOption",
      type: "",
      value: `${item.name}`,
      name: "",
      text: `${item.name}`,
    })
  );
};

const createDivider = (container, id, classN, direction) => {
  return container.appendChild(
    Element.create(
      "div",
      {
        id: `${
          direction === "vertical" ? `divider-v-${id}` : `divider-h-${id}`
        }`,
        class: `${classN}`,
        "data-name": "divider",
        "data-direction": `${direction}`,
      },
      [
        Element.create("div", { class: "main-board__controller" }, [
          Element.create("span", {
            class: `main-board__controller_delete ${
              direction === "vertical" ? "left" : "top"
            }`,
            "data-name": `${direction === "vertical" ? "left" : "top"}`,
          }),
          Element.create("span", {
            class: `main-board__controller_delete ${
              direction === "vertical" ? "right" : "bottom"
            }`,
            "data-name": `${direction === "vertical" ? "right" : "bottom"}`,
          }),
        ]),
      ]
    )
  );
};

const verticalBlock = (container, id, classN) => {
  return container.appendChild(
    Element.create("div", { id: `main-element-${id}`, class: `${classN}` }, [
      Element.create(
        "div",
        {
          id: `bottom_arrow-${id}`,
          class: "bottom_arrow",
        },
        [
          Element.create("span", {
            id: `bottom_arrow_info-${id}`,
            class: `bottom_arrow_info`,
          }),
          Element.create("span", {
            id: `bottom_arrow_left-${id}`,
            class: `bottom_arrow_left`,
          }),
          Element.create("span", {
            id: `bottom_arrow_right-${id}`,
            class: `bottom_arrow_right`,
          }),
        ]
      ),
      Element.create("div", {
        id: `fa-element-${id}`,
        class: "fa-rolik",
        text: "?",
      }),
      Element.create(
        "div",
        {
          id: `form-element-${id}`,
          class: "form-block",
        },
        [
          Element.create(
            "form",
            {
              id: `form-${id}`,
              class: "form",
            },
            [
              Element.create("input", {
                id: "move",
                class: "",
                type: "radio",
                'data-state': 'move',
                name: "move",
                checked: true,
                value:'move'
              }),
              Element.create("label", {
                for: "move",
                text: "Двигающиеся",
              }),
              Element.create("input", {
                id: "notmove",
                class: "",
                type: "radio",
                'data-state': 'notmove',
                name: "move",
                value:'notmove'
              }),
              Element.create("label", {
                for: "notmove",
                text: "Стационар",
              }),
              Element.create("select", {
                id: "",
                class: "rolikSelect",
                type: "select",
                value: "",
                name: "wheels",
              }),
            ]
          ),
        ]
      ),
    ])
  );
};

const createChild = (id, classN) => {
  return Element.create(
    "div",
    {
      id: `child-element-${id}`,
      class: `${classN}`,
      style: `background-image: url("${glassDefault}")`,
    },
    [
      Element.create("div", { class: "main-board__counter_block" }, [
        Element.create("span", {
          class: "main-board__counter_dropzone",
        }),
        Element.create("span", {
          class: "main-board__counter_elem",
          text: `${id % 10}`,
        }),
        Element.create("span", {
          class: "main-board__counter_size",
          text: "200x200",
        }),
      ]),
    ]
  );
};

const addBlock = () => {
  const mainContainer = document.querySelector(`${state.mainClass}`),
    elementClass = "main-board__elem",
    { blocks } = state;

  let id = checkId(blocks);
  blocks.push(
    createElement(id, elementClass, [], elementProperty("", "", true, state.roliki.type, state.roliki.price))
  );
  verticalBlock(mainContainer, id, elementClass);

  document.querySelector(`#fa-element-${id}`).addEventListener("click", (e) => {
    infoBlock(e)
  });

  const rolikSelect = document.querySelector(
    `#main-element-${id} > div > form > select`
  );
  fetch("http://localhost:3333/data")
    .then((response) => response.json())
    .then((data) =>
      data.forEach((object) => {
        let objName = Object.keys(object)[0];
        if (objName === "roliki") {
          object[objName].forEach((item) => {
            addSelectOptions(rolikSelect, id, item);
          });
        }
      })
    );
  addChild(id);
};

const addDivider = () => {
  const { mainClass, dividers, blocks, mainBoardH, mainBoardW } = state;
  const mainContainer = document.querySelector(`${mainClass}`),
    dividerClass = "main-board__divider_vertical",
    direction = "vertical";

  let id = checkId(dividers);
  dividers.push(divider(id, dividerClass));

  createDivider(mainContainer, id, dividerClass, direction);

  document.querySelector(`#divider-v-${id}`).addEventListener("click", (e) => {
    eventHandler(e);
  });
};

const addHorizontalDivider = (parentBlockId) => {
  const elementClass = document.querySelector(`#main-element-${parentBlockId}`),
    dividerClass = "main-board__divider_horizontal",
    { dividers, blocks, mainBoardH, mainBoardW } = state,
    direction = "horizontal";

  let id = checkId(dividers);

  dividers.push(divider(id, dividerClass));
  createDivider(elementClass, id, dividerClass, direction);
  document.querySelector(`#divider-h-${id}`).addEventListener("click", (e) => {
    eventHandler(e);
  });
};

const addChild = async (parentBlockId) => {
  const elementClass = "main-board__child-element",
    blocks = state.blocks;
  for (let searchIndex of blocks) {
    if (searchIndex.id === parentBlockId) {
      if (blocks.indexOf(searchIndex) !== -1) {
        let index = blocks.indexOf(searchIndex);
        let childLen = blocks[index].child;

        let htmlElement = document.querySelector(
          `#main-element-${parentBlockId}`
        );

        if (childLen.length === 0) {
          let id = checkId(blocks[index].child);
          let concatId = String(parentBlockId) + String(id);
          blocks[index].child.push(
            createChildProps(Number(concatId), elementClass, '', '', glassDefaultId)
          );
          htmlElement.appendChild(createChild(Number(concatId), elementClass));
        } else {
          let id = checkId(blocks[index].child);
          let concatId = id;
          blocks[index].child.push(
            createChildProps(Number(concatId), elementClass, '', '', glassDefaultId)
          );
          htmlElement.appendChild(createChild(Number(concatId), elementClass));
        }
      }
    }
  }
};

export {
  addBlock,
  addDivider,
  addHorizontalDivider,
  addChild,
  createDivider,
  createGlass,
};
