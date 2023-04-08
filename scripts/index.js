"use strict";
import { sendFormData, initialDataFromDb, getFormData } from "./modules/--formData.js";
import { watcher } from "./modules/--watcher.js";

const start = async () => {
  await initialDataFromDb(); // start app
  await sendFormData();
  await getFormData();
  watcher();
  
}
start();
