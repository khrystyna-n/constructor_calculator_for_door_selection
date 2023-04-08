import { createGlass } from "./--createVerticalLogic.js";
import { checkSize } from "./--checkSize.js";
import { calculate } from "./--calculate.js";
import { setGlassPrice } from "./--calculate.js";

import state from './--calculate.js';

const heightElem = document.querySelector("#height");
const widthElem = document.querySelector("#width");
const napravlaElem = document.querySelector("#napravla");
const peregorodkaElem = document.querySelector("#peregorodki");
const profilElem = document.querySelector("#profil");
const krishkaElem = document.querySelector("#krishka");
const glassBlock = document.querySelector("#steklo");
const dragElemBlock = document.querySelector(".header__dragelem-block");
const form = document.querySelector("#form");
const mainBoard = document.querySelector(".container__main-board");

const getId = (el) => {
  return el.id;
};

[napravlaElem, peregorodkaElem, profilElem, krishkaElem].forEach((item) => {
  item.disabled = true;
  item.style.color = "rgb(228, 228, 228)";
});
glassBlock.classList.add("disabledblock");
dragElemBlock.classList.add("disabledblock");

const showHtmlOptions = (object, objName, elem, option) => {
  object[objName].forEach((item) => {
    option += `<option id="${item.id}"value="${item.name}">${item.name}</option>`;
    elem.innerHTML = `${option}`;
  });
};

const getFormData = async () => {
  [heightElem, widthElem].forEach((element) => {
    element.addEventListener("change", () => {
      if (
        heightElem.value < 0 ||
        heightElem.value == "-00" ||
        heightElem.value == "-0"
      ) {
        heightElem.value = 0;
      }
      if (
        widthElem.value < 0 ||
        widthElem.value == "-00" ||
        widthElem.value == "-0"
      ) {
        widthElem.value = 0;
      } 
      if (widthElem.value > 0 && heightElem.value > 0) {
        [napravlaElem, peregorodkaElem, profilElem, krishkaElem].forEach(
        (item) => {
          item.disabled = false;
          item.style.color = "black";
        }
        );
        glassBlock.classList.remove("disabledblock");
        dragElemBlock.classList.remove("disabledblock");
      }
    });
  });

  try {
    const response = await fetch("http://localhost:3333/data");
    const data = await response.json();
    data.forEach((object) => {
      let objName = Object.keys(object)[0];
      if (objName === getId(napravlaElem)) {
        let option = "";
        showHtmlOptions(object, objName, napravlaElem, option);
      }
      if (objName === getId(peregorodkaElem)) {
        let option3 = "";
        showHtmlOptions(object, objName, peregorodkaElem, option3);
      }
      if (objName === getId(profilElem)) {
        let option4 = "";
        showHtmlOptions(object, objName, profilElem, option4);
      }
      if (objName === getId(krishkaElem)) {
        let option5 = "";
        showHtmlOptions(object, objName, krishkaElem, option5);
      }
      if (objName === getId(glassBlock)) {
        object[objName].forEach((item, index) => {
          createGlass(glassBlock, index + 1, item.image);
          setGlassPrice(item);
        });
        glassBlock.addEventListener("dragstart", (e) => {
          const glassData = `${e.target.src}, ${e.target.parentElement.id}`;
          e.dataTransfer.setData("text", glassData);
        });
      }
    });
  } catch (error) {
  }
};

const sendFormData = async () => {
  form.addEventListener("change", async function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const formDataObj = Object.fromEntries(formData);
    if (state.width !== formDataObj.width || state.height !== formDataObj.height) {
      state.width = formDataObj.width;
      state.height = formDataObj.height;
      document.querySelector(`.container__arrow-horizontal_size-info`).innerHTML =
        state.width + " мм";
      document.querySelector(`.container__arrow-vertical_size-info`).innerHTML =
        state.height + " мм";
      
    checkSize(
      state.blocks,
      state.mainBoardH,
      state.mainBoardW,
      state.width,
      state.height
    );
    }
    
    const response = await fetch("http://localhost:3333/data");
    const data = await response.json();
    data.forEach((object) => {
      let objName = Object.keys(object)[0];
      if (objName === e.target.id) {
        if (state.blocks.length !== 0) {
          if (e.target.id === "napravla") {
            switch (e.target.value) {
              case "Сверху":
                mainBoard.classList.add('top-border');
                mainBoard.classList.remove('bottom-border');
                calculate()
                break;
              case "Снизу":
                mainBoard.classList.remove('top-border');
                mainBoard.classList.add('bottom-border');
                calculate()
                break;
              case "Сверху и снизу":
                mainBoard.classList.add('top-border', 'bottom-border');
                // mainBoard.classList.add('bottom-border');
                calculate()
                break;
              default:
                mainBoard.style.borderTop = "4px solid blue";
            }
          }

        }
        object[objName].forEach((item) => {
          if (item.name === e.target.value) {
            state[objName] = {
              id: item.id,
              type: item.name,
              price: item.price_client,
            };
          }
        });
      }
    });
    if (state.blocks.length !== 0) {
      calculate();
    }
  });
};

const initialDataFromDb = async () => {
  fetch("http://localhost:3333/data")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((object) => {
        let objName = Object.keys(object)[0];
        state[objName] = {
          id: object[objName][0].id,
          type: object[objName][0].name,
          price: object[objName][0].price_client,
        };
      });
      if (state.blocks.length !== 0) {
        calculate();
      }
    });
};

export { sendFormData, initialDataFromDb, getFormData };
