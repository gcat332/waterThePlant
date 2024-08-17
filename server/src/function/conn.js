import { createRequire } from "module";
const require = createRequire(import.meta.url);
import { getMoonPhase } from "./moon.js";

const csvdb = require("csv-database");

const db_timer = await csvdb(
  "./db/sys_timer.csv",
  ["MONTH", "T1", "T3", "T4"],
  ",",
);

const db_moonphase = await csvdb(
  "./db/sys_moonphase.csv",
  ["MOON_PHASE", "K1", "K2"],
  ",",
);

const answer = class {
  constructor(active, timer) {
    this.active = active;
    this.timer = timer;
  }
};

const monthList = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export async function getAnswer(json) {
  let activeStatus = false;
  let timer = 0;
  let ansVar = await getTimer(monthList[json.month]);
  let ansK = await getK(getMoonPhase(json.day, json.month, json.year));
  let T2 = ansVar.T1 * ansK.K1 * ansK.K2;
  if (json.minute == "0" && json.hour == "6") {
    activeStatus = true;
    timer = ansVar.T1;
  } else if (json.minute == "0" && json.hour == "11") {
    activeStatus = true;
    timer = T2;
  } else if (json.minute == "0" && json.hour == "13") {
    activeStatus = true;
    timer = ansVar.T3;
  } else if (json.minute == "0" && json.hour == "14") {
    activeStatus = true;
    timer = ansVar.T4;
  } else {
    activeStatus = false;
    timer = 0;
  }

  let ans = new answer(activeStatus, timer);
  return ans;
}

async function getTimer(month) {
  let ans = await db_timer.get({ MONTH: month.toUpperCase() });
  return ans[0];
}
async function getK(moonPhase) {
  let ans = await db_moonphase.get({ MOON_PHASE: moonPhase });
  return ans[0];
}
