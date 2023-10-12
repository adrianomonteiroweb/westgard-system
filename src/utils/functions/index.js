export const selectMonthName = {
  1: "Janeiro",
  2: "Fevereiro",
  3: "Março",
  4: "Abril",
  5: "Maio",
  6: "Junho",
  7: "Julho",
  8: "Agosto",
  9: "Setembro",
  10: "Outubro",
  11: "Novembro",
  12: "Dezembro",
};

export const sortByIdFromLargest = (a, b) => b.id - a.id;
export const sortByIdFromSmallest = (a, b) => a.id - b.id;

export const mediascalculate = (arrayOfObjects) => {
  const first10Days = arrayOfObjects.slice(0, 10);

  let mediaAnalysis1 = 0;
  let mediaAnalysis2 = 0;
  let mediaAnalysis3 = 0;

  for (const day of first10Days) {
    mediaAnalysis1 += day.analysis1;
    mediaAnalysis2 += day.analysis2;
    mediaAnalysis3 += day.analysis3;
  }

  mediaAnalysis1 /= first10Days.length;
  mediaAnalysis2 /= first10Days.length;
  mediaAnalysis3 /= first10Days.length;

  return {
    mediaAnalysis1,
    mediaAnalysis2,
    mediaAnalysis3,
  };
};

export const mediasTotalcalculate = (arrayOfObjects) => {
  let mediaAnalysis1 = 0;
  let mediaAnalysis2 = 0;
  let mediaAnalysis3 = 0;

  for (const day of arrayOfObjects) {
    mediaAnalysis1 += day.analysis1;
    mediaAnalysis2 += day.analysis2;
    mediaAnalysis3 += day.analysis3;
  }

  mediaAnalysis1 /= arrayOfObjects.length;
  mediaAnalysis2 /= arrayOfObjects.length;
  mediaAnalysis3 /= arrayOfObjects.length;

  return {
    mediaAnalysis1,
    mediaAnalysis2,
    mediaAnalysis3,
  };
};

export const standardDeviationCalculate = (arrayOfObjects) => {
  const first10Days = arrayOfObjects.slice(0, 10);

  let sumAnalysis1 = 0;
  let sumAnalysis2 = 0;
  let sumAnalysis3 = 0;

  for (const day of first10Days) {
    sumAnalysis1 += day.analysis1;
    sumAnalysis2 += day.analysis2;
    sumAnalysis3 += day.analysis3;
  }

  const mediaAnalysis1 = sumAnalysis1 / first10Days.length;
  const mediaAnalysis2 = sumAnalysis2 / first10Days.length;
  const mediaAnalysis3 = sumAnalysis3 / first10Days.length;

  let sumSquaresDifAnalysis1 = 0;
  let sumSquaresDifAnalysis2 = 0;
  let sumSquaresDifAnalysis3 = 0;

  for (const day of first10Days) {
    sumSquaresDifAnalysis1 += Math.pow(day.analysis1 - mediaAnalysis1, 2);
    sumSquaresDifAnalysis2 += Math.pow(day.analysis2 - mediaAnalysis2, 2);
    sumSquaresDifAnalysis3 += Math.pow(day.analysis3 - mediaAnalysis3, 2);
  }

  const standardDeviationAnalysis1 = Math.sqrt(
    sumSquaresDifAnalysis1 / first10Days.length
  );
  const standardDeviationAnalysis2 = Math.sqrt(
    sumSquaresDifAnalysis2 / first10Days.length
  );
  const standardDeviationAnalysis3 = Math.sqrt(
    sumSquaresDifAnalysis3 / first10Days.length
  );

  return {
    standardDeviationAnalysis1,
    standardDeviationAnalysis2,
    standardDeviationAnalysis3,
  };
};

export const standardDeviationTotalCalculate = (arrayOfObjects) => {
  let sumAnalysis1 = 0;
  let sumAnalysis2 = 0;
  let sumAnalysis3 = 0;

  for (const day of arrayOfObjects) {
    sumAnalysis1 += day.analysis1;
    sumAnalysis2 += day.analysis2;
    sumAnalysis3 += day.analysis3;
  }

  const mediaAnalysis1 = sumAnalysis1 / arrayOfObjects.length;
  const mediaAnalysis2 = sumAnalysis2 / arrayOfObjects.length;
  const mediaAnalysis3 = sumAnalysis3 / arrayOfObjects.length;

  let sumSquaresDifAnalysis1 = 0;
  let sumSquaresDifAnalysis2 = 0;
  let sumSquaresDifAnalysis3 = 0;

  for (const day of arrayOfObjects) {
    sumSquaresDifAnalysis1 += Math.pow(day.analysis1 - mediaAnalysis1, 2);
    sumSquaresDifAnalysis2 += Math.pow(day.analysis2 - mediaAnalysis2, 2);
    sumSquaresDifAnalysis3 += Math.pow(day.analysis3 - mediaAnalysis3, 2);
  }

  const standardDeviationAnalysis1 = Math.sqrt(
    sumSquaresDifAnalysis1 / arrayOfObjects.length
  );
  const standardDeviationAnalysis2 = Math.sqrt(
    sumSquaresDifAnalysis2 / arrayOfObjects.length
  );
  const standardDeviationAnalysis3 = Math.sqrt(
    sumSquaresDifAnalysis3 / arrayOfObjects.length
  );

  return {
    standardDeviationAnalysis1,
    standardDeviationAnalysis2,
    standardDeviationAnalysis3,
  };
};
