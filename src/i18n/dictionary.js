export const messages = {
    'en': {
        app: {
            logo: {
                text: 'E-STORE'
            }
        },
        header: {
            links: {
                catalog: 'Catalog',
                orders: 'Orders',
                logout: 'Logout',
                authentication: 'Authentication'
            }
        },
        home:{
            lastViewed:{
                label: 'Last viewed products'
            },
            moreProducts:{
                label: 'More products for you'
            },
            new:{
                label: 'New'
            },
            popular:{
                label: 'Popular'
            },
            categories:{
                spoiler: 'Categories'
            }
        },
        orders:{
            header: 'My orders',
            order:{
                amount: 'Total'
            }
        },
        search: {
            button: {
                find: 'Find'
            },
            placeholder: 'Looking for...'
        },
        product:{
            tabs:{
                general:'Summary',
                specification: 'Specification'
            },
            inStock: 'In stock',
            notInStock: 'Not in stock',
            buy: 'Buy',
            info:{
                delivery:{
                    header: 'Delivery',
                    text: 'Pick up from Nova Poshta\'s warehouse' 
                },
                payment:{
                    header: 'Payment',
                    text: 'When products received' 
                }
            },
            description:{
                header:'Description'
            }
        },
        catalog:{
            selectedProductsAmount:'Selected {0} products',
            allResults: 'All results',
            filters:{
                brand: 'Brand',
                price: 'Price',
            },
            availability:'Availability',
            inStock: 'In stock',
            notInStock: 'Not in stock',
            sort:{
                rating: 'By rating',
                new: 'New',
                priceAsc: 'From cheap to expensive',
                priceDesc: 'From expensive to cheap'
            }
        },
        createOrder:{
            header: 'Placing an order',
            customerData:{
                header: 'Your contact information',
                lastName: 'Last name',
                firstName: 'First name',
                patronymic: 'Patronymic',
                phoneNumber: 'Phone number',
                email: 'Email',
            },
            products:{
                header: 'Products',
                price:'Price',
                amount: 'Count',
                subtotal: 'Subtotal',
                total: 'Total'
            },
            delivery:{
                header: 'ДоставкаDelivery',
                city: 'City',
                cityNotSelected: 'City not selected',
                methods: {
                    NOVA_POSHTA_WAREHOUSE: 'Pick up from Nova Posha warehouse'
                }
            },
            payment:{
                header: 'Payment',
                methods: {
                    POST_PAY: 'Pay after delivery',
                    SEND_ON_CARD: 'Send on card'
                },
                info:{
                    SEND_ON_CARD: 'Payment instruction will be sent to your mailbox'
                }
            },
            recipient:{
                header: 'Recipient person information',
                useCustomerData: 'Use my contact data for delivery',
                lastName: 'Last name',
                firstName: 'First name',
                patronymic: 'Patromymic',
                phoneNumber: 'Phone number',
            },
            total: 'Total',
            productsForAmount: 'products for amount',
            deliveryCost: 'Delivery price',
            deliveryCostValue: 'requested by delivery company',
            totalToPay: 'To pay',
            confirm: 'Place order',
            lawReminder1: 'Receiving orders over 5 000 ₴ can be done only with passport (Law from 06.12.2019 № 361-IX)',
            termsAgreementList: 'Confirming order I agree with next terms',
            term1: 'terms about collecting and securing personal information',
            term2: 'user terms',
            modal:{
                gratitude:{
                    header: 'Thank you! You order received',
                    body: 'We will contact with you or can sent SMS',
                    contunueButton: 'CONTINUE SHOPPING'
                },
                citySelect:{
                    header: 'Select your city',
                    deliverAllUkraine: 'Delivering order over all Ukraine!',
                    chooseCity: 'Select your city',
                    applyButton: 'Confirm'
                }
            }
        },
        modules:{
            delivery:{
                novaPoshta:{
                    warehouseSelect:{
                        placeholder: 'Enter warehouse number'
                    }
                }
            }
        },
        modal: {
            cart: {
                title: 'Cart',
                buttons:{
                    continueShopping: 'Continue shopping',
                    createOrder: 'Create order'
                }
            },
            authentication:{
                login:{
                    header: 'Login',
                    username:{
                        label:'Email',
                        invalid: 'Entered email is incorrect'
                    },
                    password:{
                        label:'Password'
                    },
                    rememberMe: 'Remember me',
                    forgetPassword: 'Forget password',
                    signIn:'Sign In',
                    signUp:'Sign Up'
                },
                registration:{
                    header: 'Registration',
                    firstName:{
                        label:'First name',
                        invalid: 'Should not be empty'
                    },
                    lastName:{
                        label:'Last name',
                        invalid: 'Should not be empty'
                    },
                    phoneNumber:{
                        label:'Phone number',
                        invalid: 'Should not be empty'
                    },
                    email:{
                        label:'Email',
                        invalid: 'Should not be empty'
                    },
                    password:{
                        label:'Password',
                        invalid: 'Should not be empty'
                    },
                    termsAgreement:{
                        label:''
                    },
                    signUp:'Sign Up',
                    signIn:'Already have an account',
                },
                dividerLabel:'or',
                oauth:{
                    header:'Login as user'
                }
            }
        }
    },
    'uk': {
        app: {
            logo: {
                text: 'E-STORE'
            }
        },
        header: {
            links: {
                catalog: 'Каталог',
                orders: 'Замовлення',
                logout: 'Вийти',
                authentication: 'Авторизація'
            }
        },
        home:{
            lastViewed:{
                label: 'Останні переглянуті товари'
            },
            moreProducts:{
                label: 'Більше товаров для вибору'
            },
            new:{
                label: 'Новинки'
            },
            popular:{
                label: 'Зараз користуються запитом'
            },
            categories:{
                spoiler: 'Категорії'
            }
        },
        orders:{
            header: 'Мої замовлення',
            order:{
                amount: 'Вартість замовлення'
            }
        },
        search: {
            button: {
                find: 'Знайти'
            },
            placeholder: 'Я шукаю...'
        },
        product:{
            tabs:{
                general:'Все о товарі',
                specification: 'Характеристики'
            },
            inStock: 'В наявності',
            notInStock: 'Не в наявності',
            buy: 'Купити',
            info:{
                delivery:{
                    header: 'Доставка',
                    text: 'Самовивіз з відділення Нової Пошти' 
                },
                payment:{
                    header: 'Оплата',
                    text: 'При полученні товару, переказом на карту' 
                }
            },
            description:{
                header:'Опис'
            }
        },
        catalog:{
            selectedProductsAmount:'Обрано {0} товарів',
            allResults: 'Всі результати',
            filters:{
                brand: 'Виробник',
                price: 'Ціна',
            },
            availability:'Наявність',
            inStock: 'В наявності',
            notInStock: 'Не в наявності',
            sort:{
                rating: 'За рейтингом',
                new: 'Новинки',
                priceAsc: 'Від дешевих до дорогих',
                priceDesc: 'Від дорогих до дешевих'
            }
        },
        createOrder:{
            header: 'Оформлення заказу',
            customerData:{
                header: 'Ваші контактні данні',
                lastName: 'Призвище',
                firstName: 'Ім\'я',
                patronymic: 'По батькові',
                phoneNumber: 'Мобільний телефон',
                email: 'Електронна скринька',
            },
            products:{
                header: 'Товари',
                price:'Ціна',
                amount: 'Кількість',
                subtotal: 'Сума',
                total: 'Всього на сумму'
            },
            delivery:{
                header: 'Доставка',
                city: 'Ваше місто',
                cityNotSelected: 'Місто не обрано',
                methods: {
                    NOVA_POSHTA_WAREHOUSE: 'Самовывіз з Нової Пошти'
                }
            },
            payment:{
                header: 'Оплата',
                methods: {
                    POST_PAY: 'Оплата при отриманні товару',
                    SEND_ON_CARD: 'Оплата на карту'
                },
                info:{
                    SEND_ON_CARD: 'Инструкція для оплати будет відправлена на Вашу электронну адресу'
                }
            },
            recipient:{
                header: 'Контактні данні отримувача',
                useCustomerData: 'Використати мои контактні данні для отримання',
                lastName: 'Призвище',
                firstName: 'Ім\'я',
                patronymic: 'По батькові',
                phoneNumber: 'Мобильний телефон',
            },
            total: 'Підсумок',
            productsForAmount: 'товарів на суму',
            deliveryCost: 'Вартість отримання',
            deliveryCostValue: 'за тарифами перевізника',
            totalToPay: 'До сплати',
            confirm: 'Замовлення підтверджую',
            lawReminder1: 'Отримання замовлення від 5 000 ₴ тільки за паспортом (Закон от 06.12.2019 № 361-IX)',
            termsAgreementList: 'Підтверджуючи замовлення, я принимаю умови',
            term1: 'положення про збір та защиту персональних даних',
            term2: 'угоди користувача',
            modal:{
                gratitude:{
                    header: 'Дякуємо! Ваше замовлення прийняте',
                    body: 'Ми з вами звєяжемось або відправимо SMS',
                    contunueButton: 'ПРОДОВЖИТИ ПОКУПКИ'
                },
                citySelect:{
                    header: 'Оберіть своє місто',
                    deliverAllUkraine: 'Доставляемо замовлення по всій Україні!',
                    chooseCity: 'Введите населений пункт України',
                    applyButton: 'Застосувати'
                }
            }
        },
        modules:{
            delivery:{
                novaPoshta:{
                    warehouseSelect:{
                        placeholder: 'Введіть номер відділення'
                    }
                }
            }
        },
        modal: {
            cart: {
                title: 'Кошик',
                buttons:{
                    continueShopping: 'Продовжити покупки',
                    createOrder: 'Створити замовлення'
                }
            },
            authentication:{
                login:{
                    header: 'Вхід',
                    username:{
                        label:'Ел. скринька',
                        invalid: 'Введена недійсна адреса'
                    },
                    password:{
                        label:'Пароль'
                    },
                    rememberMe: 'Запамєятати мене',
                    forgetPassword: 'Нагадати пароль',
                    signIn:'Вхід',
                    signUp:'Завести акаунт'
                },
                registration:{
                    header: 'Реєстрація',
                    firstName:{
                        label:'Ім\'я',
                        invalid: 'Не має бути порожнє'
                    },
                    lastName:{
                        label:'Прізвище',
                        invalid: 'Не має бути порожнє'
                    },
                    phoneNumber:{
                        label:'Мобільний телефон',
                        invalid: 'Не має бути порожнє'
                    },
                    email:{
                        label:'Ел. скринька',
                        invalid: 'Не має бути порожнє'
                    },
                    password:{
                        label:'Пароль',
                        invalid: 'Не має бути порожнє'
                    },
                    termsAgreement:{
                        label:''
                    },
                    signUp:'Зареєструватись',
                    signIn:'Вже є акаунт',
                },
                dividerLabel:'або',
                oauth:{
                    header:'Увійти за допомогою'
                }
            }
        }
    },
    'ru': {
        app: {
            logo: {
                text: 'E-STORE'
            }
        },
        header: {
            links: {
                catalog: 'Каталог',
                orders: 'Заказы',
                logout: 'Выйти',
                authentication: 'Авторизация'
            }
        },
        home:{
            lastViewed:{
                label: 'Последние просмотренные товары'
            },
            moreProducts:{
                label: 'Больше товаров для выбора'
            },
            new:{
                label: 'Новинки'
            },
            popular:{
                label: 'Сейчас пользуются спросом'
            },
            categories:{
                spoiler: 'Категории'
            }
        },
        orders:{
            header: 'Мои заказы',
            order:{
                amount: 'Сумма заказа'
            }
        },
        search: {
            button: {
                find: 'Найти'
            },
            placeholder: 'Я ищу...'
        },
        product:{
            tabs:{
                general:'Все о товаре',
                specification: 'Характеристики'
            },
            inStock: 'В наличии',
            notInStock: 'Не в наличии',
            buy: 'Купить',
            info:{
                delivery:{
                    header: 'Доставка',
                    text: 'Самовывоз из отделений Новой Почты' 
                },
                payment:{
                    header: 'Оплата',
                    text: 'При получении товара, переводом на карту' 
                }
            },
            description:{
                header:'Описание'
            }
        },
        catalog:{
            selectedProductsAmount:'Выбрано {0} товаров',
            allResults: 'Все результаты',
            filters:{
                brand: 'Производитель',
                price: 'Цена',
            },
            availability:'Наличие',
            inStock: 'В наличии',
            notInStock: 'не в наличии',
            sort:{
                rating: 'По рейтингу',
                new: 'Новинки',
                priceAsc: 'От дешевых к дорогим',
                priceDesc: 'От дорогих к дешевым'
            }
        },
        createOrder:{
            header: 'Оформление заказа',
            customerData:{
                header: 'Ваши контактные данные',
                lastName: 'Фамилия',
                firstName: 'Имя',
                patronymic: 'Отчество',
                phoneNumber: 'Мобильный телефон',
                email: 'Электронная почта',
            },
            products:{
                header: 'Товары',
                price:'Цена',
                amount: 'Количество',
                subtotal: 'Сумма',
                total: 'Итого на сумму'
            },
            delivery:{
                header: 'Доставка',
                city: 'Ваш город',
                cityNotSelected: 'Город не выбран',
                methods: {
                    NOVA_POSHTA_WAREHOUSE: 'Самовывоз из Новой Почты'
                }
            },
            payment:{
                header: 'Оплата',
                methods: {
                    POST_PAY: 'Оплата при получении товара',
                    SEND_ON_CARD: 'Оплата на карту'
                },
                info:{
                    SEND_ON_CARD: 'Инструкция для оплаты будет отправлена на адрес электронной почты'
                }
            },
            recipient:{
                header: 'Контактные данные получателя',
                useCustomerData: 'Использовать мои контактные данные для получения',
                lastName: 'Фамилия',
                firstName: 'Имя',
                patronymic: 'Отчество',
                phoneNumber: 'Мобильный телефон',
            },
            total: 'Итого',
            productsForAmount: 'товара на сумму',
            deliveryCost: 'Стоимость доставки',
            deliveryCostValue: 'по тарифам перевозчика',
            totalToPay: 'К оплате',
            confirm: 'Заказ подтверждаю',
            lawReminder1: 'Получение заказа от 5 000 ₴ только по паспорту (Закон от 06.12.2019 № 361-IX)',
            termsAgreementList: 'Подтверждая заказ, я принимаю условия',
            term1: 'положения о сборе и защите персональных данных',
            term2: 'пользовательского соглашения',
            modal:{
                gratitude:{
                    header: 'Спасибо! Ваш заказ принят',
                    body: 'Мы с вами свяжемся или отправим SMS',
                    contunueButton: 'ПРОДОЛЖТЬ ПОКУПКИ'
                },
                citySelect:{
                    header: 'Выберите свой город',
                    deliverAllUkraine: 'Доставляем заказы по всей Украине!',
                    chooseCity: 'Введите населенный пункт Украины',
                    applyButton: 'Применить'
                }
            }
        },
        modules:{
            delivery:{
                novaPoshta:{
                    warehouseSelect:{
                        placeholder: 'Введите номер отделения'
                    }
                }
            }
        },
        modal: {
            cart: {
                title: 'Корзина',
                buttons:{
                    continueShopping: 'Продолжить покупки',
                    createOrder: 'Оформить заказ'
                }
            },
            authentication:{
                login:{
                    header: 'Вход',
                    username:{
                        label:'Ел. адрес',
                        invalid: 'Введенный адрес недействительный'
                    },
                    password:{
                        label:'Пароль'
                    },
                    rememberMe: 'Запомнить меня',
                    forgetPassword: 'Напомнить пароль',
                    signIn:'Войти',
                    signUp:'Зарегистрироваться'
                },
                registration:{
                    header: 'Регистрация',
                    firstName:{
                        label:'Имя',
                        invalid: 'Не должно быть пустым'
                    },
                    lastName:{
                        label:'Фамилия',
                        invalid: 'Не должно быть пустым'
                    },
                    phoneNumber:{
                        label:'Телефон',
                        invalid: 'Не должно быть пустым'
                    },
                    email:{
                        label:'Эл. почта',
                        invalid: 'Не должно быть пустым'
                    },
                    password:{
                        label:'Пароль',
                        invalid: 'Не должно быть пустым'
                    },
                    termsAgreement:{
                        label:''
                    },
                    signUp:'Зарегистрироваться',
                    signIn:'Уже есть аккаунт',
                },
                dividerLabel:'или',
                oauth:{
                    header:'Войти с помощью'
                }
            }
        }
    }
}


//termsAgreement Регистрируясь, вы соглашаетесь с условиями положения о сборе и защите
// персональных данных и пользовательским соглашением