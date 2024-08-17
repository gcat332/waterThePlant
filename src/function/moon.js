export function getMoonPhase(day, month, year) {
  var phaeseList = [
    "NEWMOON_15",
    "FULLMOON_1",
    "FULLMOON_2",
    "FULLMOON_3",
    "FULLMOON_4",
    "FULLMOON_5",
    "FULLMOON_6",
    "FULLMOON_7",
    "FULLMOON_8",
    "FULLMOON_9",
    "FULLMOON_10",
    "FULLMOON_11",
    "FULLMOON_12",
    "FULLMOON_13",
    "FULLMOON_14",
    "FULLMOON_15",
    "NEWMOON_1",
    "NEWMOON_2",
    "NEWMOON_3",
    "NEWMOON_4",
    "NEWMOON_5",
    "NEWMOON_6",
    "NEWMOON_7",
    "NEWMOON_8",
    "NEWMOON_9",
    "NEWMOON_10",
    "NEWMOON_11",
    "NEWMOON_12",
    "NEWMOON_13",
    "NEWMOON_14",
  ];
  var c,
    e,
    jd,
    b = 0;
  if (month < 3) {
    year--;
    month += 12;
  }
  ++month;

  c = 365.25 * year;
  e = 30.6 * month;
  jd = c + e + day - 694039.09; //jd is total days elapsed
  jd /= 29.5305882; //divide by the moon cycle
  b = parseInt(jd); //int(jd) -> b, take integer part of jd
  jd -= b; //subtract integer part to leave fractional part of original jd
  b = Math.round(jd * 30); //scale fraction from 0-8 and round
  if (b >= 30) {
    b = 0; //0 and 30 are the same so turn 8 into 0
  }
  return phaeseList[b];
}
