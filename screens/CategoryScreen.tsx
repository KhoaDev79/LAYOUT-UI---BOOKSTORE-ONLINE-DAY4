// Màn hình Tab Danh mục: Duyệt sách theo từng chuyên mục
import React, { useState } from "react";
import { View, ScrollView, Text, Pressable, StyleSheet } from "react-native";
import { Book, CATEGORIES } from "../data";
import { BookGrid } from "../components/BookGrid";

interface CategoryScreenProps {
  books: Book[];
  onPressBook: (id: number) => void;
  onQuickAddToCart?: (book: Book) => void;
}

export function CategoryScreen({
  books,
  onPressBook,
  onQuickAddToCart,
}: CategoryScreenProps) {
  const [activeCategory, setActiveCategory] = useState("Văn học");

  // Đếm số lượng sách theo từng category
  const getBookCount = (catName: string) => {
    if (catName === "Tất cả") return books.length;
    return books.filter((b) => b.category === catName).length;
  };

  const currentBooks =
    activeCategory === "Tất cả"
      ? books
      : books.filter((b) => b.category === activeCategory);

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Khám phá theo danh mục</Text>
      </View>

      <View style={styles.content}>
        {/* Cột trái: Danh sách các thể loại */}
        <ScrollView
          style={styles.sidebar}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.sidebarContent}
        >
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const count = getBookCount(cat);
            return (
              <Pressable
                key={cat}
                style={[styles.sidebarItem, isActive && styles.sidebarItemActive]}
                onPress={() => setActiveCategory(cat)}
              >
                <Text
                  style={[
                    styles.sidebarText,
                    isActive && styles.sidebarTextActive,
                  ]}
                  numberOfLines={1}
                >
                  {cat}
                </Text>
                <Text
                  style={[
                    styles.sidebarCount,
                    isActive && styles.sidebarCountActive,
                  ]}
                >
                  {count}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        {/* Vùng phải: Lưới sách thuộc thể loại đang chọn */}
        <ScrollView
          style={styles.mainList}
          contentContainerStyle={styles.mainListContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.catTitleBar}>
            <Text style={styles.catHeading}>{activeCategory}</Text>
            <Text style={styles.catCount}>({currentBooks.length} sách)</Text>
          </View>

          <BookGrid
            books={currentBooks}
            onPressBook={onPressBook}
            onQuickAddToCart={onQuickAddToCart}
          />
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  header: {
    height: 56,
    backgroundColor: "#1E1B4B",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  content: {
    flex: 1,
    flexDirection: "row",
  },
  sidebar: {
    width: 110,
    backgroundColor: "#FFFFFF",
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
  },
  sidebarContent: {
    paddingVertical: 8,
    paddingBottom: 80,
  },
  sidebarItem: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  sidebarItemActive: {
    backgroundColor: "#EEF2FF",
    borderLeftWidth: 4,
    borderLeftColor: "#4338CA",
  },
  sidebarText: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "500",
  },
  sidebarTextActive: {
    color: "#4338CA",
    fontWeight: "700",
  },
  sidebarCount: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 2,
  },
  sidebarCountActive: {
    color: "#6366F1",
  },
  mainList: {
    flex: 1,
  },
  mainListContent: {
    padding: 12,
    paddingBottom: 90, // tránh bị TabBar đè
  },
  catTitleBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  catHeading: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1E1B4B",
  },
  catCount: {
    fontSize: 12,
    color: "#6B7280",
  },
});
