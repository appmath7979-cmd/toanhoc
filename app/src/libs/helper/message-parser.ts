import type { Province } from "@/types/address.type";
import type { MessageDetail, Syntax } from "@/types/message.type";
import type { BetType } from "@/types/setting.type";

export const getBetTypeByNumberLength = (
  number: string,
  syntax: string,
): BetType => {
  const len = number.length;
  if (len === 3) {
    if (["xduoi", "xdau", "xc"].includes(syntax)) return "dd3";
    return "b3";
  }
  if (len === 4) {
    return "b4";
  }
  if (["dd", "duoi", "dau", "dd"].includes(syntax)) return "dd2";
  return "b2";
};

export const expandNumberRange = (tokens: string[]): string[] => {
  const result: string[] = [];
  let i = 0;

  while (i < tokens.length) {
    const current = tokens[i];
    const next = tokens[i + 1];
    const afterNext = tokens[i + 2];

    if (
      next &&
      (next.toLowerCase() === "k" || next === "-") &&
      afterNext &&
      /^\d+$/.test(current) &&
      /^\d+$/.test(afterNext)
    ) {
      const start = parseInt(current, 10);
      const end = parseInt(afterNext, 10);
      const padding = current.length;

      if (start <= end) {
        for (let n = start; n <= end; n++) {
          const formattedNum = String(n).padStart(padding, "0");
          if (!result.includes(formattedNum)) {
            result.push(formattedNum);
          }
        }
      }
      i += 3;
    } else if (/^\d+$/.test(current)) {
      if (!result.includes(current)) {
        result.push(current);
      }
      i += 1;
    } else {
      i += 1;
    }
  }

  return result;
};

// Hàm hỗ trợ sinh tổ hợp (dùng cho đá da2, da3,...)
const getCombinations = <T>(arr: T[], k: number): T[][] => {
  if (k === 0) return [[]];
  if (arr.length === 0) return [];
  const [head, ...tail] = arr;
  const withHead = getCombinations(tail, k - 1).map((c) => [head, ...c]);
  const withoutHead = getCombinations(tail, k);
  return [...withHead, ...withoutHead];
};

// Hàm hỗ trợ sinh tất cả các số đảo (hoán vị chữ số) cho cú pháp bao đảo (bd)
const getPermutations = (numStr: string): string[] => {
  const results = new Set<string>();
  const permute = (arr: string[], m: string[] = []) => {
    if (arr.length === 0) {
      results.add(m.join(""));
    } else {
      for (let i = 0; i < arr.length; i++) {
        const curr = arr.slice();
        const next = curr.splice(i, 1);
        permute(curr, m.concat(next));
      }
    }
  };
  permute(numStr.split(""));
  return Array.from(results);
};

