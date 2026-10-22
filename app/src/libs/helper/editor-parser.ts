import { syntaxInputs } from "@/data/syntax.data";
import type { Province } from "@/types/address.type";

export const getSyntaxRegex = () => {
  const sortedSyntaxes = [...syntaxInputs, "xdau", "xduoi", "bd"]
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort((a, b) => b.length - a.length);
  return new RegExp(`^(${sortedSyntaxes.join("|")})(\\d+(\\.5)?)(n)?$`, "i");
};

export const calculateInvalidIndices = (
  value: string,
  provinces: Province[],
  isNorthern: boolean,
): Set<number> => {
  if (!value.trim()) return new Set<number>();

  const syntaxRegex = getSyntaxRegex();
  const invalidSet = new Set<number>();
  const lines = value.split(/\r?\n/);
  let globalWordIndex = 0;

  const isNum = (w?: string) => w && /^\d+(\.5)?$/.test(w);

  const checkIsProvince = (w: string) => {
    const cleanWord = w.replace(/\./g, "").toLowerCase();
    return provinces.some((p) => String(p).toLowerCase() === cleanWord);
  };

  for (const line of lines) {
    if (!line.trim()) {
      globalWordIndex += line.split(/\s+/).length;
      continue;
    }

    const words = line.trim().split(/\s+/);
    let hasProvinceOnLine = false;

    const lineTokens: {
      index: number;
      word: string;
      isPureNumber?: boolean;
      isSyntax?: boolean;
      isProvince?: boolean;
    }[] = [];

    for (let i = 0; i < words.length; i++) {
      const w = words[i];
      const currentGlobalIdx = globalWordIndex + i;

      // 1. Kiểm tra chữ 'k' (trái bắt buộc phải < phải)
      if (w.toLowerCase() === "k") {
        const leftWord = words[i - 1];
        const rightWord = words[i + 1];
        const farLeftWord = words[i - 2];
        const farRightWord = words[i + 2];

        const isLeftNum = isNum(leftWord);
        const isRightNum = isNum(rightWord);

        let isValidK =
          isLeftNum &&
          isRightNum &&
          !isNum(farLeftWord) &&
          !isNum(farRightWord);

        if (isValidK && leftWord && rightWord) {
          const leftVal = parseFloat(leftWord);
          const rightVal = parseFloat(rightWord);
          if (leftVal >= rightVal) {
            // Phải nhỏ hơn hẳn (<)
            isValidK = false;
          }
        }

        if (!isValidK) {
          invalidSet.add(currentGlobalIdx);
        }
        lineTokens.push({ index: currentGlobalIdx, word: w });
        continue;
      }

      // 2. Kiểm tra tên tỉnh thành hoặc 'bd' độc lập
      const isProv = checkIsProvince(w) || w.toLowerCase() === "bd";
      if (isProv) {
        hasProvinceOnLine = true;
        lineTokens.push({ index: currentGlobalIdx, word: w, isProvince: true });
        continue;
      }

      // 3. Kiểm tra cú pháp chuẩn
      const match = w.match(syntaxRegex);
      if (match) {
        lineTokens.push({ index: currentGlobalIdx, word: w, isSyntax: true });
        continue;
      }

      // 4. Số thuần túy đứng độc lập hoặc dải số (-)
      if (/^\d+(\.5)?$/.test(w) || w === "-") {
        lineTokens.push({
          index: currentGlobalIdx,
          word: w,
          isPureNumber: true,
        });
        continue;
      }

      invalidSet.add(currentGlobalIdx);
      lineTokens.push({ index: currentGlobalIdx, word: w });
    }

    // KIỂM TRA CỤM VÀ QUY TẮC KẾT HỢP
    let numbers: typeof lineTokens = [];
    let syntaxes: typeof lineTokens = [];

    const evaluateCluster = (
      nums: typeof lineTokens,
      syns: typeof lineTokens,
    ) => {
      if (nums.length === 0) {
        syns.forEach((st) => {
          invalidSet.add(st.index);
        });
        return;
      }
      if (syns.length === 0) {
        nums.forEach((nt) => {
          invalidSet.add(nt.index);
        });
        return;
      }

      let hasDd = false;
      let dauCount = 0;
      let duoiCount = 0;

      let hasXc = false;
      let xdauCount = 0;
      let xduoiCount = 0;

      let hasDa = false;

      let needsThreeDigit = false;
      let hasTwoDigitSyntax = false;
      let hasThreeDigitSyntax = false;

      for (const st of syns) {
        const match = st.word.match(syntaxRegex);
        if (match) {
          const syntaxName = match[1].toLowerCase();
          if (syntaxName === "dd") {
            hasDd = true;
            hasTwoDigitSyntax = true;
          } else if (syntaxName === "dau") {
            dauCount++;
            hasTwoDigitSyntax = true;
          } else if (syntaxName === "duoi") {
            duoiCount++;
            hasTwoDigitSyntax = true;
          } else if (syntaxName.startsWith("da")) {
            hasDa = true;
            hasTwoDigitSyntax = true;
          } else if (syntaxName === "xc") {
            hasXc = true;
            hasThreeDigitSyntax = true;
            needsThreeDigit = true;
          } else if (syntaxName === "xdau") {
            xdauCount++;
            hasThreeDigitSyntax = true;
            needsThreeDigit = true;
          } else if (syntaxName === "xduoi") {
            xduoiCount++;
            hasThreeDigitSyntax = true;
            needsThreeDigit = true;
          }

          // match[2] là ĐIỂM (vd b105 -> 105), không phải số đánh,
          // nên không dùng độ dài của nó để quyết định độ dài số cược.
          if (syntaxName === "bd") {
            needsThreeDigit = true;
          }
        }
      }

      // Quy tắc kết hợp nhóm 2 càng (dd, dau, duoi)
      if (hasDd && (dauCount > 0 || duoiCount > 0)) {
        syns.forEach((st) => {
          invalidSet.add(st.index);
        });
      }
      if (dauCount > 1 || duoiCount > 1) {
        syns.forEach((st) => {
          invalidSet.add(st.index);
        });
      }

      // Quy tắc kết hợp nhóm 3 càng (xc, xdau, xduoi)
      if (hasXc && (xdauCount > 0 || xduoiCount > 0)) {
        syns.forEach((st) => {
          invalidSet.add(st.index);
        });
      }
      if (xdauCount > 1 || xduoiCount > 1) {
        syns.forEach((st) => {
          invalidSet.add(st.index);
        });
      }

      const actualNumbersOnly = nums.filter((nt) => nt.word !== "-");

      let requiredLength: number | null = null;
      if (hasTwoDigitSyntax) requiredLength = 2;
      else if (hasThreeDigitSyntax || needsThreeDigit) requiredLength = 3;

      // Quy tắc riêng cho da (dax): Bắt buộc số độ dài 2, ít nhất 2 số và KHÔNG TRÙNG NHAU
      if (hasDa) {
        requiredLength = 2;
        if (actualNumbersOnly.length < 2) {
          actualNumbersOnly.forEach((nt) => {
            invalidSet.add(nt.index);
          });
        } else {
          const seenNums = new Map<string, number[]>();
          actualNumbersOnly.forEach((nt) => {
            const numClean = nt.word.replace(/\..*/, "");
            if (!seenNums.has(numClean)) {
              seenNums.set(numClean, []);
            }
            seenNums.get(numClean)!.push(nt.index);
          });

          seenNums.forEach((indices) => {
            if (indices.length > 1) {
              indices.forEach((idx) => {
                invalidSet.add(idx);
              });
            }
          });
        }
      }

      if (requiredLength !== null) {
        for (const nt of actualNumbersOnly) {
          const numClean = nt.word.replace(/\..*/, "");
          if (numClean.length !== requiredLength) {
            invalidSet.add(nt.index);
          }
        }
      }
    };

    for (const token of lineTokens) {
      if (token.isProvince) {
        if (numbers.length > 0 || syntaxes.length > 0) {
          evaluateCluster(numbers, syntaxes);
        }
        numbers = [];
        syntaxes = [];
      } else if (token.isPureNumber) {
        if (syntaxes.length > 0) {
          evaluateCluster(numbers, syntaxes);
          numbers = [];
          syntaxes = [];
        }
        numbers.push(token);
      } else if (token.isSyntax) {
        syntaxes.push(token);
      } else {
        if (token.word.toLowerCase() === "k") {
          // Giữ nguyên mảng numbers khi gặp chữ 'k'
        } else {
          if (numbers.length > 0 || syntaxes.length > 0) {
            evaluateCluster(numbers, syntaxes);
          }
          numbers = [];
          syntaxes = [];
        }
      }
    }
    if (numbers.length > 0 || syntaxes.length > 0) {
      evaluateCluster(numbers, syntaxes);
    }

    const hasValidEnding = lineTokens.some((t) => t.isSyntax || t.isPureNumber);
    if (!hasValidEnding) {
      lineTokens.forEach((t) => {
        invalidSet.add(t.index);
      });
    }

    const hasProvinceOrAttached =
      hasProvinceOnLine ||
      words.some(
        (w) => syntaxRegex.test(w) && w.toLowerCase().startsWith("bd"),
      );
    if (!isNorthern && !hasProvinceOrAttached) {
      lineTokens.forEach((t) => {
        invalidSet.add(t.index);
      });
    }

    globalWordIndex += words.length;
  }

  return invalidSet;
};
