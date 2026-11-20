# SAJIB ASSISTANT — starter project v0.2

এটি একটি installable-web-app (PWA) starter, সম্পূর্ণ প্রকাশিত Android APK নয়।

## এতে কী আছে
- Futuristic bilingual chat interface
- Browser speech recognition (যদি browser/device সমর্থন করে)
- Text-to-speech
- Basic offline fallback (greeting, time, date, help)
- Service worker cache for app shell
- Optional OpenAI Responses API backend
- PIN-guarded API endpoint; secret key server-এ থাকে
- Click-to-dial: নম্বর নিশ্চিত করলে Android dialer খোলে; অ্যাপ নিজে কল করে না/রিসিভ করে না

## লোকাল চালানো
1. Node.js 20+ ইনস্টল থাকা কম্পিউটারে project folder খুলুন।
2. `npm install`
3. `.env.example` কপি করে `.env` করুন।
4. `.env`-এ server-side API key এবং নিজের private APP_PIN সেট করুন।
5. `npm start`
6. ব্রাউজারে `http://localhost:3000` খুলুন।

API key কখনো `public/` ফোল্ডারে, HTML/JavaScript-এ বা কারও সঙ্গে শেয়ার করবেন না। API ব্যবহারে খরচ হতে পারে; account/billing সেটআপে অভিভাবকের সাহায্য নিন।

## Android-এ ইনস্টল
PWA ইনস্টল করতে সাইটটি HTTPS-এ deploy করতে হবে (অথবা localhost-এ পরীক্ষা করুন)। Android Chrome-এ সাইট খুলে browser menu থেকে “Install app” / “Add to Home screen” বেছে নিন। এই ZIP নিজে থেকে APK তৈরি করে না।

## গুরুত্বপূর্ণ সীমাবদ্ধতা
- AI চালু করতে API account, valid key, internet এবং server hosting লাগবে।
- Offline mode-এ পূর্ণ LLM নেই; শুধু সীমিত built-in উত্তর ও cached app shell কাজ করে।
- নিজের কণ্ঠের ক্লোনিং এই starter-এ নেই। Browser TTS-এর কণ্ঠ ডিভাইস/ব্রাউজারের নির্বাচিত voice।
- Android-এর call/answer restrictions-এর কারণে এই PWA স্বয়ংক্রিয়ভাবে কল রিসিভ বা কাউকে কল করতে পারে না। Dialer খোলে, এরপর ব্যবহারকারী নিজে কল নিশ্চিত করেন।
- এটি ব্যক্তিগত ব্যবহার মাথায় রেখে PIN-guarded backend sample; production deployment-এর আগে proper authentication, HTTPS, rate limits, abuse protection ও privacy review দরকার।


## Android APK build (GitHub Actions)
এই প্রজেক্টে Capacitor config এবং GitHub Actions workflow যোগ করা হয়েছে।
1. ZIP extract করে project-টি নিজের GitHub repository-তে upload/push করুন।
2. GitHub repository → Actions-এ গিয়ে `Build Sajib Assistant Android APK` workflow চালান।
3. Build সফল হলে workflow run-এর Artifacts থেকে `sajib-assistant-debug-apk` ডাউনলোড করুন।
4. APK ফোনে ইনস্টল করার আগে Android-এর install permission দিন। Debug APK ব্যক্তিগত পরীক্ষার জন্য; Play Store release-এর জন্য signed release build প্রয়োজন।

বিকল্পভাবে কম্পিউটারে Node.js 20+, Java 21 এবং Android SDK/Android Studio ইনস্টল করে:
`npm install`
`npx cap add android`
`npx cap sync android`
`cd android && ./gradlew assembleDebug`

## AI backend সম্পর্কে
`.env`-এ API provider-এর বৈধ model ID, API key এবং APP_PIN বসাতে হবে। API key শুধু server environment-এ রাখুন। API account, billing ও deployment নিজে/অভিভাবকের সহায়তায় সেটআপ করুন। এই project থেকে আমি কোনো external account তৈরি, billing চালু বা hosting deploy করিনি।
