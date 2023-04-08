import state from "./--calculate.js";
import { vertical, horizontal } from "./--constructorElements.js";
import { calculate } from "./--calculate.js";

const dividerElement = document.querySelectorAll(".draggable");
const mainBoardContainer = document.querySelector(".container__main-board");

const watcher = () => {
    
  dividerElement.forEach((item, i) => {
    item.addEventListener("dragstart", (e) => {
      const dividerData = [e.target.dataset.drag];
      e.dataTransfer.setData("Text", dividerData);
    });
  });

  mainBoardContainer.addEventListener("dragover", function (e) {
    e.preventDefault();
  });

  mainBoardContainer.addEventListener("dragenter", function (e) {
    if (!e.target.className.includes("arrow")) {
      e.target.classList.add("hoverBlock");
    }
  });

  mainBoardContainer.addEventListener("dragleave", function (e) {
    e.target.classList.remove("hoverBlock");
  });

  mainBoardContainer.addEventListener("drop", (e) => {
    e.target.classList.remove("hoverBlock");
    const eventData = e.dataTransfer.getData("text", e.target),
      parentId = Number(
        e.target.parentElement.parentElement.parentElement.id.slice(-1)
      ),
      blocks = state.blocks,
      children = e.target.parentElement.parentElement,
      id = eventData.split(",")[1],
      url = eventData.split(",")[0],
      elemChildId = Number(
        e.target.parentElement.parentElement.id.replace(/\D/g, "")
      );

    if (eventData === "vertical") {
      vertical(state);
    } else if (eventData === "horizontal") {
      horizontal(parentId, state);
    } else {
      if (!e.target.classList.contains("container__main-board")) {
        children.style.backgroundImage = `url(${url})`;
        blocks.forEach((mainBlock) => {
          mainBlock.child.forEach((child, i) => {
            if (child.id === elemChildId) {
              child.props.glass = id;
              calculate(state);
            }
          });
        });
      }
    }
  });
};

export { watcher };
