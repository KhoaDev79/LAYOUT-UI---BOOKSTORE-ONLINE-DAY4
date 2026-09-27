// GIỜ 5 — Bài tập 2: Màn hình Giỏ hàng hoàn chỉnh
// Đủ 3 vùng theo yêu cầu: Danh sách cuộn + Thanh tổng tiền cố định + TabBar cố định.
// Tích hợp: Tăng/giảm số lượng, xoá, thanh toán & empty state.
import React from "react";
import { View, ScrollView, Text, Pressable, StyleSheet, Alert } from "react-native";
import { CartLineItem } from "../components/CartLineItem";
import { CartItem } from "../data";

interface CartScreenProps {
  items: CartItem[];
  onUpdateQuantity: (bookId: number, delta: number) => void;
  onRemoveItem: (bookId: number) => void;
  onPressBook?: (bookId: number) => void;
  onCheckout: () => void;
  onContinueShopping: () => void;
}

export function CartScreen({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onPressBook,
  onCheckout,
  onContinueShopping,
}: CartScreenProps) {
  const total = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckoutPress = () => {
    if (items.length === 0) return;
    Alert.alert(
      "Xác nhận đặt hàng",
      `Bạn có muốn thanh toán đơn hàng với tổng số tiền ${total.toLocaleString()} đ cho ${totalQuantity} cuốn sách?`,
      [
        { text: "Để sau", style: "cancel" },
        {
          text: "Đồng ý",
          onPress: () => {
            onCheckout();
            Alert.alert(
              "Đặt hàng thành công! 🎉",
              "Cảm ơn bạn đã mua sách tại BookStore. Đơn hàng đang được xử lý và giao tới bạn sớm nhất!"
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <View style={styles.headerBar}>
        <Text style={styles.header}>Giỏ hàng của bạn</Text>
        {items.length > 0 && (
          <Text style={styles.countText}>({totalQuantity} cuốn)</Text>
        )}
      </View>

      {items.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyTitle}>Giỏ hàng đang trống</Text>
          <Text style={styles.emptySubtitle}>
            Hãy khám phá các đầu sách hay và thêm vào giỏ nhé!
          </Text>
          <Pressable style={styles.shopNowBtn} onPress={onContinueShopping}>
            <Text style={styles.shopNowText}>Khám phá sách ngay</Text>
          </Pressable>
        </View>
      ) : (
        <>
          {/* Danh sách sản phẩm: CUỘN được (flex:1) */}
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {items.map((item) => (
              <CartLineItem
                key={item.book.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemoveItem={onRemoveItem}
                onPressBook={onPressBook}
              />
            ))}
          </ScrollView>

          {/* Thanh tổng tiền + nút thanh toán: KHÔNG cuộn, đứng cố định ngay trên TabBar */}
          <View style={styles.totalBar}>
            <View>
              <Text style={styles.totalLabel}>Tổng cộng tạm tính</Text>
              <Text style={styles.totalValue}>{total.toLocaleString()} đ</Text>
            </View>
            <Pressable
              style={styles.checkoutButton}
              onPress={handleCheckoutPress}
            >
              <Text style={styles.checkoutText}>Thanh toán</Text>
            </Pressable>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  header: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111827",
  },
  countText: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  totalBar: {
    flexDirection: "row", // tổng tiền bên trái, nút thanh toán bên phải
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
    // marginBottom = chiều cao TabBar (64) -> nổi ngay trên TabBar
    marginBottom: 64,
  },
  totalLabel: {
    fontSize: 12,
    color: "#5B6B7F",
  },
  totalValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1E1B4B",
  },
  checkoutButton: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
  },
  checkoutText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    paddingBottom: 80,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
    opacity: 0.6,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },
  shopNowBtn: {
    backgroundColor: "#4338CA",
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  shopNowText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
});
