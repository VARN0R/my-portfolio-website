function movingTechnologies() {
  const images = document.querySelectorAll(".skills__item img");
  const container = document.querySelectorAll(".skills__item");
  
   // Параметры движения
   const speed = 0.5; // Максимальная скорость движения
   const directions = []; // Храним направления движения для каждой картинки

   // Инициализация
   images.forEach((image, index) => {
     const containerRect = container[0].getBoundingClientRect();

     // Устанавливаем случайные начальные координаты
     image.style.left = `${Math.random() * (containerRect.width - image.offsetWidth)}px`;
     image.style.top = `${Math.random() * (containerRect.height - image.offsetHeight)}px`;
     console.log(image);

     // Устанавливаем случайные направления движения
     directions[index] = {
       dx: Math.random() < 0.5 ? speed : -speed,
       dy: Math.random() < 0.5 ? speed : -speed,
     };
   });

   // Анимация
   function animate() {
    console.log("1"); 
    images.forEach((image, index) => {
       const containerRect = container[0].getBoundingClientRect();
       const imgRect = image.getBoundingClientRect();

       // Получаем текущие координаты
       let x = parseFloat(image.style.left);
       let y = parseFloat(image.style.top);

       // Обновляем координаты
       x += directions[index].dx;
       y += directions[index].dy;

       // Проверяем границы контейнера
       if (x <= 0 || x + imgRect.width >= containerRect.width) {
         directions[index].dx *= -1; // Меняем направление по X
       }
       if (y <= 0 || y + imgRect.height >= containerRect.height) {
         directions[index].dy *= -1; // Меняем направление по Y
       }

       // Устанавливаем новые координаты
       image.style.left = `${x}px`;
       image.style.top = `${y}px`;
     });

     // Запускаем следующий кадр
     requestAnimationFrame(animate);
   }

   // Запуск анимации
   animate();
}

export default movingTechnologies;