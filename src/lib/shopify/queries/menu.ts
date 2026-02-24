/**
 * getMenuQuery - Truy vấn GraphQL để lấy danh sách menu từ Shopify.
 *
 * GraphQL là gì?
 * GraphQL là ngôn ngữ truy vấn API (giống SQL nhưng dành cho API).
 * Thay vì gọi nhiều endpoint REST khác nhau, với GraphQL ta chỉ gọi 1 endpoint
 * và chỉ định chính xác dữ liệu mình muốn lấy → tiết kiệm bandwidth, nhanh hơn.
 *
 * Giải thích từng phần của query:
 *
 * 1. `query getMenu($handle: String!)` → Khai báo tên query và biến đầu vào
 *    - `$handle`: Tên biến (giống tham số hàm), kiểu String, dấu "!" nghĩa là bắt buộc
 *    - handle là "tên định danh" của menu trong Shopify (ví dụ: "main-menu", "footer")
 *
 * 2. `menu(handle: $handle)` → Gọi field "menu" trên Shopify API, truyền handle vào
 *    - Shopify sẽ tìm menu có handle khớp với giá trị ta truyền
 *
 * 3. `items { title, url }` → Chỉ lấy 2 trường từ mỗi item trong menu:
 *    - title: Tên hiển thị của mục menu (ví dụ: "Trang chủ", "Sản phẩm")
 *    - url: Đường dẫn của mục menu (ví dụ: "https://store.myshopify.com/collections/all")
 *
 * Ví dụ kết quả trả về từ Shopify:
 * {
 *   "data": {
 *     "menu": {
 *       "items": [
 *         { "title": "Home", "url": "https://store.myshopify.com/" },
 *         { "title": "All Products", "url": "https://store.myshopify.com/collections/all" },
 *         { "title": "About", "url": "https://store.myshopify.com/pages/about" }
 *       ]
 *     }
 *   }
 * }
 *
 * `/* GraphQL *\/` là comment đặc biệt để các IDE (VS Code) nhận diện đây là GraphQL
 * → Từ đó cung cấp syntax highlighting và IntelliSense cho chuỗi template literal.
 */
export const getMenuQuery = /* GraphQL */ `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        title
        url
      }
    }
  }
`;
