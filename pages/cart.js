let cartItems = {};

        // Функция для отображения товаров в корзине
        function displayCart() {
            const cartItemsDiv = document.getElementById("cartItems");
            const totalPriceDiv = document.getElementById("totalPrice");
            let totalPrice = 0;

            cartItemsDiv.innerHTML = ""; // Очищаем контейнер перед добавлением

            if (Object.keys(cartItems).length === 0) {
                cartItemsDiv.innerHTML = "Ваша корзина пуста.";
                totalPriceDiv.innerText = "Общая стоимость: 0 руб.";
            } else {
                // Проходим по всем товарам в корзине и отображаем их с количеством
                for (let product in cartItems) {
                    const item = cartItems[product];
                    if (item && item.count > 0) { // Проверяем, что товар существует и количество больше 0
                        const cartItemDiv = document.createElement("div");
                        cartItemDiv.innerHTML = `
                            <div>
                                ${item.product} - ${item.price} руб. 
                                <button class="remove" onclick="removeProduct('${product}')"><i class="fas fa-trash-alt"></i></button>
                                <button onclick="updateQuantity('${product}', -1)"><i class="fas fa-minus"></i></button>
                                <span>${item.count}</span>
                                <button onclick="updateQuantity('${product}', 1)"><i class="fas fa-plus"></i></button>
                            </div>
                        `;
                        cartItemsDiv.appendChild(cartItemDiv);
                        totalPrice += item.price * item.count;
                    }
                }

                // Обновляем общую стоимость
                if (totalPrice === 0) {
                    cartItemsDiv.innerHTML = "Ваша корзина пуста.";
                    totalPriceDiv.innerText = "Общая стоимость: 0 руб.";
                } else {
                    totalPriceDiv.innerText = `Общая стоимость: ${totalPrice} руб.`;
                }
            }
        }

        // Функция для добавления товара в корзину
        function addToCart(product, price) {
            if (!cartItems[product]) {
                cartItems[product] = { product, price, count: 0 };
            }
            cartItems[product].count += 1;
            displayCart();
        }

        // Функция для удаления всех товаров данного типа из корзины
        function removeProduct(product) {
            delete cartItems[product];
            displayCart();
        }

        // Функция для обновления количества товара в корзине
        function updateQuantity(product, change) {
            if (cartItems[product]) {
                cartItems[product].count += change;
                if (cartItems[product].count <= 0) {
                    delete cartItems[product]; // Удаляем товар, если его количество стало 0 или меньше
                }
                displayCart(); // Пересчитываем корзину и сумму
            }
        }

        // Функция для разрешения перетаскивания
        function allowDrop(event) {
            event.preventDefault();
        }

        // Функция для обработки перетаскивания элемента в корзину
        function drop(event) {
            event.preventDefault();
            const draggedProduct = event.dataTransfer.getData("text");
            const [product, price] = draggedProduct.split(',');

            addToCart(product, parseInt(price));
        }

        // Функция для начала перетаскивания
        function drag(event, product, price) {
            event.dataTransfer.setData("text", `${product},${price}`);
        }

        // Функция для оформления заказа
        function goToCheckout() {
            alert("Оформление заказа...");
        }

        // Функция для определения мобильного устройства
        function isMobileDevice() {
            return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        }

        // Переменная для отслеживания, был ли drag
        let isDragging = false;

        // Обработчик клика на карточку (для мобильных устройств)
        function handleCardClick(event, product, price) {
            // Если это был drag, игнорируем клик
            if (isDragging) {
                isDragging = false;
                return;
            }
            
            // На мобильных устройствах добавляем товар в корзину по клику
            if (isMobileDevice()) {
                event.preventDefault();
                addToCart(product, price);
            }
            // На десктопе клик игнорируем, работает только drag-n-drop
        }

        // Функция для обновления draggable атрибутов в зависимости от размера экрана
        function updateCardDraggable() {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                if (isMobileDevice()) {
                    card.setAttribute('draggable', 'false');
                    card.style.cursor = 'pointer';
                } else {
                    card.setAttribute('draggable', 'true');
                    card.style.cursor = 'move';
                }
            });
        }

        // Отключаем drag на мобильных устройствах при загрузке
        document.addEventListener('DOMContentLoaded', function() {
            updateCardDraggable();
            
            // Отслеживаем начало перетаскивания
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                card.addEventListener('dragstart', function() {
                    isDragging = true;
                });
                card.addEventListener('dragend', function() {
                    setTimeout(() => {
                        isDragging = false;
                    }, 100);
                });
                
                // Визуальная обратная связь при добавлении товара на мобильных
                if (isMobileDevice()) {
                    card.addEventListener('click', function() {
                        this.style.transform = 'scale(0.95)';
                        setTimeout(() => {
                            this.style.transform = '';
                        }, 150);
                    });
                }
            });
            
            // Обновляем draggable при изменении размера окна
            window.addEventListener('resize', updateCardDraggable);
        });

        // Изначальный вызов для отображения корзины
        displayCart();
