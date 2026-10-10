import { Province } from "@/types/address.type";
import Textarea from "../form/Textarea";
import { useEffect, useMemo, useState } from "react";
import Text from "../typography/Text";
import Box from "../layouts/Box";
import { syntaxInputs } from "@/data/syntax.data";

interface EditorProps {
  provinces: Province[];
  id: string;
  isNorthern?: boolean;
}

export default function Editor({ provinces, id, isNorthern = false }: EditorProps) {
  const [value, setValue] = useState<string>("");
  const [err, setErr] = useState<string>("");

  const syntaxRegex = useMemo(() => {
    const sortedSyntaxes = [...syntaxInputs, 'xdau', 'xduoi', 'bd'].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => b.length - a.length);
    return new RegExp(`^(${sortedSyntaxes.join('|')})(\\d+(\\.5)?)(n)?$`, 'i');
  }, []);

  const suggestions = useMemo(() => {
    if (!value) return [];
    const words = value.trim().split(/\s+/);
    const currentWord = words[words.length - 1].toLowerCase();

    if (!currentWord) return [];

    return provinces.filter(p => {
      const provinceStr = String(p).toLowerCase();
      const matches = provinceStr.startsWith(currentWord);
      const isExact = provinceStr === currentWord;

      return matches && !isExact;
    });
  }, [value, provinces]);

  const invalidIndices = useMemo(() => {
    if (!value.trim()) return new Set<number>();

    const invalidSet = new Set<number>();
    const lines = value.split(/\r?\n/);
    let globalWordIndex = 0;

    const isNum = (w?: string) => w && /^\d+(\.5)?$/.test(w);

    const checkIsProvince = (w: string) => {
      const cleanWord = w.replace(/\./g, '').toLowerCase();
      return provinces.some((p: any) => String(p).toLowerCase() === cleanWord);
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

        // 1. Kiểm tra chữ 'k'
        if (w.toLowerCase() === 'k') {
          const leftWord = words[i - 1];
          const rightWord = words[i + 1];
          const farLeftWord = words[i - 2];
          const farRightWord = words[i + 2];

          const isValidK = isNum(leftWord) && isNum(rightWord) && !isNum(farLeftWord) && !isNum(farRightWord);
          if (!isValidK) {
            invalidSet.add(currentGlobalIdx);
          }
          lineTokens.push({ index: currentGlobalIdx, word: w });
          continue;
        }

        // 2. Kiểm tra tên tỉnh thành hoặc 'bd' độc lập
        const isProv = checkIsProvince(w) || w.toLowerCase() === 'bd';
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

        // 4. Số thuần túy đứng độc lập
        if (/^\d+(\.5)?$/.test(w)) {
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

      const evaluateCluster = (nums: typeof lineTokens, syns: typeof lineTokens) => {
        if (nums.length === 0) {
          syns.forEach(st => invalidSet.add(st.index));
          return;
        }
        if (syns.length === 0) {
          nums.forEach(nt => invalidSet.add(nt.index));
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
            if (syntaxName === 'dd') {
              hasDd = true;
              hasTwoDigitSyntax = true;
            } else if (syntaxName === 'dau') {
              dauCount++;
              hasTwoDigitSyntax = true;
            } else if (syntaxName === 'duoi') {
              duoiCount++;
              hasTwoDigitSyntax = true;
            } else if (syntaxName === 'da') {
              hasDa = true;
              hasTwoDigitSyntax = true;
            } else if (syntaxName === 'xc') {
              hasXc = true;
              hasThreeDigitSyntax = true;
              needsThreeDigit = true;
            } else if (syntaxName === 'xdau') {
              xdauCount++;
              hasThreeDigitSyntax = true;
              needsThreeDigit = true;
            } else if (syntaxName === 'xduoi') {
              xduoiCount++;
              hasThreeDigitSyntax = true;
              needsThreeDigit = true;
            }

            if (syntaxName === 'bd' || (match[2] && match[2].replace(/\..*/, '').length === 3)) {
              needsThreeDigit = true;
            }
          }
        }

        // Quy tắc kết hợp nhóm 2 càng (dd, dau, duoi)
        if (hasDd && (dauCount > 0 || duoiCount > 0)) {
          syns.forEach(st => invalidSet.add(st.index));
        }
        if (dauCount > 1 || duoiCount > 1) {
          syns.forEach(st => invalidSet.add(st.index));
        }

        // Quy tắc riêng cho da: Bắt buộc phải có đúng 2 số và 2 số phải khác nhau
        if (hasDa) {
          if (nums.length !== 2) {
            nums.forEach(nt => invalidSet.add(nt.index));
          } else {
            const num1Clean = nums[0].word.replace(/\..*/, '');
            const num2Clean = nums[1].word.replace(/\..*/, '');
            if (num1Clean === num2Clean) {
              nums.forEach(nt => invalidSet.add(nt.index));
            }
          }
        }

        // Quy tắc kết hợp nhóm 3 càng (xc, xdau, xduoi)
        if (hasXc && (xdauCount > 0 || xduoiCount > 0)) {
          syns.forEach(st => invalidSet.add(st.index));
        }
        if (xdauCount > 1 || xduoiCount > 1) {
          syns.forEach(st => invalidSet.add(st.index));
        }

        // Kiểm tra từng số trong cụm
        for (const nt of nums) {
          const numClean = nt.word.replace(/\..*/, '');

          // 1. Kiểm tra độ dài 3 càng chung (bd hoặc cú pháp 3 càng)
          if (needsThreeDigit && numClean.length !== 3) {
            invalidSet.add(nt.index);
          }

          // 2. dd, dau, duoi, da bắt buộc phải là số 2 càng (độ dài = 2)
          if (hasTwoDigitSyntax && numClean.length !== 2) {
            invalidSet.add(nt.index);
          }

          // 3. xc, xdau, xduoi bắt buộc phải là số 3 càng (độ dài = 3)
          if (hasThreeDigitSyntax && numClean.length !== 3) {
            invalidSet.add(nt.index);
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
          // GIỮ NGUYÊN CỤM KHI GẶP CHỮ 'K' ĐỂ SỐ TRƯỚC VÀ SAU 'K' CÙNG THUỘC MỘT CỤM
          if (token.word.toLowerCase() === 'k') {
            // Không làm gì cả để giữ nguyên mảng numbers
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

      // QUY TẮC KẾT THÚC DÒNG VÀ ĐÀI
      const hasValidEnding = lineTokens.some(t => t.isSyntax || t.isPureNumber);
      if (!hasValidEnding) {
        lineTokens.forEach(t => invalidSet.add(t.index));
      }

      const hasProvinceOrAttached = hasProvinceOnLine || words.some(w => syntaxRegex.test(w) && w.toLowerCase().startsWith('bd'));
      if (!isNorthern && !hasProvinceOrAttached) {
        lineTokens.forEach(t => invalidSet.add(t.index));
      }

      globalWordIndex += words.length;
    }

    return invalidSet;
  }, [value, provinces, syntaxRegex, isNorthern]);

  const highlightedHtml = useMemo(() => {
    if (!value) return "";

    const words = value.split(/(\s+)/);
    let nonSpaceCount = 0;

    return words.map((w) => {
      if (/^\s+$/.test(w)) return w;

      const currentIndex = nonSpaceCount;
      nonSpaceCount++;

      if (invalidIndices.has(currentIndex)) {
        return `<span style="color: #e7000b; font-weight: black; text-decoration: underline wavy #e7000b">${w.replace(/\./g, '')}</span>`;
      }

      if (w.toLowerCase() === 'k') {
        return `<span style="color: #f59e0b; font-weight: bold;">${w}</span>`;
      }

      const cleanWord = w.replace(/\./g, '').toLowerCase();
      const isProvince = provinces.some((p) => String(p).toLowerCase() === cleanWord) || cleanWord === 'bd';
      if (isProvince) {
        return `<span style="color: #c800de; font-weight: bold;">${w.replace(/\./g, '')}</span>`;
      }

      let prefixedMatch = w.match(syntaxRegex);
      if (prefixedMatch) {
        return `<span style="color: #38bdf8; font-weight: 600;">${w}</span>`;
      }

      if (/^\d+$/.test(w)) {
        return `<span style="color: #008235; font-weight: 600">${w}</span>`;
      }

      return w.replace(/\./g, '');
    }).join("");
  }, [value, provinces, syntaxRegex, invalidIndices]);

  useEffect(() => {
    if (!value.trim()) {
      setErr("");
      return;
    }

    if (invalidIndices.size > 0) {
      setErr(!isNorthern
        ? "Sai cú pháp: Sai định dạng số, thứ tự cú pháp hoặc thiếu đài/điểm!"
        : "Cú pháp hoặc định dạng số không hợp lệ!");
    } else {
      setErr("");
    }
  }, [value, invalidIndices, isNorthern]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  const handleSelectSuggestion = (province: Province) => {
    const words = value.trim().split(/\s+/);
    const selectedText = String(province) || "";

    words[words.length - 1] = selectedText;
    setValue(words.join(" ") + " ");
  };

  return (
    <Box>
      <div className="editor-wrapper">
        <div
          className="editor"
          dangerouslySetInnerHTML={{ __html: highlightedHtml + "<br/>" }}
        />
        <Textarea
          id={id}
          className="editor-overlay"
          value={value}
          onChange={handleChange}
          placeholder="Nhập cú pháp..."
          spellCheck={false}
        />

        {suggestions.length > 0 && (
          <div className="absolute z-1000 bg-zinc-800 border border-zinc-600 rounded-md shadow-lg mt-1 w-48 max-h-40 overflow-y-auto" style={{ top: '105px' }}>
            {suggestions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => handleSelectSuggestion(item)}
                className="px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-700 cursor-pointer flex justify-between items-center"
              >
                <span className="font-semibold text-pink-400">{String(item)}</span>
                <span className="text-xs text-zinc-400">Gợi ý</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <Text as="em" className="text-sm font-semibold text-danger">{err}</Text>
    </Box>
  );
}