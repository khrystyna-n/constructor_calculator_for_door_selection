const state = {
  mainBoardW: 800,
  mainBoardH: 400,
  width: "", 
  height: "", 
  mainClass: ".container__main-board",
  blocks: [],
  dividers: [],
  profil: {
    id: "",
    type: "",
    price: "",
  },
  peregorodki: {
    id: "",
    type: "",
    price: "",
  },
  napravla: {
    id: "",
    type: "",
    price: "",
  },
  krishka: {
    id: "",
    type: "",
    price: "",
  },
  uplotnitel: {
    id: "",
    type: "",
    price: "",
  },
};

const summary = {
  napravla: {
    summary: 0,
  },
  profil: {
    arr: [],
    summary: 0,
  },
  glass: {
    price: [],
    arr: [],
    summary: 0,
  },
  wheels: {
    arr: [],
    summary: 0,
  },
  peregorodki: {
    arr: [],
    summary: 0,
  },
  result: "",
};

const summaryText = document.querySelector(".container__summary-wrapper_p");

const setGlassPrice = (data) => {
  summary.glass.price.push(data) 
}

const profilCalc = () => {
  const { blocks } = state;

  summary.profil.summary = 0;
  summary.profil.arr.splice(0, summary.profil.arr.length);

  blocks.forEach((item) => {
    let doorWidth = item.props.width;
    let doorHeight = item.props.height;
    let profilSum = ((doorWidth * doorHeight * 2) / 1000) * state.profil.price; // (1000*2235)*2)/1000)*1200 = 7764 тенге
    summary.profil.arr.push(profilSum);
  });
  const profSum = summary.profil.arr.reduce(
    (total, amount) => total + amount,
    0
  );

  summary.profil.summary = profSum;
};

const peregorodki = () => {
  const { blocks } = state;
  summary.peregorodki.summary = 0;

  let sum = 0;

  blocks.forEach((item) => {
    if (item.child.length >= 2) {
      let dividerCount = item.child.length - 1;
      let width = item.props.width;
      sum += (width / 1000) * dividerCount * state.peregorodki.price; // 1000* 800 = 800
    }
  });

  summary.peregorodki.summary = sum;
};

const glassCalc = () => {
  const { blocks } = state;
  
  //calcultate profile all
  summary.glass.summary = 0;
  summary.glass.arr.splice(0, summary.glass.arr.length);
  
  blocks.forEach((mainBlock) => {
    mainBlock.child.forEach((item) => {
      let glassWidth = item.props.width + Number(6.5.toFixed(2));
      let glassHeight = item.props.height + Number(6.5.toFixed(2));
      let glassType = Number(item.props.glass.replace(/\D/g, ""));
      for(let glass of summary.glass.price) { 
        if (glass.id === glassType) {
          let glassSum = ((glassWidth/1000) * (glassHeight/1000) * glass.price_client) //(ш/1000)*(в/1000) = м2 Формула цены стекла м2*цену = цена 
          let uplotnitel = ((glassWidth/1000) * (glassHeight/1000) * state.uplotnitel.price)
          summary.glass.arr.push(Number(glassSum.toFixed(2)), Number(uplotnitel.toFixed(2)))
          
        }
      }
    })
  })
  const finalSum = summary.glass.arr.reduce((accum, currentV) => accum + currentV, 0);  
  summary.glass.summary = finalSum;
}

const napravlaCalc = () => {
  const { blocks, napravla, width, krishka } = state;
  summary.napravla.summary = 0;
  if (blocks.length > 0) {
    if (napravla.id === 1 || napravla.type === 'Сверху') {
        summary.napravla.summary = ((width / 1000) * napravla.price) + (((width / 1000) * krishka.price) * 2);
        return;
    }
    if (napravla.id === 2 || napravla.type === 'Снизу') {
      summary.napravla.summary = ((width / 1000) * napravla.price) + (((width / 1000) * krishka.price) * 2);
      return;
    }
    if (napravla.id === 3 || napravla.type === 'Сверху и снизу') {
      summary.napravla.summary = (((width / 1000) * napravla.price) * 2) + (((width / 1000) * krishka.price) * 4);
      return
    }  
  } else {
    summary.napravla.summary = 0;
  }
};

const rolikCalc = () => {
  const { blocks } = state;
  summary.wheels.summary = 0;
  summary.wheels.arr.splice(0, summary.wheels.arr.length);

  blocks.forEach((item) => {
    let rolikPrice = item.props.wheels.price; 
    summary.wheels.arr.push(rolikPrice);
  });
  const finalSum = summary.wheels.arr.reduce(
    (accum, currentV) => accum + currentV,
    0
  );
  summary.wheels.summary = finalSum;
};


const calculate = () => {
  profilCalc();
  peregorodki();
  glassCalc();
  napravlaCalc();
  rolikCalc();

  summary.result =
    summary.profil.summary +
    summary.peregorodki.summary +
    summary.glass.summary +
    summary.napravla.summary +
    summary.wheels.summary;

  summaryText.textContent = `${summary.result.toFixed(2)} тенге`;
};

export default state;
export { calculate, setGlassPrice };
