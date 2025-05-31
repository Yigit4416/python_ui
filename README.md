
# 🚦 Trafik İşareti Tanıma Uygulaması

Bu proje, **Next.js**, **Roboflow** ve **Clerk** kullanarak gerçek zamanlı olarak trafik işareti tespiti yapan bir web uygulamasıdır. Uygulama, kullanıcının kamerasından alınan görüntüleri analiz eder ve tanınan trafik işaretlerini görselleştirir. Giriş-çıkış işlemleri Clerk ile yönetilmektedir.

## 🔧 Kurulum

Projeyi çalıştırmak için aşağıdaki adımları takip edin:

### 1. Bağımlılıkları yükleyin

```bash
npm install
````

### 2. Ortam değişkenlerini ayarlayın

Proje kök dizininde bir `.env.local` dosyası oluşturun ve aşağıdaki değerleri girin:

```env
ROBOFLOW_API_KEY=your_roboflow_api_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

> 📌 `ROBOFLOW_API_KEY`: Roboflow API erişimi için gereklidir.
> 📌 `CLERK` anahtarları: Giriş/çıkış işlemleri için gereklidir.

### 3. Geliştirme sunucusunu başlatın

```bash
npm run dev
```

Tarayıcıdan [http://localhost:3000](http://localhost:3000) adresine giderek uygulamayı görüntüleyebilirsiniz.

---

## 🔐 Kimlik Doğrulama

* Giriş yapmamış kullanıcılar `Sign In` veya `Sign Up` butonları ile oturum açabilir.
* Giriş yapılınca ana sayfada bir karşılama mesajı ve `/predict` sayfasına yönlendiren bir "Başla" butonu görünür.

---

## 📷 Özellikler

* Gerçek zamanlı kamera görüntüsü üzerinden trafik işareti tespiti
* Roboflow ile görüntü analizi
* Clerk ile kimlik doğrulama
* Tailwind CSS ile responsive arayüz

---

## 🧪 Geliştirme İpuçları

* Roboflow'dan API Key almak için bir proje oluşturmanız gerekir: [https://roboflow.com](https://roboflow.com)
* Clerk ayarlarını yapmak için: [https://clerk.dev](https://clerk.dev)

---

Hazırlayan: **Yiğit Özdemir**