export const parseMessageToDetails = (
  msgStr: string,
  provinces: { province: string; label: string }[],
  region?: string,
): MessageDetail[] => {
  if (!msgStr) return [];

  const newDetails: MessageDetail[] = [];
  const lines = msgStr.split("\n").filter((l) => l.trim() !== "");

  lines.forEach((line) => {
    const tokens = line.trim().split(/\s+/);
    if (tokens.length === 0) return;

    let activeProvinces: string[] = [];
    let currentNumbers: string[] = [];
    let currentBets: { syntax: string; score: number }[] = [];
    let isCollectingProvinces = true;

    const flushBlock = () => {
      if (currentNumbers.length === 0 || currentBets.length === 0) return;

      let targetProvinces = activeProvinces;
      if (targetProvinces.length === 0) {
        if (!region || region === "mb") {
          targetProvinces = ["mb"];
        } else {
          targetProvinces = [provinces[0]?.province ?? "mb"];
        }
      }

      currentBets.forEach((bet) => {
        const syntaxLower = bet.syntax.toLowerCase();
        const isDa = syntaxLower.startsWith("da");
        const isBd = syntaxLower.startsWith("bd");

        if (isDa) {
          const matchDaNum = syntaxLower.match(/^da(\d+)$/);
          const k = matchDaNum ? parseInt(matchDaNum[1], 10) : 2;
          const cleanNumbers = currentNumbers.filter((n) => /^\d+$/.test(n));
          const combinations =
            cleanNumbers.length >= k
              ? getCombinations(cleanNumbers, k)
              : [cleanNumbers];

          targetProvinces.forEach((prov) => {
            combinations.forEach((combo) => {
              const combinedNumber = combo.join("-");
              const baseNumForType = combo[0] || "";
              const calculatedBetType = getBetTypeByNumberLength(
                baseNumForType,
                bet.syntax,
              );

              newDetails.push({
                bet_type: calculatedBetType,
                co: 1,
                number: combinedNumber,
                syntax: bet.syntax as Syntax,
                province: prov as Province,
                score: bet.score,
                trung: 0,
              });
            });
          });
        } else if (isBd) {
          // Xử lý cú pháp bao đảo (bd): sinh ra tất cả các số đảo từ dãy số đã nhập
          const expandedNums = expandNumberRange(currentNumbers);
          targetProvinces.forEach((prov) => {
            expandedNums.forEach((num) => {
              const permutations = getPermutations(num);
              permutations.forEach((permNum) => {
                const calculatedBetType = getBetTypeByNumberLength(
                  permNum,
                  "b",
                );
                newDetails.push({
                  bet_type: calculatedBetType,
                  co: 1,
                  number: permNum,
                  syntax: "b" as Syntax, // Chuyển cú pháp đảo thành cú pháp bao lô tương ứng
                  province: prov as Province,
                  score: bet.score,
                  trung: 0,
                });
              });
            });
          });
        } else {
          targetProvinces.forEach((prov) => {
            const expandedNums = expandNumberRange(currentNumbers);
            expandedNums.forEach((num) => {
              const calculatedBetType = getBetTypeByNumberLength(
                num,
                bet.syntax,
              );

              if (bet.syntax === "dd") {
                newDetails.push(
                  {
                    bet_type: calculatedBetType,
                    co: 1,
                    number: num,
                    syntax: "dau",
                    province: prov as Province,
                    score: bet.score,
                    trung: 0,
                  },
                  {
                    bet_type: calculatedBetType,
                    co: 1,
                    number: num,
                    syntax: "duoi",
                    province: prov as Province,
                    score: bet.score,
                    trung: 0,
                  },
                );
              } else if (bet.syntax === "xc") {
                newDetails.push(
                  {
                    bet_type: calculatedBetType,
                    co: 1,
                    number: num,
                    syntax: "xdau" as Syntax,
                    province: prov as Province,
                    score: bet.score,
                    trung: 0,
                  },
                  {
                    bet_type: calculatedBetType,
                    co: 1,
                    number: num,
                    syntax: "xduoi" as Syntax,
                    province: prov as Province,
                    score: bet.score,
                    trung: 0,
                  },
                );
              } else {
                newDetails.push({
                  bet_type: calculatedBetType,
                  co: 1,
                  number: num,
                  syntax: bet.syntax as Syntax,
                  province: prov as Province,
                  score: bet.score,
                  trung: 0,
                });
              }
            });
          });
        }
      });

      currentNumbers = [];
      currentBets = [];
    };

    let i = 0;
    while (i < tokens.length) {
      const token = tokens[i];
      const lowerToken = token.toLowerCase();

      const foundProv = provinces.find(
        (p) =>
          p.province.toLowerCase() === lowerToken ||
          p.label.toLowerCase() === lowerToken,
      );

      if (foundProv) {
        if (isCollectingProvinces) {
          if (!activeProvinces.includes(foundProv.province)) {
            activeProvinces.push(foundProv.province);
          }
        } else {
          if (currentNumbers.length > 0 || currentBets.length > 0) {
            flushBlock();
          }
          activeProvinces = [foundProv.province];
        }
      } else if (/^[a-zA-Z]+\d+$/.test(token)) {
        const match = token.match(/^([a-zA-Z]+)(\d+)$/);
        if (match) {
          const syntax = match[1].toLowerCase();
          const score = parseInt(match[2], 10) || 0;
          isCollectingProvinces = false;

          currentBets.push({ syntax, score });
        }
      } else {
        if (currentBets.length > 0 && currentNumbers.length > 0) {
          flushBlock();
        }
        isCollectingProvinces = false;
        currentNumbers.push(token);
      }
      i++;
    }

    flushBlock();
  });

  return newDetails;
};
