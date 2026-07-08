# 🤖 AI Assistant Website

Website Asisten AI profesional yang dibangun menggunakan **React JS + Vite**, dilengkapi fitur chat multi-percakapan, autentikasi pengguna, prompt library, bookmark, dark mode, dan integrasi langsung dengan **Google Gemini API**.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3-38BDF8?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Fitur Utama

- 💬 **Chat dengan AI** — percakapan real-time dengan Google Gemini API
- 🗂️ **Multi Conversation** — kelola banyak percakapan sekaligus, judul otomatis dari pesan pertama
- 📝 **Markdown Rendering** — balasan AI dirender rapi (heading, list, bold, dll)
- 💻 **Syntax Highlight** — blok kode ditampilkan dengan pewarnaan seperti VS Code
- 📚 **Prompt Library** — simpan & pakai ulang template prompt favorit
- ⭐ **Bookmark** — tandai balasan AI penting agar mudah ditemukan lagi
- 🔐 **Login & Register** — autentikasi pengguna dengan validasi form
- 📊 **Dashboard** — ringkasan statistik & percakapan terbaru
- 🌙 **Dark Mode** — beralih tema gelap/terang secara instan
- 📱 **Responsive Design** — nyaman digunakan di desktop maupun mobile
- ⚡ **Optimized Performance** — lazy loading, memoization, error boundary

---

## 🛠️ Teknologi yang Digunakan

### Frontend

- [React JS](https://react.dev/) — library UI utama
- [Vite](https://vitejs.dev/) — build tool super cepat
- [React Router DOM](https://reactrouter.com/) — routing & navigasi
- [Tailwind CSS](https://tailwindcss.com/) — utility-first styling
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — form & validasi
- [Axios](https://axios-http.com/) — HTTP client
- [Lucide React](https://lucide.dev/) — icon set
- [React Markdown](https://github.com/remarkjs/react-markdown) — render Markdown
- [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter) — highlight kode

### AI

- [Google Gemini API](https://ai.google.dev/) — model bahasa untuk balasan chat

---

## 📁 Struktur Folder

```
src/
├── assets/          # Gambar, ikon, font
├── components/       # Komponen reusable (Button, Card, Modal, Navbar, Sidebar, dll)
├── pages/            # Halaman (Dashboard, Chat, Login, Register, dll)
├── layouts/          # Struktur layout (MainLayout)
├── context/           # Context API (Auth, Chat, Theme, Prompt, Bookmark)
├── hooks/             # Custom hooks (useTheme)
├── services/          # Pemanggilan API (aiService)
└── utils/             # Fungsi bantu
```

---

## 🚀 Cara Menjalankan Project

### 1. Clone repository

```bash
git clone https://github.com/zaenalyahya07/zai-ai-project.git
cd zai-ai-project
```

### 2. Install dependencies

```bash
npm install
```

### 3. Siapkan Environment Variable

Buat file `.env` di root folder, isi dengan API Key Google Gemini kamu:

```env
VITE_AI_API_KEY=isi_api_key_gemini_kamu_disini
VITE_AI_API_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
```

> Dapatkan API Key gratis di [Google AI Studio](https://aistudio.google.com/app/apikey).

### 4. Jalankan project

```bash
npm run dev
```

Buka `http://localhost:5173` di browser.

---

## 🏗️ Build untuk Production

```bash
npm run build
```

Hasil build akan tersedia di folder `dist/`, siap untuk di-deploy.

---

## 🌐 Deployment

Project ini siap di-deploy ke **Vercel** atau **Netlify**. Jangan lupa tambahkan environment variable (`VITE_AI_API_KEY` dan `VITE_AI_API_URL`) di pengaturan project pada platform hosting yang dipilih.

---

## 📌 Catatan

- Autentikasi (Login/Register) saat ini disimpan sementara di `localStorage` browser (belum terhubung ke database sungguhan). Cocok untuk demo/portofolio, namun untuk penggunaan produksi disarankan menghubungkan ke backend (Node.js + Express + MongoDB) dengan autentikasi berbasis token.
- Pastikan API Key Gemini tidak dibagikan secara publik dan file `.env` tidak ikut ter-commit ke repository (sudah diatur dalam `.gitignore`).

---

## 📄 Lisensi

Project ini dibuat untuk tujuan pembelajaran dan pengembangan portofolio. Bebas digunakan dan dimodifikasi sesuai kebutuhan.

---

<p align="center">Dibuat dengan ❤️ menggunakan React JS</p>
