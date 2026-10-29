function splited(
  region: Region,
  splitValue: string[],
): Record<string, string | string[]> {
  if (region === "mb") {
    const gdb = splitValue[0];
    const g1 = splitValue[1];
    const g2 = splitValue[2]?.match(/.{1,5}/g);
    const g3 = splitValue[3]?.match(/.{1,5}/g);
    const g4 = splitValue[4]?.match(/.{1,4}/g);
    const g5 = splitValue[5]?.match(/.{1,4}/g);
    const g6 = splitValue[6]?.match(/.{1,3}/g);
    const g7 = splitValue[7]?.match(/.{1,2}/g);

    return { gdb, g1, g2, g3, g4, g5, g6, g7 };
  } else {
    const g8 = splitValue[0];
    const g7 = splitValue[1];
    const g6 = splitValue.slice(2, 5);
    const g5 = splitValue[5];
    const g4 = splitValue.slice(6, 13);
    const g3 = splitValue.slice(13, 15);
    const g2 = splitValue[15];
    const g1 = splitValue[16];
    const gdb = splitValue[17];

    return { g8, g7, g6, g5, g4, g3, g2, g1, gdb };
  }
}

function parseToStr(
  region: Region,
  gdb: string,
  g1: string,
  g2: string,
  g3: string,
  g4: string,
  g5: string,
  g6: string,
  g7: string,
  g8?: string | undefined,
): string {
  if (region === "mb")
    return [
      `db: ${gdb ?? ""}`,
      `g1: ${g1 ?? ""}`,
      `g2: ${g2}`,
      `g3: ${g3}`,
      `g4: ${g4}`,
      `g5: ${g5}`,
      `g6: ${g6}`,
      `g7: ${g7}`,
    ].join("\n");
  else
    return [
      `g8: ${g8}`,
      `g7: ${g7}`,
      `g6: ${g6}`,
      `g5: ${g5}`,
      `g4: ${g4}`,
      `g3: ${g3}`,
      `g2: ${g2}`,
      `g1: ${g1}`,
      `gdb: ${gdb}`,
    ].join("\n");
}

export { parseToStr, splited };
