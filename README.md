# Hilal Şuheda Eser — Full-Stack Developer Portfolio

Minimalist, monokrom, karanlık/aydınlık mod destekli, iki dilli (Türkçe & İngilizce) ve tam SEO uyumlu kişisel portföy web sitesi.

---

## 🎯 Tasarım Felsefesi

* **Yapay Zekâ ve Şablon Klişelerinden Uzak:** Abartılı sayaçlar ("+3 yıl deneyim", "1 adet TÜBİTAK" gibi yapay kutular) ve sahte kod etiketleri (`// 01. Overview`) tamamen kaldırılarak, gerçek bir mühendisin elinden çıkmış sade, odaklanmış ve olgun bir arayüz kurgulandı.
* **Monokrom & Yüksek Kontrast:** Göz yoran renklerden arındırılmış, iş hayatına uygun saf siyah, beyaz ve antrasit renk paleti.
* **Ölçülü & Profesyonel İçerik:** TÜBİTAK veya kurum isimleri girişte ısrarcı bir şekilde öne çıkarılmak yerine, yalnızca ilgili projenin (SmartCry) teknik detayında doğal ve mütevazı bir şekilde belirtildi.
* **Karanlık & Aydınlık Mod:** Tek tıkla tema değişimi, `localStorage` ve `prefers-color-scheme` entegrasyonu.
* **İki Dilli Mimari (i18n):** Türkçe ve İngilizce arasında anında kesintisiz geçiş; arama motoru meta etiketleri ve başlıklar dahil senkronize çeviri.
* **Baskı / PDF CV Desteği:** "Özgeçmişi İndir (PDF)" butonuna tıklandığında veya `Ctrl + P` yapıldığında gezinme öğelerini gizleyerek doğrudan resmi bir CV dokümanı formatında çıktı verir.

---

## 📁 Proje Dosya Yapısı

```
hilal-portfolio/
├── index.html            # Semantik, erişilebilir ve SEO dostu ana şablon
├── robots.txt            # Arama motoru yönergeleri
├── sitemap.xml           # Çok dilli site haritası
├── css/
│   └── style.css         # Monokrom renk sistemi, Dark/Light temalar, print stilleri
├── js/
│   ├── translations.js   # Doğal, profesyonel Türkçe & İngilizce metin veritabanı
│   └── main.js           # Tema geçişi, i18n motoru, filtreleme ve UX
└── README.md             # Dokümantasyon
```

---

## 💻 Yerel Olarak Çalıştırma

Herhangi bir harici kütüphane veya Node paketi gerekmez (saf HTML, CSS, JavaScript).

`index.html` dosyasını doğrudan tarayıcınızda çift tıklayarak açabilir veya terminalden yerel sunucu başlatabilirsiniz:
```bash
cd "C:\Users\hsuhe\.gemini\antigravity\scratch\hilal-portfolio"
python -m http.server 8000
```
Tarayıcınızdan `http://localhost:8000` adresine gidin.
