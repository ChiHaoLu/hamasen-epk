# 濱線 Hamasen H.M.S — EPK

> EPK 電子新聞資料袋準備清單

Electronic Press Kit 網站。單頁 HTML，支援中文 / English / 日本語三語切換，瀏覽器自動偵測語言。

## 內容

- 樂團簡介（中文 + 英文版本）
- 音樂風格描述與代表作連結
- 高解析度照片（至少 3–5 張）
- Demo 或現場演出錄音連結
- 過往演出紀錄（場地、日期）
- 獎項（街聲編輯推薦、週排行、Song of Day?、比賽）
- 社群媒體連結與追蹤數
- 聯絡人姓名與 Email

## Usage

### 更新`script.js` 頂端的資料陣列

- 推薦試聽曲目：`TRACKS`
- 現場影片：`VIDEOS`
- 社群連結（Spotify、YouTube）：`SOCIAL`

### 更新引言來源（可選）

目前 3 個語言區塊的引言來源都是 `— 2026 —`。
若日後有媒體評論或具名引用，可替換為：

```html
<div class="quote-note">— 媒體名稱 / 評論者 · 2026 —</div>
```