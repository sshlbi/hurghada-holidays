# Hurghada Holidays — React + Tailwind

نسخة React (Vite) + Tailwind CSS من موقع Hurghada Holidays، بنفس كل الوظائف الموجودة في النسخة الأصلية (HTML/CSS/JS في ملف واحد): معالج الحجز بخطواته الست، دعم اللغات الثلاث EN/DE/AR (مع RTL كامل للعربي)، تحويل العملة USD/EUR/EGP بأسعار صرف حية، اختيار الفنادق والأنشطة والنقل، صفحة التقييمات، وربط Google Sheets للحجوزات والتقييمات — كله محفوظ زي ما هو.

## قبل التشغيل: الصور

المشروع بيستدعي الصور بنفس المسارات اللي كانت في الموقع الأصلي، يعني لازم تحط ملفات الصور دي في `public/assets/images/`:

```
hero.jpg
resort-1.jpg … resort-6.jpg
act-snorkel.jpg, act-boat.jpg, act-dive.jpg, act-desert.jpg, act-water.jpg,
act-aqua.jpg, act-bay.jpg, act-dolphin.jpg, act-luxor.jpg, act-sub.jpg,
act-sunset.jpg, act-market.jpg, act-yacht.jpg, act-fishing.jpg,
act-safari-sunset.jpg, act-safari-camp.jpg, act-island-hop.jpg,
act-orange-bay.jpg, act-utopia-island.jpg, act-bianchi-island.jpg,
act-mahmya-island.jpg, act-paradise-island.jpg, act-hola-hola-island.jpg
```

انسخهم من مشروعك القديم (`assets/images/`) ولصقهم هنا بنفس الأسماء، ومفيش أي تعديل لازم في الكود لأن المسارات متطابقة تمامًا.

## التشغيل محليًا

```bash
npm install
npm run dev
```

## البناء للنشر

```bash
npm run build
```

الناتج بيتحط في `dist/`. الإعداد `base: './'` في `vite.config.js` معناه إن الموقع هيشتغل صح تحت أي مسار فرعي (زي GitHub Pages project site) بدون تعديل.

## النشر على GitHub Pages (نفس الريبو `hurghada-holidays`)

1. `npm run build`
2. ارفع محتوى `dist/` لفرع `gh-pages` (أو استخدم إضافة زي `gh-pages` npm package)، أو حط `dist` كمصدر النشر من إعدادات الريبو.
3. لو عايز تفضل تستخدم نفس الدومين `sshlbi.github.io/hurghada-holidays/`، خلي ملفات `robots.txt` و`sitemap.xml` و`googleca7dd94d7adfbc1d.html` (موجودين في `public/`) زي ما هما.

## ربط Google Sheets

رابط الـ Google Apps Script Web App اتنقل زي ما هو من الكود الأصلي في `src/utils/sheets.js` (متغير `BOOKINGS_WEBAPP_URL`) — مفيش أي فصل أو تعديل في الربط، الحجوزات والتقييمات لسه بتتبعت وتتقرأ من نفس الشيت.

## هيكل المشروع

```
src/
  data/          بيانات الفنادق، الأنشطة، النقل، الترجمة (i18n)، والتقييمات الأولية
  utils/         تنسيق العملة، أسعار الصرف، ربط Google Sheets، useReveal hook
  context/       AppContext — الحالة العامة (اللغة، العملة، معالج الحجز)
  components/    Navbar, Hero, Teaser, Reviews, Footer, WhatsAppFloat, BackgroundScene
  components/wizard/   خطوات معالج الحجز الستة
```
