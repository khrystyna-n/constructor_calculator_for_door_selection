const updateTextInBlock = (blocks) => {
  let acc = 1;

  for (let i = 0; i < blocks.length; i++) {
    for (let j = 0; j < blocks[i].child.length; j++) {
      let counter_elem = document.querySelector(
        `#child-element-${blocks[i].child[j].id} > div > span.main-board__counter_elem`
      );

      let counter_size = document.querySelector(
        `#child-element-${blocks[i].child[j].id} >  div > span.main-board__counter_size`
      );

      counter_elem.textContent = `${acc}`;
      counter_size.textContent = `${blocks[i].child[j].props.width}x${blocks[i].child[j].props.height}`;
      acc++;
    }
  }
};

export { updateTextInBlock };
