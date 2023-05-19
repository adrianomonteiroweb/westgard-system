export const emptyInputs = (inputArrayOfIDs) => 
{
  inputArrayOfIDs.map((ID) => document.querySelector(`#${ID}`).value = "");
};

export const getValuesOfInputs = (inputArrayOfIDs) => 
{
  let values = {};

  inputArrayOfIDs.map((ID, i) => values[i] = document.querySelector(`#${ID}`).value);

  return values;
};

export const setValuesOfInputs = (inputArrayOfIDs, arrayOfValues) => 
{
  inputArrayOfIDs.map((ID, i) => document
    .querySelector(`#${ID}`).value = arrayOfValues[i]);
};

export const persistDataOnLocalStorage = (key, data) => {
  localStorage.setItem(`${key}`, JSON.stringify(data));
};

export const stage2ResultsFunction = (stage2) => ({
  nivel1: {
    s1less: (Number(stage2.nivel1.media) - Number(stage2.nivel1.DP)) / Number(stage2.nivel1.media),
    s2less: (Number(stage2.nivel1.media) - (2 * Number(stage2.nivel1.DP))) / Number(stage2.nivel1.media),
    s3less: (Number(stage2.nivel1.media) - (3 * Number(stage2.nivel1.DP))) / Number(stage2.nivel1.media),
    s1bigger: (Number(stage2.nivel1.media) + Number(stage2.nivel1.DP)) / Number(stage2.nivel1.media),
    s2bigger: (Number(stage2.nivel1.media) + (2 * Number(stage2.nivel1.DP))) / Number(stage2.nivel1.media),
    s3bigger: (Number(stage2.nivel1.media) + (3 * Number(stage2.nivel1.DP))) / Number(stage2.nivel1.media)
  },
  nivel2: {
    s1less: (Number(stage2.nivel2.media) - Number(stage2.nivel2.DP)) / Number(stage2.nivel2.media),
    s2less: (Number(stage2.nivel2.media) - (2 * Number(stage2.nivel2.DP))) / Number(stage2.nivel2.media),
    s3less: (Number(stage2.nivel2.media) - (3 * Number(stage2.nivel2.DP))) / Number(stage2.nivel2.media),
    s2bigger: (Number(stage2.nivel2.media) + Number(stage2.nivel2.DP)) / Number(stage2.nivel2.media),
    s2bigger: (Number(stage2.nivel2.media) + (2 * Number(stage2.nivel2.DP))) / Number(stage2.nivel2.media),
    s3bigger: (Number(stage2.nivel2.media) + (3 * Number(stage2.nivel2.DP))) / Number(stage2.nivel2.media)
  },
  nivel3: {
    s1less: (Number(stage2.nivel3.media) - Number(stage2.nivel3.DP)) / Number(stage2.nivel3.media),
    s2less: (Number(stage2.nivel3.media) - (2 * Number(stage2.nivel3.DP))) / Number(stage2.nivel3.media),
    s3less: (Number(stage2.nivel3.media) - (3 * Number(stage2.nivel3.DP))) / Number(stage2.nivel3.media),
    s2bigger: (Number(stage2.nivel3.media) + Number(stage2.nivel3.DP)) / Number(stage2.nivel3.media),
    s2bigger: (Number(stage2.nivel3.media) + (2 * Number(stage2.nivel3.DP))) / Number(stage2.nivel3.media),
    s3bigger: (Number(stage2.nivel3.media) + (3 * Number(stage2.nivel3.DP))) / Number(stage2.nivel3.media)
  }
});

export const checksShuntedRule = (rules, n1, n2, n3) => {
  let nivel1 = "Normal";
  let nivel2 = "Normal";
  let nivel3 = "Normal";

  // Nível 1 - lower direction
  if (n1 <= rules.nivel1.s1less && n1 > rules.nivel1.s2less) nivel1 = "-1s1";
  if (n1 <= rules.nivel1.s2less && n1 > rules.nivel1.s3less) nivel1 = "-1s2";
  if (n1 <= rules.nivel1.s3less) nivel1 = "-1s3";
  // Nível 1 - Greater direction
  if (n1 >= rules.nivel1.s1bigger && n1 < rules.nivel1.s2bigger) nivel1 = "1s1";
  if (n1 >= rules.nivel1.s2bigger && n1 < rules.nivel1.s3bigger) nivel1 = "1s2";
  if (n1 >= rules.nivel1.s3bigger) nivel1 = "1s3";

  // Nível 2
  if (n2 <= rules.nivel2.s1less && n2 > rules.nivel2.s2less) nivel2 = "-1s1";
  if (n2 <= rules.nivel2.s2less && n2 > rules.nivel2.s3less) nivel2 = "-1s2";
  if (n2 <= rules.nivel2.s3less) nivel2 = "-1s3";
  // Nível 2 - Greater direction
  if (n2 >= rules.nivel2.s1bigger && n2 < rules.nivel2.s2bigger) nivel2 = "1s1";
  if (n2 >= rules.nivel2.s2bigger && n2 < rules.nivel2.s3bigger) nivel2 = "1s2";
  if (n2 >= rules.nivel2.s3bigger) nivel2 = "1s3";

  // switch (nivel1, nivel2) {
  // case "-1s1", "-1s1":
  //   return "2-s1";
  // case "-1s2", "-1s2":
  //   return "2-s2";
  // case "-1s3", "-1s3":
  //   return "2-s3";
  // case "1s1", "1s1":
  //   return "2-s1";
  // case "1s2", "1s2":
  //   return "2-s2";
  // case "1s3", "1s3":
  //   return "2-s3";
  // }

  return nivel1;
};

export const shuntedRuleResult = (points, stage2,  checksShuntedRule, rules) => {
  let results = {};

  points.map(({ nivel1, nivel2 }, index) => {
    const result = checksShuntedRule(rules, Number(nivel1) / stage2.nivel1.media, Number(nivel2) / stage2.nivel2.media);

    if (result) results[index + 1] = result;
  });
  
  return results;
};

export const stdevFunc = (arrayOfObjects, nivel, limit = 10) => {
  const sum = arrayOfObjects
    .slice(0, limit)
    .reduce((a, b) => a + Number(b[nivel]), 0);

  const media = sum / limit;

  const diff = arrayOfObjects.map((obj) => Math.pow(Number(obj[nivel]) - media, 2));

  const mediaDiff = diff
    .reduce((a, b) => a + b, 0) / 10;

  const stdev = Math.sqrt(mediaDiff);

  return stdev;
};