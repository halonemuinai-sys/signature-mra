---
name: mra-email-signature-cms
description: >-
  Panduan dan petunjuk teknis pengembangan, pengelolaan, generator, dan pemeliharaan templat tanda tangan email korporat MRA Group beserta aplikasi web CMS Studio.
---

# MRA Email Signature & CMS Studio

Petunjuk teknis dan panduan alur kerja (*workflow*) untuk mengembangkan, mengedit, memverifikasi, dan mengelola templat tanda tangan email HTML MRA Group dan aplikasi web generator CMS Studio.

---

## 📌 Ringkasan Proyek

Proyek ini bertujuan untuk menyediakan tanda tangan email korporat yang responsif, sesuai standar visual MRA Group, kompatibel dengan Microsoft Outlook & Apple Mail, serta dilengkapi aplikasi web CMS interaktif untuk karyawan/admin.

### 🌐 Repositori GitHub & CDN
* **GitHub Repository**: `https://github.com/halonemuinai-sys/signature-mra.git`
* **CDN Base URL**: `https://cdn.jsdelivr.net/gh/halonemuinai-sys/signature-mra@main/`

---

## 📂 Struktur Berkas Utama

```
d:\Ares Project\Signature Project\
├── index.html                   # Dashboard Utama CMS Studio (Blue & White Theme)
├── css/
│   └── cms.css                  # Sistem Styling Blue & White, Cards, & Animation
├── js/
│   └── cms.js                   # Engine Generator Tanda Tangan, Drag & Drop, & Presets
├── package.json                 # Konfigurasi npm & script 'npm run dev'
├── verify_signature.py          # Skrip verifikasi kelengkapan aset & tautan HTML
│
├── cropped_logos/               # Aset Logo Brand Terpotong (PNG Transparan)
│   ├── brand_01_bvlgari.png
│   ├── brand_02_omega.png
│   ├── brand_04_chronologie.png
│   └── ...
├── media_logos/                 # Aset Logo Divisi Media & Digital (PNG Transparan)
│   ├── mra_media_logo.png
│   └── ...
│
├── signature.htm                # Templat V1 Klasik (3 Kolom • 17 Brand)
├── signature_v2.htm             # Templat V2 Standar (3 Kolom • 13 Brand)
├── signature_v2_wide.htm        # Templat V2 Wide Horizontal (840px • Aksen Emas)
├── signature_v3.htm             # Templat V3 Kontak Personal (3 Kolom)
├── signature_media.htm          # Templat MRA Media V1
├── signature_media_v2.htm       # Templat MRA Media V2
└── signature_v4_premier.htm     # Templat V4 Premier Modern Card Layout
```

---

## 🎨 Spesifikasi Templat Signature

### 1. Templat Korporat Utama:
* **`signature_v4_premier.htm`** (*Corporate V4 Premier*):
  * Desain bergaya kartu modern (*Modern Card Layout*, 840px).
  * Area identitas kiri (Logo MRA + Nama + Jabatan), area kontak kanan dengan ikon emas HD.
  * Grid logo brand 2-baris simetris + *Confidentiality Notice Card*.
* **`signature_v2_wide.htm`** (*Corporate Wide Horizontal*):
  * Layout horizontal 840px dengan divider emas (`#c89b3a`), logo MRA 125px, dan 13 brand tanpa border garis antar logo.
* **`signature_v3.htm`** (*Corporate V3 Personal*):
  * Layout 832px 3-kolom dilengkapi rincian kontak personal karyawan (Nama, Jabatan, Email, No. HP).

---

## 💻 Aplikasi Web CMS Studio

### Fitur Utama Dashboard (`index.html`):
1. **Pilihan Templat Seragam**:
   * `Corporate V4 Premier — Modern Card Layout`
   * `Corporate Wide — Horizontal Gold`
   * `Corporate V2 — 13 Brand`
   * `Corporate V1 — 17 Brand`
   * `Corporate V3 — Personal Detail`
2. **Skema Warna Studio**:
   * Kombinasi warna **Biru & Putih (Blue & White Theme)** dengan latar belakang putih bersih (`#ffffff`), aksen *Corporate Royal Blue* (`#2563eb`), dan teks *Dark Navy* (`#0f172a`).
3. **Reposisi Logo Brand Interaktif**:
   * **Click-to-Swap**: Klik 1x pada logo A, lalu klik logo B pada preview untuk saling menukar posisi secara instan.
   * **Drag & Drop Canvas**: Geser dan lepaskan logo langsung di kotak *Live Preview Signature*.
   * **Tombol Panah `◄` / `►`**: Geser posisi logo satu per satu dari panel kiri.
4. **Penyimpanan Preset & Ekspor**:
   * **Copy for Outlook**: Menyalin tanda tangan visual (Rich Text) siap paste ke Microsoft Outlook.
   * **Copy HTML / Download `.htm`**: Menyalin kode sumber atau mengunduh file `.htm`.
   * **Save Preset**: Menyimpan profil draf tanda tangan ke LocalStorage.

---

## 🛠️ Perintah Pengoperasian & Verifikasi

### Jalankan Server Lokal:
```bash
npm run dev
# Server aktif di http://localhost:3000
```

### Verifikasi Kelengkapan Aset & Tautan HTML:
```bash
python scratch/verify_signature.py
```

### Sinkronisasi Git & CDN:
```bash
git add .
git commit -m "Update signature templates and CMS studio"
git push origin main
```

---

## ⚠️ Panduan Keselarasan Outlook & Email Client

1. **Struktur Tabel Kaku**: Selalu gunakan elemen `<table>`, `<tr>`, dan `<td>` bertingkat dengan `cellpadding="0"`, `cellspacing="0"`, `border="0"`, dan `style="border-collapse: collapse;"`.
2. **Gaya In-Line CSS**: Semua gaya warna, ukuran font, dan margin harus ditulis sebagai *inline CSS* pada setiap tag HTML.
3. **Dimensi Gambar Eksplisit**: Tag `<img>` wajib menyertakan atribut `width="..." height="..."` serta inline style `style="display: block; width: ...px; height: ...px; border: 0;"` untuk mencegah gambar membengkak di Outlook Desktop.
