import { updateTextInBlock } from "./--updateTextInBlock.js";

let width;
let height;
const checkSize = (blocks, mainBoardH, mainBoardW, width1, height1) => {

  if (width1 && height1) {
    width = width1;
    height = height1;
  }

  if (blocks.length !== 0) {
    for (let i = 0; i < blocks.length; i++) {
      blocks[i].props.width = Math.round(width / blocks.length);
      blocks[i].props.height = Number(height);

      document.querySelector(`#main-element-${blocks[i].id}`).style.width =
        mainBoardW / blocks.length + "px";

      document.querySelector(`#main-element-${blocks[i].id}`).style.height =
        mainBoardH + "px";

      document.querySelector(`#bottom_arrow_info-${blocks[i].id}`).innerHTML = Math.round(width / blocks.length) + " мм";
      
      if (blocks[i].child.length !== 0) {
        for (let j = 0; j < blocks[i].child.length; j++) {
          let childBlockId = blocks[i].child[j].id;
         
             blocks[i].child[j].props.height = Math.round(height / blocks[i].child.length);
             blocks[i].child[j].props.width = blocks[i].props.width;
          
         
          if (blocks[i].child.length === 1) {
            document.querySelector(
              `#child-element-${blocks[i].child[j].id}`
            ).style.height = mainBoardH / blocks[i].child.length + "px";
          }
          else {
            document.querySelector(
              `#child-element-${blocks[i].child[j].id}`
            ).style.height = (mainBoardH / blocks[i].child.length) - ((blocks[i].child.length-1)*5)/blocks[i].child.length + "px";
          }
        }
      }
    }
  }
  updateTextInBlock(blocks);
};

export { checkSize };