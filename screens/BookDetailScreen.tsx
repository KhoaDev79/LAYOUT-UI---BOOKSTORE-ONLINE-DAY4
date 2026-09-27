// GIỜ 4 — Bài tập 2: Màn hình Chi tiết sách
// Cấu trúc: thanh trên Quay lại + ScrollView chứa ảnh/mô tả + thanh BottomBar cố định
import React, { useState } from "react";
import { View, ScrollView, Text, Image, Pressable, StyleSheet } from "react-native";
import { Book } from "../data";
import { DiscountBadge } from "../components/DiscountBadge";

interface BookDetailScreenProps {
  book: Book;
  onBack: () => void;
  onAddToCart: (book: Book) => void;
  onGoToCart?: () => void;
}

export function BookDetailScreen({
  book,
  onBack,
  onAddToCart,
  onGoToCart,
}: BookDetailScreenProps) {
  const [addedToast, setAddedToast] = useState(false);

  const handleAdd = () => {
    onAddToCart(book);
    setAddedToast(true);
    setTimeout(() => {
      setAddedToast(false);
    }, 2500);
  };

  return (
    <View style={styles.screen}>
      {/* Thanh điều hướng trên cùng */}
      <View style={styles.topNav}>
        <Pressable style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>← Quay lại</Text>
        </Pressable>
        {onGoToCart && (
          <Pressable style={styles.navCartButton} onPress={onGoToCart}>
            <Text style={styles.navCartText}>Xem giỏ 🛒</Text>
          </Pressable>
        )}
      </View>

      {/* Thông báo nổi khi thêm sách thành công */}
      {addedToast && (
        <View style={styles.toast}>
          <Text style={styles.toastText}>✓ Đã thêm "{book.title}" vào giỏ hàng!</Text>
        </View>
      )}

      {/* ScrollView flex:1 chứa TOÀN BỘ nội dung dài */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.coverWrapper}>
          <Image
            source={{ uri: book.cover }}
            style={styles.cover}
            resizeMode="cover"
          />
          <DiscountBadge
            discountPercent={book.discountPercent}
            isNew={book.isNew}
          />
        </View>

        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>Tác giả: {book.author}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>📂 {book.category}</Text>
        </View>

        <Text style={styles.price}>{book.price.toLocaleString()} đ</Text>

        <View style={styles.divider} />

        <Text style={styles.sectionHeader}>Giới thiệu tác phẩm</Text>
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>

      {/* Thanh dưới cùng: row cố định, luôn nằm ngoài ScrollView */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Giá bán lẻ</Text>
          <Text style={styles.bottomPrice}>{book.price.toLocaleString()} đ</Text>
        </View>
        <Pressable style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    paddingVertical: 4,
  },
  backText: {
    color: "#4338CA",
    fontSize: 15,
    fontWeight: "700",
  },
  navCartButton: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: "#EEF2FF",
    borderRadius: 6,
  },
  navCartText: {
    color: "#4338CA",
    fontSize: 13,
    fontWeight: "600",
  },
  toast: {
    position: "absolute",
    top: 55,
    left: 20,
    right: 20,
    backgroundColor: "#10B981",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    zIndex: 100,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  toastText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
  },
  coverWrapper: {
    position: "relative",
    alignSelf: "center",
    width: "65%",
    aspectRatio: 3 / 4,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#EEF2F7",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  cover: {
    width: "100%",
    height: "100%",
  },
  title: {
    marginTop: 20,
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
    lineHeight: 28,
  },
  author: {
    marginTop: 6,
    fontSize: 14,
    color: "#5B6B7F",
    fontWeight: "500",
  },
  categoryBadge: {
    alignSelf: "flex-start",
    marginTop: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: "#F3F4F6",
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 12,
    color: "#4B5563",
    fontWeight: "600",
  },
  price: {
    marginTop: 12,
    fontSize: 22,
    fontWeight: "800",
    color: "#1E1B4B",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 16,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#374151",
  },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },
  bottomLabel: {
    fontSize: 11,
    color: "#6B7280",
  },
  bottomPrice: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1B4B",
  },
  addButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
