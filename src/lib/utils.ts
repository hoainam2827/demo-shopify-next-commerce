import { ReadonlyURLSearchParams } from 'next/navigation';

/**
 * ensureStartWith - Đảm bảo một chuỗi luôn bắt đầu bằng tiền tố (prefix) chỉ định.
 *
 * Tại sao cần hàm này?
 * Khi lấy domain từ biến môi trường (env), người dùng có thể nhập:
 *   - "https://my-store.myshopify.com" (đã có https://)
 *   - "my-store.myshopify.com" (thiếu https://)
 * Hàm này giúp xử lý cả 2 trường hợp, luôn đảm bảo kết quả có "https://" ở đầu.
 *
 * @param stringToCheck - Chuỗi cần kiểm tra (ví dụ: domain từ env)
 * @param startsWith - Tiền tố mong muốn (ví dụ: "https://")
 * @returns Chuỗi đã được đảm bảo có tiền tố
 *
 * @example
 * ensureStartWith("my-store.myshopify.com", "https://")
 * // → "https://my-store.myshopify.com"
 *
 * ensureStartWith("https://my-store.myshopify.com", "https://")
 * // → "https://my-store.myshopify.com" (không thêm lần nữa)
 */
export function ensureStartWith(stringToCheck: string, startsWith: string) {
  return stringToCheck.startsWith(startsWith)
    ? stringToCheck
    : `${startsWith}${stringToCheck}`;
}

/**
 * createUrl - Ghép pathname và query params thành một URL hoàn chỉnh.
 *
 * Tại sao cần hàm này?
 * Trong Next.js, khi điều hướng (navigation), ta thường cần tạo URL từ 2 phần:
 *   1. pathname: đường dẫn trang (ví dụ: "/search")
 *   2. params: các tham số tìm kiếm (ví dụ: ?q=shoes&sort=price)
 * Hàm này tự động ghép 2 phần đó lại, và chỉ thêm dấu "?" khi thực sự có params.
 *
 * @param pathname - Đường dẫn trang (ví dụ: "/search", "/products")
 * @param params - Đối tượng chứa query parameters
 * @returns URL hoàn chỉnh dạng string
 *
 * @example
 * // Có params:
 * createUrl("/search", new URLSearchParams({ q: "shoes", sort: "price" }))
 * // → "/search?q=shoes&sort=price"
 *
 * // Không có params:
 * createUrl("/search", new URLSearchParams())
 * // → "/search" (không có dấu "?" thừa)
 */
export function createUrl(
  pathname: string,
  params: URLSearchParams | ReadonlyURLSearchParams,
) {
  // Chuyển params thành chuỗi, ví dụ: "q=shoes&sort=price"
  const paramsString = params.toString();

  // Nếu có params → thêm "?" phía trước, nếu không → để trống
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`;

  // Ghép pathname + queryString thành URL cuối cùng
  return `${pathname}${queryString}`;
}
