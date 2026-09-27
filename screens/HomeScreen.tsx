// GIỜ 4 + GIỜ 5: Màn hình Trang chủ hoàn chỉnh
// Ghép: Header (cố định) + ScrollView (Chips + Grid) + FloatingCartButton (cố định)
import React, { useState, useMemo } from "react";
import { View, ScrollView, Text, StyleSheet } from "react-native";
import { Header } from "../components/Header";
import { CategoryChips } from "../components/CategoryChips";
import { BookGrid } from "../components/BookGrid";
import { FloatingCartButton } from "../components/FloatingCartButton";
import { Book } from "../data";

interface HomeScreenProps {
  books: Book[];
  cartCount: number;
  onPressBook: (id: number) => void;
  onPressCart: () => void;
  onQuickAddToCart?: (book: Book) => void;
}

export function HomeScreen({
  books,
  cartCount,
  onPressBook,
  onPressCart,
  onQuickAddToCart,
}: HomeScreenProps) {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Lọc sách theo category và search query
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchCategory =
        selectedCategory === "Tất cả" || book.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [books, selectedCategory, searchQuery]);

  return (
    <View style={styles.screen}>
      <Header
        cartCount={cartCount}
        onPressCart={onPressCart}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={showSearch}
        onToggleSearch={() => setShowSearch((prev) => !prev)}
      />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Danh mục sách</Text>
        <CategoryChips
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => setSelectedCategory(cat)}
        />

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            {selectedCategory === "Tất cả" ? "Tất cả sách nổi bật" : `Thể loại: ${selectedCategory}`}
          </Text>
          <Text style={styles.bookCount}>({filteredBooks.length} cuốn)</Text>
        </View>

        <BookGrid
          books={filteredBooks}
          onPressBook={onPressBook}
          onQuickAddToCart={onQuickAddToCart}
        />
      </ScrollView>

      {/* Nút nổi góc dưới màn hình, nằm trên TabBar */}
      <FloatingCartButton
        count={cartCount}
        onPress={onPressCart}
        bottomOffset={80}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    // paddingBottom 150 để không bị TabBar và FloatingCart che mất phần tử cuối
    paddingBottom: 150,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
    marginTop: 6,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 18,
    marginBottom: 10,
  },
  bookCount: {
    fontSize: 13,
    color: "#6B7280",
    fontWeight: "500",
  },
});
