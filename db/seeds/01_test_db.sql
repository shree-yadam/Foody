INSERT INTO restaurants (name, email, password, street, city, country, phone_number, type_of_cuisine, logo_url, description, timings)
  VALUES ('HotPizza', 'hotpizza@pizza.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '1 Yonge St', 'Toronto', 'Canada', '+18198560945', 'pizza', '/img/logo/hot-pizza-logo.png', 'The thinnest, crispiest and most flavorful crust!', 'everyday 11a.m. - 9p.m.'),
  ('Looney''s', 'looneys@mmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '1 Olde St', 'Toronto', 'Canada', '+12345678902', 'family', '/img/logo/looneys-logo.jpg', 'Comfort food at it''s best', 'Tue - Sun 11a.m.- 2p.m. and 5p.m. - 9p.m.'),
  ('Shawarma Royale', 'shawarmaR@fmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '3 Restaurant St', 'Toronto', 'Canada', '+12345678901', 'mediterranean', '/img/logo/shawarma-royale-logo.jpg', 'Fresh ingredients and authentic mediterranean flavors', 'Eveyrday 11a.m.- 3p.m. and 5p.m. - 9p.m.'),
  ('Mucho Quesadilla', 'mq@mmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '53 Bling Dr.', 'Toronto', 'Canada', '+12345678903', 'Mexican', '/img/logo/mq.jpg', 'Flavorful food mucho fresh!', 'Tue - Sun 11a.m.- 2p.m. and 5p.m. - 9p.m.'),
  ('Casa Mia', 'cm@mmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '45 Victoria Dr.', 'Toronto', 'Canada', '+12345678903', 'Italian', '/img/logo/mc.png', 'Taste of Home', 'Tue - Sun 11a.m.- 2p.m. and 5p.m. - 9p.m.');

INSERT INTO customers (name, phone_number, email, password)
  VALUES ('Kevin Klein', '+12345678900', 'kevin.klein@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
         ('Bob Kim', '+14162223333', 'bob.kim@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
         ('Edward Lee', '+14163555999', 'edward.lee@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO menu_items (name, description, image_url, price, is_available, prep_time, restaurant_id)
  VALUES ('Pepperoni', 'extra pepperoni + extra cheese!', '/img/menu-pic/hotPizza/pepperoni.jpeg', 1500, TRUE, 20, 1),
         ('Hawaiian', 'Canadian bacon + pineapple', '/img/menu-pic/hotPizza/hawaiian.jpeg', 1499, TRUE, 20, 1),
         ('Veggie deluxe', 'mushrooms, green peppers, onion mix, black olives and Roma tomatoes. (Good healthy option!)', '/img/menu-pic/hotPizza/veggie_deluxe.jpeg', 1499, TRUE, 20, 1),
         ('Bacon & Prosciutto', 'Two newest toppings, prosciutto & arugula, with mozzarella cheese and home style Italian tomato sauce.', '/img/menu-pic/hotPizza/proscuitoArugula.webp', 1199, TRUE, 20, 1),
         ('Meat Supreme', 'Topped with classic pepperoni, bacon crumble, salami, spicy Italian sausage, mozzarella cheese, and Italiano blend seasoning.', '/img/menu-pic/hotPizza/meat-supreme.jpeg', 1399, TRUE, 20, 1),
         ('Bacon CheeseBurger', 'Cheeseburger. Pizza. Two comfort-food classics in one, with ground beef, bacon crumble and six-cheese blend', '/img/menu-pic/hotPizza/bacondblchburg.webp', 1199, TRUE, 20, 1),
         ('Angus Burger', 'Made with premium, flame-grilled 100% Canadian Angus beef. Looney''s quarter pound Angus Burger is sure to make your taste buds happy. Served with your choice of a side and a drink.', '/img/menu-pic/looneys/angus_beef.png', 1199, TRUE, 20, 2),
         ('Grilled Chicken Wrap', 'With a flame-grilled 100% Canadian Chicken breast, topped the way you want it, Looney''s Grilled Chicken Wrap is great for lunch or dinner. Served with your choice of a side and a drink.', '/img/menu-pic/looneys/crispy-chicken-wrap.jpg', 1299, TRUE, 20, 2),
         ('Crispy Chicken Salad', '100% Canadian Crispy Chicken served over a fresh blend of lettuce with shredded carrot, tomatoes, cucumbers and topped the way you like it. Served with your choice of soft drink.', '/img/menu-pic/looneys/crispy-chicken-salad.jpg', 1399, TRUE, 20, 2),
         ('Classic Shrimp Scampi Fritta', 'Lightly breaded, fried and tossed in our signature scampi sauce.', '/img/menu-pic/looneys/shrimp-scampi-fritta-dpv.webp', 1179, TRUE, 20, 5),
         ('Chicken Parmigiana', 'Two lightly fried parmesan-breaded chicken breasts are smothered with homemade marinara sauce and melted Italian cheeses served with a side of spaghetti', '/img/menu-pic/looneys/chicken-parm.webp', 1829, TRUE, 20, 5),
         ('Classic Lasagna', 'Prepared fresh daily with layers of pasta, parmesan, mozzarella, pecorino romano and our homemade meat sauce.', '/img/menu-pic/looneys/lasagna-classico-.webp', 1799, TRUE, 20, 5),
         ('Fettuccine Alfredo (V)', 'Rich and creamy alfredo sauce served with fettuccine pasta', '/img/menu-pic/looneys/fettuccine-alfredo.webp', 1579, TRUE, 20, 5),
         ('Five Cheese Ziti Al Forno', 'A baked blend of Italian cheeses, pasta and our signature five cheese marinara.', '/img/menu-pic/looneys/five-cheese-ziti.webp', 1699, TRUE, 20, 5),
         ('Cheese Ravioli', 'Filled with a blend of indulgent Italian cheeses, topped with your choice homemade meat sauce and melted mozzarella.', '/img/menu-pic/looneys/cheese-ravioli.webp', 1579, TRUE, 20, 5),
         ('Shawarma sandwich', 'Beef on pita served with side of garlic potatoes', '/img/menu-pic/shawarma-royale/shawarma-sandwich.jpg', 800, TRUE, 20, 3),
         ('Falafel plate', 'Falafel platter comes with, potatoes, rice,salad,toppings and bread', '/img/menu-pic/shawarma-royale/falafel-plate.jpg', 1400, TRUE, 20, 3),
         ('Donair Plate', 'Donair platter comes with, potatoes, rice,salad,toppings and bread', '/img/menu-pic/shawarma-royale/donair-plate.jpg', 1600, TRUE, 20, 3),
         ('Quesadilla', 'Meat quesadilla with veggies, beans and cheese, served with salsa and sour cream', '/img/menu-pic/mq/quesadilla.jpg', 1050, TRUE, 20, 4),
         ('Taco', 'Tacos with chicken cheese, cilantro, jalapenos and sauce', '/img/menu-pic/mq/taco.jpeg', 1195, TRUE, 20, 4),
         ('Queso Burrito', 'Delicious fully loaded burrito with special queso', '/img/menu-pic/mq/burrito.jpg', 1145, TRUE, 20, 4),
         ('Burrito Bowl', 'with pork, brown rice, veggies, beans, cheese and secret sauce', '/img/menu-pic/mq/burrito_bowl.jpeg', 1295, TRUE, 20, 4),
         ('Churros', 'Authentic mexican churros with chocolate sauce', '/img/menu-pic/mq/churros.jpeg', 225, TRUE, 20, 4);

INSERT INTO orders (customer_id, order_date, order_status, restaurant_id, total_price)
  VALUES (1, '2021-06-26 20:26:43.165766', 'completed', 1, 3000),
         (1, '2021-06-27 20:26:43.165766', 'completed', 1, 3000),
         (1, '2021-06-28 20:26:43.572459', 'completed', 1, 3000);

INSERT INTO order_items (order_id, menu_item_id, quantity, order_price)
  VALUES (1, 1, 1, 1500),
         (1, 2, 1, 1500),
         (2, 1, 2, 3000),
         (2, 2, 2, 3000),
         (3, 3, 1, 1500),
         (3, 2, 2, 3000);

