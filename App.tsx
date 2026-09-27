// ==============================================================================
// ỨNG DỤNG TỔNG HỢP HOÀN CHỈNH: BOOKSTORE ONLINE (KẾT HỢP GIỜ 4 & GIỜ 5)
// ==============================================================================
// 1. Giờ 4: Layout toàn màn hình với ScrollView, Header cố định, CategoryChips,
//    BookGrid flexbox, FloatingCartButton absolute đa tầng, BookDetailScreen.
// 2. Giờ 5: Bottom TabBar cố định 4 tab (Trang chủ, Danh mục, Giỏ hàng, Tài khoản),
//    CartScreen với CartLineItem (tăng giảm số lượng, xoá, thanh toán, empty state).
// 3. Quản lý trạng thái tập trung (Cart State, Navigation State, Filtering & Search).
// ==============================================================================

import React, { useState, useMemo } from "react";
import { View, SafeAreaView, StyleSheet, Platform, StatusBar as RNStatusBar } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BOOKS, INITIAL_CART_ITEMS, Book, CartItem } from "./data";
import { TabBar, TabKey } from "./components/TabBar";
import { HomeScreen } from "./screens/HomeScreen";
import { BookDetailScreen } from "./screens/BookDetailScreen";
import { CartScreen } from "./screens/CartScreen";
import { CategoryScreen } from "./screens/CategoryScreen";
import { AccountScreen } from "./screens/AccountScreen";

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<TabKey>("home");
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  // Cart State tập trung
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);

  // Tổng số lượng sách trong giỏ
  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // Thêm sách vào giỏ
  const handleAddToCart = (book: Book) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.book.id === book.id);
      if (existing) {
        return prevItems.map((item) =>
          item.book.id === book.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { book, quantity: 1 }];
    });
  };

  // Cập nhật số lượng (+ / -)
  const handleUpdateQuantity = (bookId: number, delta: number) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.book.id === bookId) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0);
    });
  };

  // Xoá sản phẩm khỏi giỏ
  const handleRemoveItem = (bookId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.book.id !== bookId)
    );
  };

  // Thanh toán
  const handleCheckout = () => {
    setCartItems([]);
  };

  // Sách đang xem chi tiết
  const selectedBook = useMemo(() => {
    return BOOKS.find((b) => b.id === selectedBookId) ?? null;
  }, [selectedBookId]);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        {selectedBook ? (
          // Màn hình chi tiết sách
          <BookDetailScreen
            book={selectedBook}
            onBack={() => setSelectedBookId(null)}
            onAddToCart={handleAddToCart}
            onGoToCart={() => {
              setSelectedBookId(null);
              setActiveTab("cart");
            }}
          />
        ) : (
          // Giao diện chính chứa các Tab
          <>
            <View style={styles.tabContent}>
              {activeTab === "home" && (
                <HomeScreen
                  books={BOOKS}
                  cartCount={cartCount}
                  onPressBook={(id) => setSelectedBookId(id)}
                  onPressCart={() => setActiveTab("cart")}
                  onQuickAddToCart={handleAddToCart}
                />
              )}

              {activeTab === "category" && (
                <CategoryScreen
                  books={BOOKS}
                  onPressBook={(id) => setSelectedBookId(id)}
                  onQuickAddToCart={handleAddToCart}
                />
              )}

              {activeTab === "cart" && (
                <CartScreen
                  items={cartItems}
                  onUpdateQuantity={handleUpdateQuantity}
                  onRemoveItem={handleRemoveItem}
                  onPressBook={(id) => setSelectedBookId(id)}
                  onCheckout={handleCheckout}
                  onContinueShopping={() => setActiveTab("home")}
                />
              )}

              {activeTab === "account" && <AccountScreen />}
            </View>

            {/* Bottom TabBar cố định */}
            <TabBar
              active={activeTab}
              onChange={setActiveTab}
              cartCount={cartCount}
            />
          </>
        )}
      </View>
      <StatusBar style="light" backgroundColor="#1E1B4B" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#1E1B4B", // Màu thanh status bar đồng bộ với Header
    paddingTop: Platform.OS === "android" ? RNStatusBar.currentHeight : 0,
  },
  body: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  tabContent: {
    flex: 1,
  },
});
