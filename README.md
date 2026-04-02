# 濱線 Hamasen H.S.M — EPK

Electronic Press Kit 網站。單頁 HTML，支援中文 / English / 日本語三語切換，瀏覽器自動偵測語言。

## TODO

### 1. 推薦試聽曲目（3 首 × 3 語言 = 9 處）

每個語言區塊各有 3 首，結構相同。以中文區塊為例（行號約 586–604）：

```html
<a class="track-item" href="#">                   ← 替換 href 為串流連結
  <span class="track-num">01</span>
  <span class="track-title">Song Title Placeholder</span>   ← 替換曲名
  <span class="track-meta">Demo · 2026</span>               ← 可改為發行年份或類型
</a>
```

需要的資訊（每首）：
- 曲名（中文 / 英文 / 日文，或統一用同一個）
- 串流或試聽連結（街聲、SoundCloud、Spotify 等）
- 類型標籤（Demo / Live / Single 等）


### 2. 現場影片（3 支 × 3 語言 = 9 處）

每個語言區塊各有 3 支，結構相同。以英文區塊為例（行號約 794–818）：

```html
<a class="video-item" href="#">                             ← 替換 href 為 YouTube 連結
  <div class="video-play">▶</div>
  <div class="video-info">
    <div class="video-title">Performance Title Placeholder</div>  ← 替換演出名稱
    <div class="video-meta">Venue · 2026</div>                    ← 替換場地 · 年份
  </div>
</a>
```

需要的資訊（每支）：
- 演出名稱或曲名
- 場地名稱與年份
- YouTube 或其他影片連結


### 3. 社群連結（Spotify、YouTube）

目前 `href="#"` 的連結有 2 個平台 × 3 語言 = **6 處**，搜尋 `href="#"` 即可找到全部：

| 平台 | 待填入內容 |
|------|-----------|
| Spotify | 藝人頁面網址，例如 `https://open.spotify.com/artist/...` |
| YouTube | 頻道網址，例如 `https://www.youtube.com/@thehamasen` |


### 4. 引言來源（可選）

目前 3 個語言區塊的引言來源都是 `— 2026 —`（行號約 666、826、986）。
若日後有媒體評論或具名引用，可替換為：

```html
<div class="quote-note">— 媒體名稱 / 評論者 · 2026 —</div>
```