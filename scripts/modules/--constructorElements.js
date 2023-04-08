import { addBlock, addDivider, addChild, addHorizontalDivider } from "./--createVerticalLogic.js";
import { checkSize } from "./--checkSize.js";
import { verticalDivider } from "./--verticalDivider.js";
import { horizontalDivider } from "./--horizontalDivider.js";
import { calculate } from './--calculate.js'
import state  from './--calculate.js';

const vertical = async () => {
  if (state.blocks.length > 0 && state.blocks.length < 9) {
    addDivider(state);
    addBlock(state);
    checkSize(state.blocks, state.mainBoardH, state.mainBoardW, state.width, state.height);
  }
  if (state.blocks.length == 0 ){
    addBlock(state);
    addDivider(state);
    addBlock(state);
    checkSize(state.blocks, state.mainBoardH, state.mainBoardW, state.width, state.height);
  }
  document.querySelector(state.mainClass).classList.add('top-border');
  calculate();
  verticalDivider(state);
};

const horizontal = (parentBlockId) => {
  state.blocks.forEach((item) => {
    if (item.id === parentBlockId) {
      if (item.child.length > 0 && item.child.length < 5) {
        addHorizontalDivider(parentBlockId)
        addChild(parentBlockId);
        horizontalDivider(state);
        checkSize(state.blocks, state.mainBoardH, state.mainBoardW, state.width, state.height); 
        calculate();
      }
    }
  }) 
  
};

export { vertical, horizontal };

