let cartItems = {};

        // Функция для отображения товаров в корзине
        function displayCart() {
            const cartItemsDiv = document.getElementById("cartItems");
            const totalPriceDiv = document.getElementById("totalPrice");
            let totalPrice = 0;

            cartItemsDiv.innerHTML = ""; // Очищаем контейнер перед добавлением

            if (Object.keys(cartItems).length === 0) {
                cartItemsDiv.innerHTML = "Ваша корзина пуста.";
            } else {
                // Проходим по всем товарам в корзине и отображаем их с количеством
                for (let product in cartItems) {
                    const item = cartItems[product];
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

                totalPriceDiv.innerText = `Общая стоимость: ${totalPrice} руб.`;
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
                displayCart();
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

        // Изначальный вызов для отображения корзины
        displayCart();