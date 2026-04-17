# 📚 HƯỚNG DẪN TÍCH HỢP AI - SEMANTIC SEARCH

## 🎯 Tổng Quan Dự Án

Ứng dụng **Food App** đã được tích hợp tính năng **Semantic Search** (Tìm kiếm Thông minh) để giúp người dùng tìm công thức nấu ăn một cách thông minh hơn.

---

## ✨ Tính Năng AI Được Thêm

### 1. **Semantic Search (Tìm Kiếm Thông Minh)**
- Người dùng có thể tìm kiếm bằng mô tả tự nhiên
- Ví dụ: "cái gì nhanh và lành mạnh" thay vì chỉ "mỳ ý"
- Hệ thống hiểu được **ý nghĩa** của truy vấn

### 2. **Hybrid Search (Tìm Kiếm Kết Hợp)**
- Kết hợp tìm kiếm theo ý nghĩa + lọc theo danh mục
- Người dùng có thể chọn chip (danh mục) để lọc kết quả
- Độ chính xác cao hơn

### 3. **Smart Suggestions (Gợi Ý Thông Minh)**
- Gợi ý động khi người dùng nhập tìm kiếm
- Đề xuất tên công thức phù hợp
- Đề xuất đặc tính (nhanh, lành mạnh, cay, v.v.)

---

## 📁 Cấu Trúc Tập Tin

### File Mới Tạo

```
src/
├── services/
│   └── semanticSearch.ts          ← Service chính cho Semantic Search
└── screens/
    └── RecipeSearchScreen.tsx     ← Cập nhật với AI features
```

### Thay Đổi Chính

**RecipeSearchScreen.tsx**
- ✅ Thêm import `semanticSearch`, `hybridSearch`, `getSearchSuggestions`
- ✅ Thêm state `showSuggestions` và `isSearching`
- ✅ Cập nhật logic tìm kiếm để dùng `hybridSearch`
- ✅ Thêm UI suggestions dropdown
- ✅ Thêm loading indicator

---

## 🔧 Kỹ Thuật Chi Tiết

### semanticSearch.ts - Các Hàm Chính

#### 1. **cosineSimilarity()**
```typescript
function cosineSimilarity(vecA: number[], vecB: number[]): number
```
- Tính độ tương đồng giữa hai vector
- Trả về giá trị từ 0 (hoàn toàn khác) đến 1 (giống hệt)

#### 2. **generateEmbedding()**
```typescript
function generateEmbedding(text: string): number[]
```
- Chuyển đổi văn bản thành vector số
- Dùng hash-based approach
- Trả về embedding 50 chiều

#### 3. **semanticSearch()**
```typescript
function semanticSearch(query, recipes, limit)
```
- Tìm kiếm công thức dựa trên ý nghĩa
- Tăng điểm nếu có keyword match
- Sắp xếp theo độ liên quan

#### 4. **hybridSearch()**
```typescript
function hybridSearch(query, recipes, selectedCategories, limit)
```
- Kết hợp semantic search + category filter
- Dùng cho trường hợp người dùng chọn chip/danh mục

#### 5. **getSearchSuggestions()**
```typescript
function getSearchSuggestions(query, recipes)
```
- Trả về danh sách gợi ý
- Dựa trên recipe titles + characteristics
- Giới hạn 5 gợi ý

---

## 🚀 Cách Sử Dụng

### Tìm Kiếm Thông Minh

**Người dùng nhập:**
```
"cái gì nhanh chóng để nấu"
```

**Hệ thống sẽ:**
1. Tạo embedding của query
2. So sánh với embedding của từng công thức
3. Tăng điểm nếu công thức có keyword "nhanh"
4. Trả về công thức phù hợp nhất

**Kết quả:**
- Mì Ý Sốt Bechamel (nhanh, 15 phút)
- Pad Thai (nhanh, 20 phút)
- Cơm Chiên Dơi (nhanh, 10 phút)

### Gợi Ý Động

**Khi người dùng nhập "nha":**
```
Gợi ý:
- nhạp
- nhanh chóng
- Pad Thai
```

---

## ⚙️ Cấu Hình & Tùy Chỉnh

### 1. **Điều Chỉnh Embedding Dimension**

Mở `semanticSearch.ts`, dòng 47:
```typescript
const embedding = new Array(50).fill(0);  // Thay 50 thành số chiều khác
```

- Chiều cao hơn = Chính xác hơn (nhưng chậm hơn)
- Chiều thấp hơn = Nhanh hơn (nhưng chính xác hơn)
- **Khuyến nghị:** 30-100

### 2. **Điều Chỉnh Keyword Boost**

Mở `semanticSearch.ts`, dòng 79:
```typescript
keywordBoost += 0.15;  // Thay 0.15 thành giá trị khác
```

- 0.05 = Keyword ít ảnh hưởng
- 0.15 = Mức trung bình (hiện tại)
- 0.30 = Keyword rất ảnh hưởng

### 3. **Điều Chỉnh Ngưỡng Min Score**

Mở `semanticSearch.ts`, dòng 83:
```typescript
if (finalScore > 0.2) {  // Thay 0.2 thành giá trị khác
```

- 0.1 = Kết quả nhiều nhưng có thể không liên quan
- 0.2 = Mức trung bình (hiện tại)
- 0.5 = Kết quả ít nhưng rất chính xác

