// GIỜ 1 + GIỜ 4 + TỔNG HỢP: Header ứng dụng BookStore
// Tích hợp tìm kiếm trực tiếp + Badge giỏ hàng tương tác
import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";

interface HeaderProps {
  cartCount?: number;
  onPressCart?: () => void;
  searchQuery?: string;
  onSearchChange?: (text: string) => void;
  showSearch?: boolean;
  onToggleSearch?: () => void;
}

export function Header({
  cartCount = 0,
  onPressCart,
  searchQuery = "",
  onSearchChange,
  showSearch = false,
  onToggleSearch,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>📚 BookStore</Text>

        {/* Nhóm 2 icon bên phải: Tìm kiếm & Giỏ hàng */}
        <View style={styles.iconGroup}>
          <Pressable
            style={[styles.iconButton, showSearch && styles.iconActiveButton]}
            onPress={onToggleSearch}
            accessibilityLabel="Tìm kiếm"
          >
            <Text style={styles.icon}>🔍</Text>
          </Pressable>

          <Pressable
            style={styles.iconButton}
            onPress={onPressCart}
            accessibilityLabel="Giỏ hàng"
          >
            <Text style={styles.icon}>🛒</Text>
            {cartCount > 0 && (
              <View style={styles.cartBadge}>
                <Text style={styles.cartBadgeText}>
                  {cartCount > 99 ? "99+" : cartCount}
                </Text>
              </View>
            )}
          </Pressable>
        </View>
      </View>

      {/* Thanh tìm kiếm hiển thị khi bật icon search */}
      {showSearch && (
        <View style={styles.searchBar}>
          <Text style={styles.searchIcon}>🔎</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm theo tên sách hoặc tác giả..."
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={onSearchChange}
            autoFocus
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => onSearchChange?.("")}>
              <Text style={styles.clearIcon}>✕</Text>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1E1B4B", // navy/indigo chủ đạo
  },
  header: {
    flexDirection: "row", // xếp logo và nhóm icon theo hàng ngang
    justifyContent: "space-between", // đẩy 2 đầu ra xa nhau
    alignItems: "center", // căn giữa trục dọc
    height: 56,
    paddingHorizontal: 16,
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  iconGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    position: "relative",
    padding: 6,
    borderRadius: 8,
  },
  iconActiveButton: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
  },
  icon: {
    fontSize: 20,
  },
  cartBadge: {
    position: "absolute",
    top: 0,
    right: -2,
    backgroundColor: "#DC2626",
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
    borderWidth: 1.5,
    borderColor: "#1E1B4B",
  },
  cartBadgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "700",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    height: 40,
    gap: 8,
  },
  searchIcon: {
    fontSize: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: "#111827",
    paddingVertical: 0,
  },
  clearIcon: {
    fontSize: 14,
    color: "#9CA3AF",
    padding: 4,
  },
});
