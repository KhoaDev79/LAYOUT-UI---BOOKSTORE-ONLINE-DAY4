// GIỜ 3 — Bài tập 2: Nút giỏ hàng nổi (Floating Cart Button)
// Kỹ thuật: containing block LỒNG NHAU — số lượng neo theo nút tròn,
// còn nút tròn neo theo toàn màn hình (2 tầng position:'absolute' khác nhau).
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

const SIZE = 56;

interface FloatingCartButtonProps {
  count: number;
  onPress: () => void;
  bottomOffset?: number;
}

export function FloatingCartButton({
  count,
  onPress,
  bottomOffset = 80, // Mặc định nổi trên TabBar (cao 64px)
}: FloatingCartButtonProps) {
  return (
    // Nút chính: absolute, neo theo containing block là màn hình cha
    <Pressable
      style={[styles.button, { bottom: bottomOffset }]}
      onPress={onPress}
      accessibilityLabel="Xem giỏ hàng"
    >
      <Text style={styles.buttonIcon}>🛒</Text>

      {/* Số lượng: absolute theo chính Pressable nút tròn */}
      {count > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 99 ? "99+" : count}</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 20, // neo góc dưới-phải MÀN HÌNH
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2, // width = height + bo tròn 1 nửa -> hình tròn tuyệt đối
    backgroundColor: "#4338CA",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6, // đổ bóng trên Android
    shadowColor: "#000", // đổ bóng trên iOS/web
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    zIndex: 50,
  },
  buttonIcon: {
    fontSize: 22,
  },
  badge: {
    position: "absolute",
    top: -4,
    right: -4, // neo góc trên-phải của CHÍNH nút tròn
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#DC2626",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
  },
});
