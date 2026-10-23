import { memo, useEffect, useMemo, useState } from "react";
import { syntaxInputs } from "@/data/syntax.data";
import { calculateInvalidIndices } from "@/libs/helper/editor-parser";
import type { Province } from "@/types/address.type";
import { Button } from "../Button";
import Textarea from "../form/Textarea";
import Box from "../layouts/Box";
import Text from "../typography/Text";

interface EditorProps {
  provinces: Province[];
  id: string;
  content?: string;
  isNorthern?: boolean;
  onMessageChange: (val: string) => void;
}

const Editor = memo(
  ({
    provinces,
    id,
    isNorthern = false,
    onMessageChange,
    content,
  }: EditorProps) => {
    const [value, setValue] = useState<string>(content ?? "");
    const [err, setErr] = useState<string>("");

    const syntaxRegex = useMemo(() => {
      const sortedSyntaxes = [...syntaxInputs, "xdau", "xduoi", "bd"]
        .filter((v, i, a) => a.indexOf(v) === i)
        .sort((a, b) => b.length - a.length);
      return new RegExp(
        `^(${sortedSyntaxes.join("|")})(\\d+(\\.5)?)(n)?$`,
        "i",
      );
    }, []);

    const suggestions = useMemo(() => {
      if (!value) return [];
      const words = value.trim().split(/\s+/);
      const currentWord = words[words.length - 1].toLowerCase();

      if (!currentWord) return [];

      return provinces.filter((p) => {
        const provinceStr = String(p).toLowerCase();
        const matches = provinceStr.startsWith(currentWord);
        const isExact = provinceStr === currentWord;

        return matches && !isExact;
      });
    }, [value, provinces]);

    const invalidIndices = useMemo(() => {
      return calculateInvalidIndices(value, provinces, isNorthern);
    }, [value, provinces, isNorthern]);

    // Render danh sách token an toàn bằng React elements thay vì dangerouslySetInnerHTML
    const renderedTokens = useMemo(() => {
      if (!value) return null;

      const words = value.split(/(\s+)/);
      let nonSpaceCount = 0;

      return words.map((w, index) => {
        const key = `space-${index}`;
        if (/^\s+$/.test(w)) {
          return <span key={key}>{w}</span>;
        }

        const currentIndex = nonSpaceCount;
        nonSpaceCount++;

        const key2 = `token-${index}`;
        if (invalidIndices.has(currentIndex)) {
          return (
            <span
              key={key}
              style={{
                color: "#e7000b",
                fontWeight: "bold",
                textDecoration: "underline wavy #e7000b",
              }}
            >
              {w.replace(/\./g, "")}
            </span>
          );
        }

        if (w.toLowerCase() === "k") {
          return (
            <span key={key2} style={{ color: "#f59e0b", fontWeight: "bold" }}>
              {w}
            </span>
          );
        }

        const cleanWord = w.replace(/\./g, "").toLowerCase();
        const isProvince =
          provinces.some((p) => String(p).toLowerCase() === cleanWord) ||
          cleanWord === "bd";
        if (isProvince) {
          return (
            <span key={key2} style={{ color: "#c800de", fontWeight: "bold" }}>
              {w.replace(/\./g, "")}
            </span>
          );
        }

        const prefixedMatch = w.match(syntaxRegex);
        if (prefixedMatch) {
          return (
            <span key={key2} style={{ color: "#38bdf8", fontWeight: 600 }}>
              {w}
            </span>
          );
        }

        if (/^\d+$/.test(w)) {
          return (
            <span key={key2} style={{ color: "#008235", fontWeight: 600 }}>
              {w}
            </span>
          );
        }

        return <span key={key2}>{w.replace(/\./g, "")}</span>;
      });
    }, [value, provinces, syntaxRegex, invalidIndices]);

    useEffect(() => {
      if (!value.trim()) {
        setErr("");
        return;
      }

      if (invalidIndices.size > 0) {
        setErr(
          !isNorthern
            ? "Sai cú pháp: Sai định dạng số đánh, thứ tự cú pháp hoặc thiếu đài/điểm!"
            : "Cú pháp hoặc định dạng số không hợp lệ!",
        );
      } else {
        setErr("");
      }
    }, [value, invalidIndices, isNorthern]);

    useEffect(() => {
      if (err) {
        onMessageChange("");
        return;
      }
      onMessageChange(value);
    }, [err, value, onMessageChange]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    };

    const handleSelectSuggestion = (province: Province) => {
      const words = value.trim().split(/\s+/);
      const selectedText = String(province) || "";

      words[words.length - 1] = selectedText;
      setValue(words.join(" "));
    };

    return (
      <Box>
        <div className="editor-wrapper relative">
          {/* Lớp hiển thị màu sắc phía sau (thay thế dangerouslySetInnerHTML bằng JSX an toàn) */}
          <div className="editor pointer-events-none whitespace-pre-wrap wrap-break-word">
            {renderedTokens}
            <br />
          </div>

          <Textarea
            id={id}
            className="editor-overlay"
            value={value}
            onChange={handleChange}
            placeholder="Nhập cú pháp..."
            spellCheck={false}
          />

          {suggestions.length > 0 && (
            <div
              className="absolute z-1000 bg-zinc-800 border border-zinc-600 rounded-md shadow-lg mt-1 w-48 max-h-40 overflow-y-auto"
              style={{ top: "105px" }}
            >
              {suggestions.map((item, idx) => {
                const key = `suggests-${item}-${idx}`;
                return (
                  <Button
                    key={key}
                    onClick={() => handleSelectSuggestion(item)}
                    onKeyDown={() => handleSelectSuggestion(item)}
                    className="px-3 py-1.5 text-sm text-zinc-200 hover:bg-zinc-700 cursor-pointer flex justify-between items-center w-full text-left"
                  >
                    <span className="font-semibold text-pink-400">
                      {String(item)}
                    </span>
                    <span className="text-xs text-zinc-400">Gợi ý</span>
                  </Button>
                );
              })}
            </div>
          )}
        </div>
        <Text as="em" className="text-sm font-semibold text-danger">
          {err}
        </Text>
      </Box>
    );
  },
);

export default Editor;
