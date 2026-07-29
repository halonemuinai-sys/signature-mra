# Panduan Pemasangan Tanda Tangan Email HTML (MRA Group & MRA Media) di Microsoft Outlook

Seluruh gambar dalam tanda tangan email ini **telah berhasil diunggah ke GitHub** dan dimuat menggunakan **jsDelivr CDN** (`https://cdn.jsdelivr.net/gh/halonemuinai-sys/signature-mra@main/`).

Dengan menggunakan tautan CDN ini:
* **Bebas Masalah Lampiran**: Email Anda tidak akan memuat lampiran file gambar (0 attachments) di penerima seperti Yahoo Mail, Gmail, dan Apple Mail.
* **Pemasangan Sangat Mudah**: Anda **hanya perlu menyalin file `.htm` saja** tanpa perlu menyalin folder gambar atau file ikon apa pun ke folder sistem komputer Anda.

Kami menyediakan 3 contoh berkas tanda tangan yang dapat Anda gunakan:
* **Contoh 1 (MRA Group Korporat)**: `signature.htm` (lebar 832px, memuat 16 logo unit bisnis).
* **Contoh 2 (MRA Media Divisi)**: `signature_media.htm` (lebar 766px, memuat 9 logo media brand).
* **Contoh 3 (MRA Group Personal)**: `signature_v3.htm` (lebar 1053px, memuat kartu nama personal Aris Setiyono dan 16 logo unit bisnis).

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
1. **Pilih berkas tanda tangan** yang ingin Anda gunakan:
   * `signature.htm` (Contoh 1)
   * `signature_media.htm` (Contoh 2)
   * `signature_v3.htm` (Contoh 3)
2. Salin file `.htm` pilihan Anda tersebut dan **tempelkan (paste) langsung** ke dalam folder `Signatures` yang baru terbuka tadi.
   *(Catatan: Anda tidak perlu menyalin folder gambar atau ikon lainnya karena semua gambar sudah terhubung secara online).*

### Langkah 3: Aktifkan di Microsoft Outlook
1. Buka aplikasi **Microsoft Outlook Desktop** Anda.
2. Buka menu **File** > **Options** > **Mail** > klik tombol **Signatures...**.
3. Anda akan melihat nama tanda tangan baru (**signature**, **signature_media**, atau **signature_v3**, sesuai nama file `.htm` yang Anda salin) sudah terdaftar di daftar tanda tangan.
4. Pada bagian **Choose default signature**, pilih nama tanda tangan tersebut untuk **New messages** (email baru) dan **Replies/forwards** (balasan/terusan).
5. Klik **OK** untuk menyimpan pengaturan. Coba buat email baru untuk melihat hasilnya!

---

## 2. Pemasangan di Outlook Web App (OWA / Outlook Online)

Karena berkas gambar sudah dihosting secara online di GitHub CDN, Anda dapat menggunakannya di Outlook Web dengan cara menyalin tampilannya:

1. Klik ganda file `.htm` pilihan Anda (misalnya `signature_v3.htm`) untuk membukanya di browser web (Chrome/Edge).
2. Tekan **Ctrl + A** untuk memilih seluruh tampilan tanda tangan, lalu tekan **Ctrl + C** untuk menyalinnya.
3. Buka **Outlook Web** di browser Anda, masuk ke **Settings (ikon gigi)** > **Mail** > **Compose and reply** > **Signatures**.
4. Buat tanda tangan baru, klik pada kotak editor teks, lalu tekan **Ctrl + V** untuk menempelkan tanda tangan yang telah disalin.
5. Klik **Save**. Tanda tangan siap digunakan dan bebas dari masalah lampiran!
