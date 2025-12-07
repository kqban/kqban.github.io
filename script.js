document.addEventListener("DOMContentLoaded", function() {
    // Находим элемент кнопки "Формы"
    const formButton = document.getElementById("formButton");

    if (formButton) {
        // Добавляем обработчик клика
        formButton.addEventListener("click", function(event) {
            event.preventDefault(); // Блокируем стандартное поведение ссылки (переход)

            // Запрашиваем у пользователя, хочет ли он пройти регистрацию
            let answer = prompt("Желаете пройти регистрацию на сайте? (Да/Нет)");

            // Если пользователь отвечает "да"
            if (answer && answer.toLowerCase() === "да") {
                // Переходим на страницу регистрации с помощью JavaScript
                window.location.href = "forms.html";
            } else if (answer === "" || answer === null) {
                // Если поле пустое или нажата кнопка "Отмена"
                alert("Вы остались на главной странице.");
            } else {
                // Если введен любой другой ответ
                alert("Попробуйте снова.");
            }
        });
    } else {
        console.error("Кнопка с id 'formButton' не найдена!");
    }
});




function checkLogin() {
    let login = prompt("Введите логин:");
    
    if (login === "Админ") {
        let password = prompt("Введите пароль:");
        
        if (password === "Я главный") {
            alert("Здравствуйте!");
        } else if (password === null) {
            alert("Отменено");
        } else {
            alert("Неверный пароль");
        }
    } else if (login === null) {
        alert("Отменено");
    } else {
        alert("Я вас не знаю");
    }
}
let likeCount = 0; // Количество лайков
let isLiked = false; // Статус лайка (понравилось или нет)

function toggleLike() {
    let button = document.getElementById("likeButton");
    let likeIcon = document.getElementById("likeIcon");
    let likeCountDisplay = document.getElementById("likeCount");

    if (isLiked) {
        // Если уже лайкнули, убираем лайк
        likeCount--;
        likeIcon.style.color = "black"; // Сердечко возвращается в черный цвет
    } else {
        // Если еще не лайкнули, ставим лайк
        likeCount++;
        likeIcon.style.color = "red"; // Сердечко становится красным
    }

    // Обновляем отображение количества лайков
    likeCountDisplay.textContent = likeCount;

    // Переключаем статус лайка
    isLiked = !isLiked;
}

let isDrawing = false;

function toggleDrawing() {
    isDrawing = !isDrawing; // Переключаем состояние рисования
    let button = document.getElementById("drawButton");
    
    if (isDrawing) {
        button.textContent = "Прекратить рисование"; // Меняем текст кнопки на "Прекратить рисование"
    } else {
        button.textContent = "Рисовать"; // Меняем текст кнопки на "Рисовать"
    }
}

document.addEventListener("mousemove", function(event) {
    if (isDrawing) { // Если рисование включено
        let square = document.createElement("div");
        square.style.position = "absolute";
        square.style.width = "20px";
        square.style.height = "20px";
        square.style.backgroundColor = "green";
        square.style.left = event.pageX - 10 + "px"; // Центрируем квадрат по курсу
        square.style.top = event.pageY - 10 + "px";  // Центрируем квадрат по курсу
        document.body.appendChild(square);
    }


function Accumulator(startingValue) {
    this.value = startingValue || 0;
    this.read = function() {
        const userInput = prompt("Введите сумму, которую хотите добавить в корзину");
        const number = parseInt(userInput);
        if (!isNaN(number)) {
            this.value += number;
        }
    };
}

let cart = new Accumulator(0); // Инициализируем корзину с нулевой стоимостью


document.getElementById("submitCartButton").addEventListener("click", function () {
    alert(`Общая сумма корзины: ${cart.value} руб.`);
});
function truncate(str, maxlength) {
    if (str.length > maxlength) {
        return str.slice(0, maxlength) + "…";
    }
    return str;
}

const descriptionElement = document.getElementById("productDescription");
descriptionElement.innerText = truncate(descriptionElement.innerText, 50); // Обрезаем описание до 50 символов
function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            return false; // Если есть хотя бы одно свойство
        }
    }
    return true; // Если нет свойств
}

const exampleObject = {};
alert(isEmpty(exampleObject)); // true

});
// ================= МОДАЛЬНАЯ КАПЧА =================//
let currentCaptcha; 
let timerInterval; 
let timeLeft = 30;
const captchaModal = document.getElementById("captchaModal");
const openCaptchaModalBtn = document.getElementById("openCaptchaModal");
const closeCaptchaModalBtn = document.getElementById("closeCaptchaModal");
const captchaInput = document.getElementById("captchaInput");
const captchaImage = document.getElementById("captchaImage");
const captchaError = document.getElementById("errorMessage");
const captchaBtn = document.getElementById("submitCaptchaButton");
const timerDiv = document.getElementById("timer");

function showCaptchaModal() {
    captchaModal.classList.add("show");
    generateCaptcha();
    captchaInput.focus();
}
function hideCaptchaModal() {
    captchaModal.classList.remove("show");
    clearInterval(timerInterval);
}
openCaptchaModalBtn.addEventListener("click", showCaptchaModal);
closeCaptchaModalBtn.addEventListener("click", hideCaptchaModal);
captchaModal.addEventListener("click", function(e) {
    if (e.target === captchaModal) hideCaptchaModal();
});

