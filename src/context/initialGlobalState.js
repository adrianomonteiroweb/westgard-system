export const initialStage1 = {
  analiticSystem: "",
  test: "",
  unit: "",
  method: "",
  period: ""
};

export const initialStage2 = {
  nivel1: {
    nivel1: "",
    batchNumber: 0,
    media: 0,
    DP: 0,
    s1less: (media - DP) / media,
    s2less: (media - (2 * DP)) / media,
    s3less: (media - (3 * DP)) / media,
    s1bigger: (media + DP) / media,
    s2bigger: (media + (2 * DP)) / media,
    s3bigger: (media + (3 * DP)) / media
  },
  nivel2: {
    nivel2: "",
    batchNumber: 0,
    media: 0,
    DP: 0,
    s1less: (media - DP) / media,
    s2less: (media - (2 * DP)) / media,
    s3less: (media - (3 * DP)) / media,
    s1bigger: (media + DP) / media,
    s2bigger: (media + (2 * DP)) / media,
    s3bigger: (media + (3 * DP)) / media
  }
};

export const initialStage3 = [];