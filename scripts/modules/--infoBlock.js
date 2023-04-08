import { calculate } from "./--calculate.js";
import state from "./--calculate.js";

const infoBlock = (e) => {
  let formActive = e.target.nextElementSibling;
  formActive.classList.toggle("active");
  

  const parentElementId = e.target.parentNode.id.slice(-1);
  const id = e.target.nextElementSibling.id;
  const form = document.querySelector(`#${id} > form`);
  form.addEventListener("change", (e) => {
    let select = document.querySelector(`#${form.id} > select`);
    if (e.target.id === "move") {
      select.disabled = false;
    } else if (e.target.id === "notmove") {
      select.disabled = true;
    }

    state.blocks.map((block) => {
      if (block.id == parentElementId) {
        if (e.target.value === "notmove") {
          block.props["wheels"] = {
            type: "",
            price: 0,
          };
          calculate();
        } else {
          let name = e.target.value == "move" ? "wheels" : e.target.name;
          let value =
            e.target.value == "move"
              ? select[select.selectedIndex].value
              : e.target.value;

          fetch("http://localhost:3333/data")
            .then((response) => response.json())
            .then((data) => {
              data.forEach((object) => {
                let objName = Object.keys(object)[0];
                if (objName === "roliki") {
                  object[objName].forEach((item) => {
                    if (item.name === value) {
                      block.props[name] = {
                        type: value,
                        price: item.price_client,
                      };
                    }
                  });
                }
              });
              calculate();
            });
        }
      }
    });
  });
};

export { infoBlock };