function generateCaptcha() {
    const captchaText = Math.random().toString(36).substring(2, 8);
    currentCaptcha = captchaText;
    captchaImage.innerText = captchaText;
    captchaInput.value = '';
    captchaBtn.disabled = true;
    captchaError.style.display = 'none';
    timeLeft = 30;
    startTimer();
}
function startTimer() {
    clearInterval(timerInterval);
    timerDiv.innerText = `Оставшееся время: ${timeLeft} сек.`;
    timerInterval = setInterval(function() {
        timeLeft--;
        timerDiv.innerText = `Оставшееся время: ${timeLeft} сек.`;
        if (timeLeft < 0) {
            clearInterval(timerInterval);
            captchaError.innerText = "Время на капчу истекло! Капча обновлена.";
            captchaError.style.display = 'block';
            captchaBtn.disabled = true;
            setTimeout(() => {
                captchaError.style.display = 'none';
                generateCaptcha();
            }, 700);
        }
    }, 1000);
}
captchaInput.addEventListener("input", function () {
    captchaBtn.disabled = false; // всегда можно отправить (даже с неправильным вводом)
    captchaError.style.display = "none";
});
captchaBtn.addEventListener("click", function () {
    if (captchaInput.value === currentCaptcha) {
        captchaError.style.display = 'none';
        alert("Капча пройдена!");
        hideCaptchaModal();
    } else {
        captchaError.innerText = "Капча введена неправильно! Капча обновлена.";
        captchaError.style.display = 'block';
        generateCaptcha();
    }
});

// Массив для хранения товаров в корзине
let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");


// Определение функции до её использования
function addToCart(product, price) {
    const existingItem = cartItems.find(item => item.product === product);
    if (existingItem) {
        existingItem.quantity += 1; // Если товар уже есть, увеличиваем количество
    } else {
        cartItems.push({ product, price, quantity: 1 }); // Добавляем новый товар в корзину
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Сохраняем корзину в localStorage
    displayCart(); // Обновляем отображение корзины
}


// Функция для отображения товаров в корзине
function displayCart() {
    const cartItemsDiv = document.getElementById("cartItems");
    const totalPriceDiv = document.getElementById("totalPrice");
    let totalPrice = 0;

    cartItemsDiv.innerHTML = ""; // Очищаем контейнер перед добавлением

    // Проверяем, что cartItems является массивом перед вызовом forEach
    if (Array.isArray(cartItems) && cartItems.length === 0) {
        cartItemsDiv.innerHTML = "Ваша корзина пуста.";
    } else if (Array.isArray(cartItems)) {
        // Если cartItems это массив, проходим по нему
        cartItems.forEach(item => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.innerText = `${item.product} - ${item.quantity} шт. - ${item.price * item.quantity} руб.`;
            cartItemsDiv.appendChild(cartItemDiv);
            totalPrice += item.price * item.quantity;
        });

        totalPriceDiv.innerText = `Общая стоимость: ${totalPrice} руб.`;
    } else {
        // Если cartItems не массив, выводим ошибку в консоли
        console.error("Ошибка: cartItems не является массивом", cartItems);
    }
}


// Вызов функции для отображения товаров
displayCart();

// Функция для оформления заказа
function goToCheckout() {
    alert("Оформление заказа...");
}


// Переключение на предыдущую фотографию
document.querySelector('.prev').addEventListener('click', () => {
    currentIndex--;
    showSlide(currentIndex);
});

// Переключение на следующую фотографию
document.querySelector('.next').addEventListener('click', () => {
    currentIndex++;
    showSlide(currentIndex);
});

// Увеличение изображения по клику
images.forEach(img => {
    img.addEventListener('click', () => {
        images.forEach(image => image.classList.remove('active'));
        img.classList.add('active');
    });
});

showSlide(currentIndex);  // Инициализация слайдера
// Изменение основного изображения при клике на миниатюру
function changeImage(imageUrl) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imageUrl;
}

// Изменение основного изображения при клике на миниатюру
function changeImage(imageUrl) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imageUrl;
}
        let currentImageIndex = 0;
        const galleryImages = document.querySelectorAll('.gallery-image');
        
        function openLightbox(img) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            lightbox.style.display = 'block';
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            
            // Находим индекс текущего изображения
            galleryImages.forEach((image, index) => {
                if (image.src === img.src) {
                    currentImageIndex = index;
                }
            });
        }
        
        function closeLightbox() {
            document.getElementById('lightbox').style.display = 'none';
        }
        
        function changeImage(direction) {
            currentImageIndex += direction;
            
            if (currentImageIndex >= galleryImages.length) {
                currentImageIndex = 0;
            } else if (currentImageIndex < 0) {
                currentImageIndex = galleryImages.length - 1;
            }
            
            const lightboxImg = document.getElementById('lightbox-img');
            lightboxImg.src = galleryImages[currentImageIndex].src;
            lightboxImg.alt = galleryImages[currentImageIndex].alt;
        }
        
        // Закрытие по нажатию Escape
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeLightbox();
            } else if (event.key === 'ArrowLeft') {
                changeImage(-1);
            } else if (event.key === 'ArrowRight') {
                changeImage(1);
            }
        });
        function scrollToSection(sectionId) {
            document.getElementById(sectionId).scrollIntoView({
                behavior: 'smooth'
            });
        }