# NIHAYA — my little creative space ♡

Website portfolio/link-in-bio satu halaman untuk GitHub Pages.

## Isi
- `index.html` — halaman utama
- `style.css` — tampilan matcha/cream
- `script.js` — filter kategori, dark mode, slider foto di kartu karya, mode presentasi
- `assets/` — gambar preview karya

## Sebelum upload ke GitHub
1. Buka `index.html`.
2. Cari `data-placeholder="Instagram"` lalu ganti `href="#"` dengan URL Instagram pribadi.
3. Cari `data-placeholder="WhatsApp"` lalu ganti `href="#"` dengan link WhatsApp.
4. Kalau URL Live Website Detektif Flora berbeda, ganti URL di tombolnya.

## Deploy GitHub Pages
1. Buat repository baru, misalnya `nihaya-portfolio`.
2. Upload `index.html`, `style.css`, `script.js`, dan folder `assets`.
3. GitHub → Settings → Pages.
4. Source: `Deploy from a branch`.
5. Branch: `main` dan folder `/ (root)`.
6. Save.
7. Tunggu GitHub Pages membuat link.

Website ini sengaja dibuat tanpa framework agar mudah diedit dan gratis di GitHub Pages.

## PENTING: biar foto muncul di HP
- Upload ISI folder ini (index.html, style.css, script.js, assets/, .nojekyll) ke ROOT repository — jangan upload folder pembungkusnya.
- Nama file di GitHub Pages peka huruf besar/kecil. Jangan ubah nama file di folder assets tanpa mengubahnya juga di index.html.
- Setelah deploy, kalau foto belum muncul di HP: refresh / buka lewat tab incognito (cache).
