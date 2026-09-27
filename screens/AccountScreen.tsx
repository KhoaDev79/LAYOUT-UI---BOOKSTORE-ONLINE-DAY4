// Màn hình Tab Tài khoản người dùng
import React from "react";
import { View, ScrollView, Text, Pressable, StyleSheet, Alert } from "react-native";

export function AccountScreen() {
  const handleAction = (title: string) => {
    Alert.alert("Thông báo", `Chức năng "${title}" đang được hoàn thiện.`);
  };

  const handleLogout = () => {
    Alert.alert("Đăng xuất", "Bạn có chắc chắn muốn đăng xuất khỏi tài khoản?", [
      { text: "Hủy", style: "cancel" },
      { text: "Đăng xuất", style: "destructive", onPress: () => Alert.alert("Đã đăng xuất") },
    ]);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tài khoản</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Nguyễn Văn A</Text>
            <Text style={styles.userEmail}>nguyenvana@gmail.com</Text>
            <View style={styles.badgeVip}>
              <Text style={styles.badgeVipText}>⭐ Thành viên Vàng</Text>
            </View>
          </View>
        </View>

        {/* Khối quản lý đơn hàng */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Đơn hàng & Mua sắm</Text>
          <View style={styles.menuGroup}>
            <MenuItem
              icon="📦"
              title="Đơn hàng của tôi"
              subtitle="2 đơn đang giao"
              onPress={() => handleAction("Đơn hàng của tôi")}
            />
            <MenuItem
              icon="❤️"
              title="Sách yêu thích"
              subtitle="5 cuốn"
              onPress={() => handleAction("Sách yêu thích")}
            />
            <MenuItem
              icon="📍"
              title="Sổ địa chỉ nhận hàng"
              onPress={() => handleAction("Sổ địa chỉ")}
            />
            <MenuItem
              icon="💳"
              title="Phương thức thanh toán"
              onPress={() => handleAction("Phương thức thanh toán")}
              isLast
            />
          </View>
        </View>

        {/* Khối cài đặt & hỗ trợ */}
        <View style={styles.section}>
          <Text style={styles.sectionHeading}>Cài đặt & Hỗ trợ</Text>
          <View style={styles.menuGroup}>
            <MenuItem
              icon="🔔"
              title="Thông báo"
              onPress={() => handleAction("Cài đặt thông báo")}
            />
            <MenuItem
              icon="❓"
              title="Trung tâm trợ giúp"
              onPress={() => handleAction("Trung tâm trợ giúp")}
            />
            <MenuItem
              icon="📄"
              title="Điều khoản & Chính sách"
              onPress={() => handleAction("Chính sách")}
              isLast
            />
          </View>
        </View>

        {/* Nút đăng xuất */}
        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function MenuItem({
  icon,
  title,
  subtitle,
  onPress,
  isLast = false,
}: {
  icon: string;
  title: string;
  subtitle?: string;
  onPress: () => void;
  isLast?: boolean;
}) {
  return (
    <Pressable
      style={[styles.menuItem, isLast && styles.menuItemLast]}
      onPress={onPress}
    >
      <View style={styles.menuLeft}>
        <Text style={styles.menuIcon}>{icon}</Text>
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      <View style={styles.menuRight}>
        {subtitle && <Text style={styles.menuSubtitle}>{subtitle}</Text>}
        <Text style={styles.menuArrow}>›</Text>
      </View>
    </Pressable>
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
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 90, // chừa chỗ cho TabBar
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    gap: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#6366F1",
  },
  avatarText: {
    fontSize: 28,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  userEmail: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },
  badgeVip: {
    alignSelf: "flex-start",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 6,
  },
  badgeVipText: {
    fontSize: 11,
    color: "#D97706",
    fontWeight: "700",
  },
  section: {
    marginBottom: 20,
  },
  sectionHeading: {
    fontSize: 14,
    fontWeight: "700",
    color: "#374151",
    marginBottom: 8,
    marginLeft: 4,
  },
  menuGroup: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  menuIcon: {
    fontSize: 18,
  },
  menuTitle: {
    fontSize: 14,
    color: "#1F2937",
    fontWeight: "500",
  },
  menuRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  menuSubtitle: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  menuArrow: {
    fontSize: 18,
    color: "#9CA3AF",
  },
  logoutButton: {
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: "#FEE2E2",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  logoutText: {
    color: "#DC2626",
    fontSize: 14,
    fontWeight: "700",
  },
});
