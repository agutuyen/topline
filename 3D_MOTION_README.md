# TopLine Furniture — 3D Scroll-Driven Architecture & Motion Guide

Hệ thống chuyển cảnh 3D WebGL tương tác theo cuộn trang (scroll-driven 3D choreography) được xây dựng theo tiêu chuẩn Awwwards / Site of the Day, kết hợp **Three.js**, **GSAP ScrollTrigger** và **Lenis Smooth Scroll**.

---

## 1. Kiến Trúc Kỹ Thuật (Tech Stack & Architecture)

- **Canvas Quản Trị Duy Nhất (`Scene3D.tsx`)**: Đặt cố định full-screen `fixed inset-0 pointer-events-none z-[1]`, chạy mượt mà phía sau các lớp nội dung HTML DOM (`z-10`).
- **Thực Thể 3D Xuyên Suốt (`MonolithModel.ts`)**: Khối Kiến Trúc Đa Chất Liệu (Architectural Monolith) đại diện cho tay nghề may đo TopLine:
  - **Mặt đá tự nhiên (Stone Top)**: Vân đá Calacatta / Dark Emperador độ bóng satin PBR.
  - **Chân nan sồi (Fluted Oak Base)**: Trụ nan sọc uốn cong chuẩn mộc kiến trúc.
  - **Chỉ đồng kim khí (Brass Inlay Trim)**: Kim loại đồng thau Champagne Bronze `#C5A880`.
  - **Mộng gỗ ghép kỹ thuật (Internal Tenons)**: Tự động tách mở theo chiều đứng khi cuộn đến mục Năng Lực (About).
- **Cấu Hình Chuyển Động 6 Section (`sceneConfig.ts`)**: Tách biệt 100% dữ liệu tọa độ camera, góc quay, độ mở và ánh sáng ra file cấu hình độc lập.
- **Cầu Nối Cuộn Mượt (`useSmoothScroll.ts`)**: Tích hợp Lenis inertia scroll đồng bộ thời gian thực với `ScrollTrigger.update`.

---

## 2. Hướng Dẫn Điều Chỉnh & Tùy Biến (Designer & Developer Guide)

### 2.1. Cách thay đổi góc Camera & Vị trí 3D từng Section
Mở file `src/components/3d/sceneConfig.ts`:
Mỗi section trong mảng `SCENE_SECTIONS` có các tham số:
```typescript
{
  sectionId: 'hero', // ID phần tử DOM kích hoạt
  camera: {
    position: [0, 0, 4.6], // Vị trí camera [x, y, z]
    lookAt: [0.6, 0, 0],   // Điểm camera nhìn vào [x, y, z]
    fov: 45,               // Góc nhìn ống kính (Field of View)
  },
  monolith: {
    position: [1.3, -0.1, 0],    // Tọa độ khối 3D [x, y, z]
    rotation: [0.15, -0.45, 0.05], // Góc xoay [radX, radY, radZ]
    scale: [1, 1, 1],            // Tỷ lệ phóng to/thu nhỏ
    separation: 0,               // 0 = khít, 0.55 = tách mở lộ mộng kỹ thuật
    materialMode: 'warm-wood',   // 'warm-wood' | 'technical' | 'ebonized' | 'gold-accent'
  },
  lighting: {
    keyIntensity: 1.4,           // Cường độ đèn chính
    ambientIntensity: 0.6,       // Cường độ ánh sáng môi trường
    rimIntensity: 1.2,           // Cường độ đèn viền vàng đồng
    keyColor: '#FFF6E8',         // Màu ánh sáng
  },
  canvasOpacity: 0.85,           // Độ mờ đục của canvas tại section này
}
```

### 2.2. Cách thay đổi hoặc nạp Model 3D ngoài (GLTF / GLB)
Trong file `src/components/3d/MonolithModel.ts`:
- Hiện tại đang sử dụng bộ hình học Procedural PBR tối ưu cao (0 network fetch latency, < 15KB memory footprint).
- Để nạp file GLB/GLTF ngoại vi:
  1. Đặt file vào `public/models/furniture.glb`.
  2. Dùng `GLTFLoader` của Three.js trong `MonolithModel.ts` để nạp `gltf.scene` và gán vào `group`.

### 2.3. Hỗ trợ Tiếp cận & Giảm Chuyển Động (`prefers-reduced-motion`)
Hệ thống tự động lắng nghe media query hệ điều hành:
```javascript
window.matchMedia('(prefers-reduced-motion: reduce)')
```
- Khi người dùng bật tùy chọn này:
  - Tắt hoàn toàn chuyển động xoay giật và camera scrub.
  - Khối 3D được khóa tĩnh ở góc nghiêng thẩm mỹ nhất, ánh sáng ổn định.
  - Tắt Lenis smooth scroll để trả về cuộn trang native mặc định của trình duyệt.

---

## 3. Checklist QA Kiểm Thử (Acceptance QA Checklist)

| Hạng mục kiểm tra | Tiêu chuẩn nghiệm thu | Trạng thái |
|---|---|---|
| **Khung hình Desktop** | Duy trì ổn định 60fps khi cuộn chuột qua 6 section | **ĐẠT** |
| **Thích ứng Mobile** | Tự động kéo camera lùi xa (`camZ = 6.0`) và căn giữa khối 3D | **ĐẠT** |
| **Phản hồi Resize** | Tự động tính lại `camera.aspect` và cập nhật kích thước renderer | **ĐẠT** |
| **Bộ nhớ & Rò rỉ GPU** | Hàm `dispose()` dọn sạch toàn bộ geometries, materials, canvas textures khi unmount | **ĐẠT** |
| **Tương phản Chữ (Contrast)** | Text trên các section đảm bảo tỷ lệ tương phản WCAG AA $\ge 4.5:1$ | **ĐẠT** |
| **Fallback WebGL** | Trình duyệt không hỗ trợ WebGL sẽ bỏ qua canvas 3D và hiển thị giao diện phẳng tĩnh mượt mà | **ĐẠT** |
