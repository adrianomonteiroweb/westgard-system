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
    DP: 0
  },
  nivel2: {
    nivel2: "",
    batchNumber: 0,
    media: 0,
    DP: 0
  }
};

export const initialStage2Results = {
  nivel1: {
    s1less: (initialStage2.nivel1.media - initialStage2.nivel1.DP) / initialStage2.nivel1.media,
    s2less: (initialStage2.nivel1.media - (2 * initialStage2.nivel1.DP)) / initialStage2.nivel1.media,
    s3less: (initialStage2.nivel1.media - (3 * initialStage2.nivel1.DP)) / initialStage2.nivel1.media,
    s1bigger: (initialStage2.nivel1.media + initialStage2.nivel1.DP) / initialStage2.nivel1.media,
    s2bigger: (initialStage2.nivel1.media + (2 * initialStage2.nivel1.DP)) / initialStage2.nivel1.media,
    s3bigger: (initialStage2.nivel1.media + (3 * initialStage2.nivel1.DP)) / initialStage2.nivel1.media
  },
  nivel2: {
    s1less: (initialStage2.nivel2.media - initialStage2.nivel2.DP) / initialStage2.nivel2.media,
    s2less: (initialStage2.nivel2.media - (2 * initialStage2.nivel2.DP)) / initialStage2.nivel2.media,
    s3less: (initialStage2.nivel2.media - (3 * initialStage2.nivel2.DP)) / initialStage2.nivel2.media,
    s2bigger: (initialStage2.nivel2.media + initialStage2.nivel2.DP) / initialStage2.nivel2.media,
    s2bigger: (initialStage2.nivel2.media + (2 * initialStage2.nivel2.DP)) / initialStage2.nivel2.media,
    s3bigger: (initialStage2.nivel2.media + (3 * initialStage2.nivel2.DP)) / initialStage2.nivel2.media
  }
};

export const initialStage3 = [];