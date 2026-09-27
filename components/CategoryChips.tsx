// GIỜ 2 — Bài tập 1: Danh mục dạng chip, tự xuống dòng khi tràn
// Kỹ thuật: flexWrap 'wrap' + gap, mỗi chip width 'auto' theo nội dung.
// Nâng cấp: Cho phép bấm chọn để lọc sách theo danh mục.
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { CATEGORIES } from "../data";

interface CategoryChipsProps {
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export function CategoryChips({
  selectedCategory = "Tất cả",
  onSelectCategory,
}: CategoryChipsProps) {
  return (
    <View style={styles.wrap}>
      {CATEGORIES.map((name) => {
        const isSelected = selectedCategory === name;
        return (
          <Pressable
            key={name}
            style={[styles.chip, isSelected && styles.chipActive]}
            onPress={() => onSelectCategory?.(name)}
          >
            {/* Không set width cho Text/View chip -> tự rộng theo nội dung chữ */}
            <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>
              {name}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row", // xếp các chip theo hàng...
    flexWrap: "wrap", // ...và tự xuống dòng khi hết chỗ ngang
    gap: 8, // khoảng cách đều cả 2 chiều giữa các chip
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999, // bo tròn lớn -> dạng "viên thuốc" (pill)
    borderWidth: 1,
    borderColor: "#6366F1", // indigo
    backgroundColor: "#FFFFFF",
    // Không set "width" -> mỗi chip tự co giãn đúng theo độ dài tên danh mục
  },
  chipActive: {
    backgroundColor: "#4338CA",
    borderColor: "#4338CA",
  },
  chipText: {
    color: "#4338CA",
    fontSize: 13,
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
});
