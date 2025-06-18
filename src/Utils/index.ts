// ---- Utils ----
export const parseNumber = (val: any, def = 0) => {
    const n = Number(val);
    return isNaN(n) ? def : n;
  };