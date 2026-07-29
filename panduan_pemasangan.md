# Panduan Pemasangan Tanda Tangan Email HTML (MRA Group & MRA Media) di Microsoft Outlook

Panduan ini menjelaskan cara memasang berkas tanda tangan email HTML ke Microsoft Outlook (Desktop & Web) agar tampil interaktif dan profesional. Kami menyediakan 3 contoh berkas tanda tangan yang dapat Anda gunakan:
* **Contoh 1 (MRA Group)**: `signature.htm` (logo MRA Group, 16 logo unit bisnis, dan ikon gembok outline modern).
* **Contoh 2 (MRA Media)**: `signature_media.htm` (logo MRA Media, 9 logo media brand, dan ikon gembok outline modern).
* **Contoh 3 (MRA Group - Mockup Asli)**: `signature_v3.htm` (logo MRA Group, 16 logo unit bisnis, dan ikon gembok abu-abu metalik klasik dari mockup terbaru Anda).

---

## Persiapan Aset Berkas

Sebelum memasang ke Outlook, pastikan berkas-berkas berikut berada di dalam satu folder yang sama di komputer Anda:

### Untuk Contoh 1: MRA Group
1. `signature.htm` (berkas HTML utama)
2. `mra_logo.png` (logo utama MRA Group)
3. Folder `cropped_logos/` (berisi 16 berkas logo brand unit bisnis)
4. Ikon Kontak: `icon_pin.png`, `icon_phone.png`, `icon_globe.png`, `icon_padlock.png`

### Untuk Contoh 2: MRA Media
1. `signature_media.htm` (berkas HTML utama)
2. Folder `media_logos/` (berisi logo utama `mra_media_logo.png` dan 9 berkas logo media brand)
3. Ikon Kontak: `icon_pin.png`, `icon_phone.png`, `icon_globe.png`, `icon_padlock.png`

### Untuk Contoh 3: MRA Group (Personal Info)
1. `signature_v3.htm` (berkas HTML utama dengan data nama dan kontak personal)
2. `mra_logo.png` (logo utama MRA Group)
3. Folder `cropped_logos/` (berisi 16 berkas logo brand unit bisnis)
4. Ikon Kontak Kantor: `icon_pin.png`, `icon_phone.png`, `icon_globe.png`
5. Ikon Kontak Personal: `icon_personal_mail.png`, `icon_personal_phone.png`, `icon_personal_mobile.png`
6. Ikon Disclaimer: `icon_padlock.png` (gembok outline modern)

---

## 1. Pemasangan di Microsoft Outlook untuk Windows (Desktop)

Outlook Desktop menyimpan tanda tangan email di dalam folder sistem tersembunyi (`AppData`). Ikuti langkah mudah berikut untuk memasangnya secara langsung:

### Langkah 1: Buka Folder Signatures Outlook
1. Tekan tombol **Windows + R** pada keyboard Anda untuk membuka jendela *Run*.
2. Ketik perintah berikut dan tekan **Enter**:
   ```text
   %appdata%\Microsoft\Signatures
   ```
3. Folder khusus tanda tangan Outlook akan terbuka secara otomatis di File Explorer.

### Langkah 2: Salin Berkas Tanda Tangan
1. **Pilih salah satu contoh** tanda tangan yang ingin Anda gunakan.
2. Salin berkas tanda tangan terpilih beserta folder aset gambarnya ke dalam folder `Signatures` yang baru terbuka tersebut:
   * **Jika memilih Contoh 1**: Salin `signature.htm`, folder `cropped_logos`, serta berkas `icon_pin.png`, `icon_phone.png`, `icon_globe.png`, dan `icon_padlock.png`.
   * **Jika memilih Contoh 2**: Salin `signature_media.htm`, folder `media_logos`, serta berkas `icon_pin.png`, `icon_phone.png`, `icon_globe.png`, dan `icon_padlock.png`.
   * **Jika memilih Contoh 3**: Salin `signature_v3.htm`, folder `cropped_logos`, serta berkas `icon_pin.png`, `icon_phone.png`, `icon_globe.png`, `icon_personal_mail.png`, `icon_personal_phone.png`, `icon_personal_mobile.png`, dan `icon_padlock.png`.

### Langkah 3: Aktifkan di Microsoft Outlook
1. Buka aplikasi **Microsoft Outlook Desktop** Anda.
2. Buka menu **File** > **Options** > **Mail** > klik tombol **Signatures...**.
3. Anda akan melihat nama tanda tangan baru (**signature**, **signature_media**, atau **signature_v3**, sesuai nama file `.htm` yang Anda salin) sudah terdaftar di sana.
4. Pada bagian **Choose default signature**, pilih nama tanda tangan tersebut untuk **New messages** (email baru) dan **Replies/forwards** (balasan/terusan).
5. Klik **OK** untuk menyimpan pengaturan. Coba buat email baru untuk melihat hasilnya!

---

## 2. Pemasangan di Outlook Web App (OWA / Outlook Online)

Karena versi Web tidak dapat membaca file gambar lokal di komputer Anda secara otomatis, gambar-gambar logo tersebut harus **diunggah terlebih dahulu ke server web publik** (misal: `https://mra.co.id/images/`).

### Langkah 1: Ubah Tautan Gambar di Kode HTML
1. Buka file `signature.htm` menggunakan editor teks (seperti Notepad atau VS Code).
2. Cari tag gambar (`<img src="..."/>`) dan ganti dengan URL publik gambar Anda.
   * *Contoh:* Ubah `src="mra_logo.png"` menjadi `src="https://mra.co.id/images/mra_logo.png"`.
   * Lakukan hal yang sama untuk semua ikon kontak dan logo brand di dalam folder `cropped_logos/`.
3. Simpan (Save) perubahan file tersebut.

### Langkah 2: Salin dan Tempel ke Pengaturan Outlook Web
1. Buka berkas `signature.htm` di browser web Anda (seperti Google Chrome atau Microsoft Edge).
2. Tekan **Ctrl + A** untuk memilih seluruh tampilan tanda tangan, lalu tekan **Ctrl + C** untuk menyalin (copy).
3. Masuk ke akun email Anda di [Outlook Web](https://outlook.live.com/ atau https://outlook.office.com/).
4. Klik ikon **Settings (Gerigi)** di pojok kanan atas > **Mail** > **Compose and reply**.
5. Pada kotak teks **Email signature**, klik di dalamnya lalu tekan **Ctrl + V** untuk menempel (paste) tanda tangan.
6. Centang opsi untuk menyertakan tanda tangan secara otomatis pada email baru dan balasan.
7. Klik **Save**.

---

## Cara Mengubah Informasi Kontak & Tautan Brand

Jika Anda ingin mengubah nama gedung, alamat, nomor telepon, atau mengarahkan logo brand ke tautan situs web yang berbeda:
1. Klik kanan pada berkas `signature.htm` > pilih **Open with** > **Notepad**.
2. **Mengubah Kontak**: Cari teks `Wisma MRA, Jl. TB Simatupang` atau `6221 2765 1868` lalu edit sesuai informasi terbaru Anda.
3. **Mengubah Tautan Brand**: Cari baris logo yang diinginkan, lalu ubah alamat URL di dalam atribut `href="..."`.
   * *Contoh:* `<a href="https://www.bulgari.com" ...>` dapat diubah menjadi alamat situs web lain yang relevan.
4. Simpan file (`Ctrl + S`) dan pasang kembali ke folder Outlook Anda.