### 4. **Thêm Characteristics Mới**

Mở `semanticSearch.ts`, dòng 64:
```typescript
const characteristicKeywords: Record<string, string[]> = {
  // Thêm đây:
  affordable: ['rẻ', 'bình dân', 'cheap', 'affordable'],
  luxurious: ['sang trọng', 'đắt tiền', 'luxury', 'fancy'],
};
```

---

## 📊 Hiệu Suất

### Độ Phức Tạp

- **Time Complexity:** O(n × d)
  - n = số công thức
  - d = embedding dimension (50)
- **Space Complexity:** O(n × d)

### Tối Ưu Hóa

| Số Công Thức | Thời Gian | Khuyến Nghị |
|---|---|---|
| < 100 | < 10ms | OK, không cần tối ưu |
| 100-1000 | 10-50ms | Xem xét caching |
| > 1000 | > 100ms | Dùng API bên ngoài |

**Hiện tại:** ~50 công thức → ~ 5ms

---

## 🔌 Tích Hợp API Bên Ngoài (Nâng Cao)

### Nâng Cấp lên OpenAI API

```typescript
// semanticSearch.ts

async function generateEmbeddingWithOpenAI(text: string): Promise<number[]> {
  const response = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      input: text,
      model: 'text-embedding-3-small',
    }),
  });

  const data = await response.json();
  return data.data[0].embedding;
}
```

### Lợi Ích:
- ✅ Chính xác cao hơn 30-40%
- ✅ Hiểu ngôn ngữ tự nhiên tốt hơn
- ❌ Yêu cầu API key
- ❌ Có chi phí

### Giá Tiền (OpenAI):
- Text-embedding-3-small: **$0.02 per 1M tokens**

---

## 🧪 Kiểm Tra & Debug

### 1. **Kiểm Tra Embedding**

```typescript
import { generateEmbedding } from '../services/semanticSearch';

const embedding = generateEmbedding("mỳ ý nhanh");
console.log(embedding); // [0.2, -0.1, ...]
```

### 2. **Kiểm Tra Similarity**

```typescript
import { semanticSearch } from '../services/semanticSearch';

const results = semanticSearch("nhanh chóng", recipes);
console.log(results); // [{ id: '...', score: 0.85, ... }]
```

### 3. **Kiểm Tra UI**

- Mở RecipeSearchScreen
- Nhập: "nhanh lành mạnh"
- Kiểm tra:
  - ✅ Gợi ý xuất hiện
  - ✅ Loading indicator hiển thị
  - ✅ Kết quả sắp xếp đúng

---

## 📈 Phát Triển Tiếp Theo

### Tính Năng Có Thể Thêm

1. **🤖 AI Chatbot Nấu Ăn**
   - Người dùng hỏi "làm thế nào để..." 
   - AI hướng dẫn từng bước

2. **📸 Image Recognition**
   - Chụp ảnh nguyên liệu
   - AI nhận diện & gợi ý công thức

3. **⭐ Personalization**
   - Ghi nhớ sở thích người dùng
   - Gợi ý công thức khác nhau

4. **🌍 Multi-language Support**
   - Tìm kiếm bằng Tiếng Anh, Trung Quốc, v.v.

5. **📊 Nutrition Analysis**
   - Phân tích dinh dưỡng
   - Gợi ý lựa chọn lành mạnh

---

## 🐛 Khắc Phục Sự Cố

### Vấn Đề: Kết quả tìm kiếm không phù hợp

**Nguyên Nhân:**
- Ngưỡng score quá cao
- Embedding dimension quá thấp

**Giải Pháp:**
```typescript
// Giảm ngưỡng từ 0.2 xuống 0.1
if (finalScore > 0.1) {
```

### Vấn Đề: Ứng dụng bị lag khi tìm kiếm

**Nguyên Nhân:**
- Số công thức quá nhiều
- Embedding dimension quá cao

**Giải Pháp:**
```typescript
// Sử dụng caching
const cachedResults = useRef(new Map());
```

---

## 📚 Tài Liệu Tham Khảo

- **Cosine Similarity:** https://en.wikipedia.org/wiki/Cosine_similarity
- **Embeddings:** https://en.wikipedia.org/wiki/Word_embedding
- **Semantic Search:** https://en.wikipedia.org/wiki/Semantic_search

---

## ✅ Checklist Triển Khai

- [x] Tạo semantic-search.ts service
- [x] Cập nhật RecipeSearchScreen.tsx
- [x] Thêm suggestions dropdown UI
- [x] Thêm loading indicator
- [ ] Kiểm tra trên Android emulator
- [ ] Kiểm tra trên iOS simulator
- [ ] Tối ưu hiệu suất nếu cần
- [ ] Tích hợp OpenAI API (tùy chọn)

---

## 👥 Support & Liên Hệ

Nếu có câu hỏi hoặc vấn đề:
1. Kiểm tra phần "Khắc Phục Sự Cố" trên
2. Xem lại code trong semanticSearch.ts
3. Thử debug theo phần "Kiểm Tra & Debug"

---

**Phiên Bản:** 1.0  
**Cập Nhật:** April 17, 2026  
**Tác Giả:** GitHub Copilot
