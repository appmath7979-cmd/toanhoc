package utils

import (
	"strings"
	"unicode"

	"golang.org/x/text/unicode/norm"
)

func RemoveAccent(s string) string {
	t := norm.NFD.String(s)
	var sb strings.Builder

	for _, runeValue := range t {
		if unicode.Is(unicode.Mn, runeValue) {
			continue
		}

		sb.WriteRune(runeValue)
	}

	result := sb.String()
	result = strings.ReplaceAll(result, "đ", "d")
	result = strings.ReplaceAll(result, "Đ", "D")

	return strings.ToLower(norm.NFC.String(result))
}
