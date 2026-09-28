# Folder Foto & Screenshot Project

Anda dapat menaruh file screenshot asli dari project Anda di dalam folder ini (`public/projects/`).

### Cara Menggunakan:
1. Simpan foto/screenshot project ke dalam folder ini dengan nama file yang rapi, contoh:
   - `noir-coffee.png`
   - `sakuin.png`
   - `lucky-bot.png`
   - `vortex-futsal.png`

2. Buka file `src/config/portfolioConfig.js` dan daftarkan nama repositori ke file gambar tersebut pada bagian `projectThumbnails`:

```javascript
projectThumbnails: {
  "Noir-Coffee": "/projects/noir-coffee.png",
  "sakuin": "/projects/sakuin.png",
  "Lucky-Bot-Tele": "/projects/lucky-bot.png",
  "VORTEX-FUTSAL": "/projects/vortex-futsal.png",
},
```

> **Catatan**: Jika project belum memiliki screenshot di folder ini, website secara otomatis menampilkan kartu preview resmi GitHub OpenGraph dari repositori aslinya.
