import { calculate } from "./--calculate.js";
import { updateTextInBlock } from "./--updateTextInBlock.js";

let resizer;
let topSider;
let bottomSide;

let y = 0;

let topHeight = 0;
let bottomHeight = 0;

let newtopHeight;
let newbottomHeight;

let coefficient;

const horizontalDivider = (data) => {
  coefficient = data.mainBoardH / data.height;
  document
    .querySelectorAll(".main-board__divider_horizontal")
    .forEach((item) => {
      item.addEventListener("mousedown", (event) => {
        if (event.target.id !== "") {
          resizer = document.getElementById(event.target.id);
          topSider = resizer.previousElementSibling;
          bottomSide = resizer.nextElementSibling;

          mouseDownHandler(event);
        }
      });
    });

  const mouseDownHandler = (e) => {
    y = e.clientY;

    bottomHeight = Number(bottomSide.getBoundingClientRect().height);
    topHeight = Math.floor(Number(topSider.getBoundingClientRect().height));

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mouseup", mouseUpHandler);
  };

  const mouseMoveHandler = function (e) {
    const dy = e.clientY - y;

    topSider.style.userSelect = "none";
    topSider.style.pointerEvents = "none";

    bottomSide.style.userSelect = "none";
    bottomSide.style.pointerEvents = "none";

    newtopHeight = topHeight + dy;
    newbottomHeight = bottomHeight - dy;
    if (newtopHeight <= 50) {
      newtopHeight = 50;
      newbottomHeight = Number(topHeight) + Number(bottomHeight) - 50;
    } else {
      newtopHeight;
    }

    if (newbottomHeight <= 50) {
      newbottomHeight = 50;
      newtopHeight = Number(bottomHeight) + Number(topHeight) - 50;
    } else {
      newbottomHeight;
    }
    topSider.style.height = `${newtopHeight}px`;
    bottomSide.style.height = `${newbottomHeight}px`;

    for (let i = 0; i < data.blocks.length; i++) {
      if (
        data.blocks[i].id ===
        Number(resizer.parentElement.id.replace(/\D/g, ""))
      ) {
        for (let j = 0; j < data.blocks[i].child.length; j++) {
          if (`child-element-${data.blocks[i].child[j].id}` == topSider.id) {
            data.blocks[i].child[j].props.height = Math.floor(
              newtopHeight / coefficient
            );
          }
          if (`child-element-${data.blocks[i].child[j].id}` == bottomSide.id) {
            data.blocks[i].child[j].props.height = Math.floor(
              newbottomHeight / coefficient
            );
          }
        }
      }
      updateTextInBlock(data.blocks);
    }
  };

  const mouseUpHandler = function () {
    calculate();
    resizer.style.removeProperty("cursor");
    // document.body.style.removeProperty("cursor");

    topSider.style.removeProperty("user-select");
    topSider.style.removeProperty("pointer-events");

    bottomSide.style.removeProperty("user-select");
    bottomSide.style.removeProperty("pointer-events");

    document.removeEventListener("mousemove", mouseMoveHandler);
    document.removeEventListener("mouseup", mouseUpHandler);
  };
};

export { horizontalDivider };
