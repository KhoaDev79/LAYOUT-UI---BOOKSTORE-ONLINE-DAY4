// GIỜ 5 — Bài tập 2: 1 dòng sản phẩm trong màn Giỏ hàng
// Kỹ thuật: row với 3 vùng tỉ lệ khác nhau — ảnh cố định, tên flex:1 (co giãn),
// khối điều khiển số lượng và giá tiền.
// Nâng cấp: Tích hợp đầy đủ nút tăng (+), giảm (-), xóa (🗑️).
import React from "react";
import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { CartItem } from "../data";

interface CartLineItemProps {
  item: CartItem;
  onUpdateQuantity: (bookId: number, delta: number) => void;
  onRemoveItem: (bookId: number) => void;
  onPressBook?: (bookId: number) => void;
}

export function CartLineItem({
  item,
  onUpdateQuantity,
  onRemoveItem,
  onPressBook,
}: CartLineItemProps) {
  const lineTotal = item.book.price * item.quantity;

  return (
    <View style={styles.row}>
      <Pressable onPress={() => onPressBook?.(item.book.id)}>
        <Image source={{ uri: item.book.cover }} style={styles.thumb} />
      </Pressable>

      {/* Thông tin sách: flex:1 co giãn */}
      <View style={styles.info}>
        <Pressable onPress={() => onPressBook?.(item.book.id)}>
          <Text style={styles.title} numberOfLines={2}>
            {item.book.title}
          </Text>
        </Pressable>
        <Text style={styles.unitPrice}>
          {item.book.price.toLocaleString()} đ / cuốn
        </Text>
      </View>

      {/* Khối số lượng (+/-) và tổng tiền */}
      <View style={styles.controls}>
        <Text style={styles.price}>{lineTotal.toLocaleString()} đ</Text>

        <View style={styles.qtyRow}>
          <Pressable
            style={styles.qtyBtn}
            onPress={() => onUpdateQuantity(item.book.id, -1)}
          >
            <Text style={styles.qtyBtnText}>-</Text>
          </Pressable>

          <Text style={styles.qtyText}>{item.quantity}</Text>

          <Pressable
            style={styles.qtyBtn}
            onPress={() => onUpdateQuantity(item.book.id, 1)}
          >
            <Text style={styles.qtyBtnText}>+</Text>
          </Pressable>

          <Pressable
            style={styles.removeBtn}
            onPress={() => onRemoveItem(item.book.id)}
          >
            <Text style={styles.removeText}>✕</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row", // ảnh - thông tin - controls nằm cùng hàng ngang
    alignItems: "center",
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    backgroundColor: "#FFFFFF",
  },
  thumb: {
    width: 48,
    height: 66, // ảnh cố định, không co giãn
    borderRadius: 6,
    backgroundColor: "#EEF2F7",
  },
  info: {
    flex: 1, // co giãn ăn hết phần dư
    justifyContent: "center",
  },
  title: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 4,
  },
  unitPrice: {
    fontSize: 11,
    color: "#6B7280",
  },
  controls: {
    alignItems: "flex-end",
    gap: 6,
  },
  price: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1E1B4B",
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyBtnText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#374151",
    lineHeight: 18,
  },
  qtyText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#111827",
    minWidth: 18,
    textAlign: "center",
  },
  removeBtn: {
    marginLeft: 4,
    padding: 4,
  },
  removeText: {
    fontSize: 13,
    color: "#EF4444",
    fontWeight: "700",
  },
});
