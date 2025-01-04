// OpenWeatherMap API key (kendi API anahtarınızı buraya ekleyin)
const apiKey = 'YOUR_API_KEY'; // API anahtarınızı buraya yazın

// Kullanıcıdan şehir ismini alarak hava durumu bilgisini çekme fonksiyonu
function getWeather() {
  // Kullanıcının input alanından girdiği şehir ismini alıyoruz
  const city = document.getElementById('city').value; 

  // OpenWeatherMap API'sine istek yapmak için URL'yi oluşturuyoruz
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=tr`; 

  // API'den veri çekmek için Fetch API'yi kullanıyoruz
  fetch(url)
    .then(response => response.json()) // JSON formatında yanıt alıyoruz
    .then(data => {
      // API'den gelen veriyi işleyerek DOM'a yerleştiriyoruz
      if (data.cod === 200) {  // Eğer API yanıtı başarılıysa (200 OK)
        const weatherDescription = data.weather[0].description; // Hava durumu açıklaması
        const temperature = data.main.temp; // Sıcaklık değeri
        const humidity = data.main.humidity; // Nem oranı
        
        // Hava durumu bilgilerini ekranda göstermek için DOM elemanlarını güncelliyoruz
        document.getElementById('weather-description').textContent = `Açıklama: ${weatherDescription}`;
        document.getElementById('temperature').textContent = `Sıcaklık: ${temperature}°C`;
        document.getElementById('humidity').textContent = `Nem: ${humidity}%`;
      } else {  // Eğer API yanıtı hata dönerse (örneğin yanlış şehir adı)
        // Kullanıcıya geçersiz şehir adı uyarısı veriyoruz
        document.getElementById('weather-description').textContent = 'Geçersiz şehir adı. Lütfen tekrar deneyin.';
        document.getElementById('temperature').textContent = ''; // Sıcaklık bilgisini boş bırakıyoruz
        document.getElementById('humidity').textContent = ''; // Nem bilgisini boş bırakıyoruz
      }
    })
    .catch(error => {
      // Eğer API'ye bağlanırken bir hata olursa, kullanıcıya hata mesajı gösteriyoruz
      document.getElementById('weather-description').textContent = 'Bir hata oluştu. Lütfen tekrar deneyin.';
      document.getElementById('temperature').textContent = ''; // Sıcaklık bilgisini boş bırakıyoruz
      document.getElementById('humidity').textContent = ''; // Nem bilgisini boş bırakıyoruz
    });
}