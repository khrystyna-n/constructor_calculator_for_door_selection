import { checkSize } from "./--checkSize.js";
import state from './--calculate.js';
import { calculate } from './--calculate.js';

const eventHandler = (event) => {
  const name = event.target.dataset.name,
        wrapper = event.target.parentElement.parentElement,
        dividerId = Number(event.target.parentElement.parentElement.id.slice(-1)),
        {dividers, blocks, mainBoardW, mainBoardH} = state;
        
  if (name === 'left' || name === 'right' || name === 'top' || name === 'bottom') {
    removeElement(
      dividerId,
      wrapper,
      name,
      dividers,
      blocks,
      mainBoardH,
      mainBoardW,
    );
  }
};

const removeElement = (...targ) => {
  const [
    dividerId,
    wrapper,
    name,
    dividerArr,
    blocksArr,
    mainBoardH,
    mainBoardW,
  ] = targ;
  const leftBlock = wrapper.previousSibling,
    rightBlock = wrapper.nextSibling,
    topChild = wrapper.previousSibling,
    bottomChild = wrapper.nextSibling,
    divider = wrapper,
    leftBlockId = Number(wrapper.previousSibling.id.slice(-1)),
    rightBlockId = Number(wrapper.nextSibling.id.slice(-1)),
    topChildId = Number(topChild.id.replace(/\D/g, "")),
    bottomChildId = Number(bottomChild.id.replace(/\D/g, ""));

  if ((name === "left" || name === "right") && blocksArr.length == 2) {
    leftBlock.remove();
    rightBlock.remove();
    divider.remove();
    dividerArr.splice(0, dividerArr.length);
    blocksArr.splice(0, blocksArr.length);
    document.querySelector(state.mainClass).classList.remove('top-border', 'bottom-border');
    
  }
  if (name === "left") {
    
    leftBlock.remove();
    divider.remove();
    dividerArr.filter((item, i) => {
      if (item.id === dividerId) {
        dividerArr.splice(i, 1);
      }
    });
    blocksArr.filter((item, i) => {
      if (item.id === leftBlockId) {
        blocksArr.splice(i, 1);
      }
    });
    checkSize(blocksArr, mainBoardH, mainBoardW);
  } else if (name === "right") {
    
    rightBlock.remove();
    divider.remove();
    dividerArr.filter((item, i) => {
      if (item.id === dividerId) {
        dividerArr.splice(i, 1);
      }
    });
    blocksArr.filter((item, i) => {
      if (item.id === rightBlockId) {
        blocksArr.splice(i, 1);
      }
    });
    checkSize(blocksArr, mainBoardH, mainBoardW);
    calculate();
  } else if (name === "top") {
    
    topChild.remove();
    divider.remove();
    dividerArr.filter((item, i) => {
      if (item.id === dividerId) {
        dividerArr.splice(i, 1);
      }
    });
    blocksArr.filter((item, i) => {
      for (let i = 0; i < item.child.length; i++) {
        if (item.child[i].id == topChildId) {
          item.child.splice(i, 1);
        }
      }
    });
    checkSize(blocksArr, mainBoardH, mainBoardW);
  } else {
    
    bottomChild.remove();
    divider.remove();
    dividerArr.filter((item, i) => {
      if (item.id === dividerId) {
        dividerArr.splice(i, 1);
      }
    });
    blocksArr.filter((item, i) => {
      for (let i = 0; i < item.child.length; i++) {
        if (item.child[i].id == bottomChildId) {
          item.child.splice(i, 1);
        }
      }
    });
    checkSize(blocksArr, mainBoardH, mainBoardW);
  }
  calculate();
};

export { eventHandler };
