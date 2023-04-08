import { updateTextInBlock } from "./--updateTextInBlock.js";
import { calculate } from "./--calculate.js";
import state from "./--calculate.js";

let resizer;
let leftSide;
let rightSide;

let x = 0;

let leftWidth = 0;
let rightWidth = 0;

let newLeftWidth;
let newRightWidth;

let coefficient;

const verticalDivider = () => {
  coefficient = state.mainBoardW / state.width;
  document.querySelectorAll(".main-board__divider_vertical").forEach((item) => {
    item.addEventListener("mousedown", (event) => {
      if (event.target.id !== "") {
        resizer = document.getElementById(event.target.id);
        leftSide = resizer.previousElementSibling;
        rightSide = resizer.nextElementSibling;

        mouseDownHandler(event);
      }
    });
  });

  const mouseDownHandler = (e) => {
    x = e.clientX;

    rightWidth = rightSide.getBoundingClientRect().width + 3.5;
    leftWidth = leftSide.getBoundingClientRect().width + 3.5;

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    const dx = e.clientX - x;

    document.body.style.cursor = "col-resize";

    leftSide.style.userSelect = "none";
    leftSide.style.pointerEvents = "none";

    rightSide.style.userSelect = "none";
    rightSide.style.pointerEvents = "none";

    newLeftWidth = leftWidth + dx;
    newRightWidth = rightWidth - dx;

    if (newLeftWidth <= 50) {
      newLeftWidth = 50;
      newRightWidth = Number(leftWidth) + Number(rightWidth) - 50;
    } else {
      newLeftWidth;
    }

    if (newRightWidth <= 50) {
      newRightWidth = 50;
      newLeftWidth = Number(rightWidth) + Number(leftWidth) - 50;
    } else {
      newRightWidth;
    }
    leftSide.style.width = `${newLeftWidth}px`;
    rightSide.style.width = `${newRightWidth}px`;

    let left_counter_size = document.querySelector(
      `#${leftSide.id} >  div > span`
    );
    let right_counter_size = document.querySelector(
      `#${rightSide.id} >  div > span`
    );
    
    for (let i = 0; i < state.blocks.length; i++) {
      if (state.blocks[i].id == leftSide.id.replace(/\D/g, "")) {
        left_counter_size.textContent = `${Math.floor(
          newLeftWidth / coefficient
        )}мм`;
         
      }
      if (state.blocks[i].id == rightSide.id.replace(/\D/g, "")) {
        right_counter_size.textContent = `${Math.ceil(
          newRightWidth / coefficient
        )}мм`;
 
      }
    }
  };

  const mouseUpHandler = function () {
    for (let i = 0; i < state.blocks.length; i++) {
      for (let j = 0; j < state.blocks[i].child.length; j++) {
        if (`main-element-${state.blocks[i].id}` == leftSide.id) {
          state.blocks[i].props.width = Math.floor(newLeftWidth / coefficient);
          state.blocks[i].child[j].props.width = Math.floor(
            newLeftWidth / coefficient
          );
        }
        if (`main-element-${state.blocks[i].id}` == rightSide.id) {
          state.blocks[i].props.width = Math.ceil(newRightWidth / coefficient);
          state.blocks[i].child[j].props.width = Math.ceil(
            newRightWidth / coefficient
          );
        }
      }
      updateTextInBlock(state.blocks);
      calculate();
    }

    resizer.style.removeProperty("cursor");
    document.body.style.removeProperty("cursor");

    leftSide.style.removeProperty("user-select");
    leftSide.style.removeProperty("pointer-events");

    rightSide.style.removeProperty("user-select");
    rightSide.style.removeProperty("pointer-events");

    document.removeEventListener("mousedown", verticalDivider);
    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };
};

export { verticalDivider };
