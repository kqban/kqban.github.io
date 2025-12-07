document.addEventListener('DOMContentLoaded', function () {
  
  // Объекты
  const notificationCountElement = document.getElementById('notificationCount');
  let notificationCount = parseInt(notificationCountElement.textContent, 10) || 0;
  let notificationInterval;
  let isPaused = false; // Флаг для паузы счётчика
  // Кнопка стоп
  const stopCounterButton = document.getElementById('stopCounterButton');
  stopCounterButton.addEventListener('click', stopNotificationCounter);

  // Автоинкремент счётчика уведомлений
  function increaseNotificationCount() {
    if (!isPaused) {
      notificationCount += 1;
      notificationCountElement.textContent = notificationCount;
    }
  }
  function startNotificationInterval() {
    notificationInterval = setInterval(increaseNotificationCount, 3000); // каждые 3 секунды
  }
  // Кнопка останавливает счётчик на 10 секунд
  function stopNotificationCounter() {
    isPaused = true;
    stopCounterButton.disabled = true;
    setTimeout(() => {
      isPaused = false;
      stopCounterButton.disabled = false;
    }, 10000);
  }

  // prompt и уведомление сверху
  function showNotification(options) {
    const notificationElement = document.createElement('div');
    notificationElement.classList.add('notification');
    const text = options.text ? options.text : 'Новое уведомление';
    notificationElement.textContent = text;
    const notificationsContainer = document.getElementById('notificationsContainer');
    if (notificationsContainer) {
      notificationsContainer.appendChild(notificationElement);
    }
    setTimeout(() => {
      notificationElement.style.opacity = 0;
      setTimeout(() => notificationElement.remove(), 1500);
    }, 1500);
  }
  // PROMPT и уведомление
  const userInput = prompt('Введите текст уведомления:');
  if (userInput && userInput.trim() !== '') {
    showNotification({ text: userInput });
  } else {
    showNotification({ text: "Текст уведомления не может быть пустым!" });
  }

  // Запускаем автоувеличение
  startNotificationInterval();
});
