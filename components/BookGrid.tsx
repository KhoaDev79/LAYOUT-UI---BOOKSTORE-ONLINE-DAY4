// GIỜ 2 — Bài tập 2: Lưới sản phẩm nhiều cột (chưa dùng FlatList/numColumns,
// chỉ luyện flexbox thuần) + tích hợp DiscountBadge của Giờ 3.
import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { Book } from "../data";
import { DiscountBadge } from "./DiscountBadge";

interface BookGridProps {
  books: Book[];
  onPressBook: (id: number) => void;
  onQuickAddToCart?: (book: Book) => void;
}

export function BookGrid({ books, onPressBook, onQuickAddToCart }: BookGridProps) {
  if (books.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>🔍</Text>
        <Text style={styles.emptyText}>Không tìm thấy cuốn sách nào phù hợp</Text>
      </View>
    );
  }

  return (
    <View style={styles.grid}>
      {books.map((book) => (
        <Pressable
          key={book.id}
          style={styles.item}
          onPress={() => onPressBook(book.id)}
        >
          {/* View bọc ảnh cần position:'relative' để làm containing block cho Badge */}
          <View style={styles.coverWrap}>
            <Image
              source={{ uri: book.cover }}
              style={styles.cover}
              resizeMode="cover"
            />
            <DiscountBadge
              discountPercent={book.discountPercent}
              isNew={book.isNew}
            />

            {/* Nút thêm nhanh vào giỏ nhỏ xinh trên ảnh */}
            {onQuickAddToCart && (
              <Pressable
                style={styles.quickAddBtn}
                onPress={(e) => {
                  e.stopPropagation?.();
                  onQuickAddToCart(book);
                }}
              >
                <Text style={styles.quickAddText}>+ 🛒</Text>
              </Pressable>
            )}
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {book.title}
          </Text>
          <Text style={styles.author} numberOfLines={1}>
            {book.author}
          </Text>
          <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row", // các item chảy theo hàng ngang...
    flexWrap: "wrap", // ...rồi tự xuống hàng khi hết chỗ -> tạo thành lưới
    justifyContent: "space-between",
  },
  item: {
    width: "48%", // 2 cột chuẩn
    marginBottom: 16, // khoảng cách giữa các hàng
  },
  coverWrap: {
    position: "relative", // containing block cho DiscountBadge absolute bên trong
    width: "100%",
    aspectRatio: 3 / 4, // giữ tỉ lệ ảnh dù width co giãn theo %
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#EEF2F7",
  },
  cover: {
    width: "100%",
    height: "100%",
  },
  quickAddBtn: {
    position: "absolute",
    bottom: 6,
    right: 6,
    backgroundColor: "rgba(30, 27, 75, 0.85)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  quickAddText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
  title: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
  },
  author: {
    marginTop: 2,
    fontSize: 11,
    color: "#6B7280",
  },
  price: {
    marginTop: 2,
    fontSize: 13,
    fontWeight: "700",
    color: "#1E1B4B",
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  emptyIcon: {
    fontSize: 32,
  },
  emptyText: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
  },
});
