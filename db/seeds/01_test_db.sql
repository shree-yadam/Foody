-- Users table seeds here (Example)
INSERT INTO restaurants (name, email, password, street, city, country, phone_number, type_of_cuisine, logo_url, description, timings)
  VALUES ('HotPizza', 'hotpizza@pizza.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '1 Yonge St', 'Toronto', 'Canada', '+12345678900', 'pizza', '/img/logo/hot-pizza-logo.png', 'The thinnest, crispiest and most flavorful crust!', 'everyday 11a.m. - 9p.m.'),
  ('Looney''s', 'looneys@mmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '1 Olde St', 'Toronto', 'Canada', '+12345678902', 'family', '/img/logo/looneys-logo.jpg', 'Comfort food at it''s best', 'Tue - Sun 11a.m.- 2p.m. and 5p.m. - 9p.m.'),
  ('Shawarma Royale', 'shawarmaR@fmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '3 Restaurant St', 'Toronto', 'Canada', '+12345678901', 'mediterranean', '/img/logo/shawarma-royale-logo.jpg', 'Fresh ingredients and authentic mediterranean flavors', 'Eveyrday 11a.m.- 3p.m. and 5p.m. - 9p.m.');

INSERT INTO customers (name, phone_number, email, password)
  VALUES ('Kevin Klein', '+12345678900', 'kevin.klein@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
         ('Bob Kim', '+14162223333', 'bob.kim@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
         ('Edward Lee', '+14163555999', 'edward.lee@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO menu_items (name, description, image_url, price, is_available, prep_time, restaurant_id)
  VALUES ('Pepperoni', 'extra pepperoni + extra cheese!', '/img/menu-pic/hotPizza/pepperoni.jpeg', 1500, TRUE, 20, 1),
         ('Hawaiian', 'Canadian bacon + pineapple', '/img/menu-pic/hotPizza/hawaiian.jpeg', 1500, TRUE, 20, 1),
         ('Veggie deluxe', 'mushrooms, green peppers, onion mix, black olives and Roma tomatoes. (Good healthy option!)', '/img/menu-pic/hotPizza/veggie_deluxe.jpeg', 1500, TRUE, 20, 1),
         ('Angus Burger', 'Made with premium, flame-grilled 100% Canadian Angus beef. Looney''s quarter pound Angus Burger is sure to make your taste buds happy. Served with your choice of a side and a drink.', '/img/menu-pic/looneys/angus_beef.png', 1200, TRUE, 20, 2),
         ('Grilled Chicken Wrap', 'With a flame-grilled 100% Canadian Chicken breast, topped the way you want it, Looney''s Grilled Chicken Wrap is great for lunch or dinner. Served with your choice of a side and a drink.', '/img/menu-pic/looneys/crispy-chicken-wrap.jpg', 1300, TRUE, 20, 2),
         ('Crispy Chicken Salad', '100% Canadian Crispy Chicken served over a fresh blend of lettuce with shredded carrot, tomatoes, cucumbers and topped the way you like it. Served with your choice of soft drink.', '/img/menu-pic/looneys/crispy-chicken-salad.jpg', 1400, TRUE, 20, 2),
         ('Shawarma sandwich', 'Beef on pita served with side of garlic potatoes', '/img/menu-pic/shawarma-royale/shawarma-sandwich.jpg', 800, TRUE, 20, 3),
         ('Falafel plate', 'Falafel platter comes with, potatoes, rice,salad,toppings and bread', '/img/menu-pic/shawarma-royale/falafel-plate.jpg', 1400, TRUE, 20, 3),
         ('Donair Plate', 'Donair platter comes with, potatoes, rice,salad,toppings and bread', '/img/menu-pic/shawarma-royale/donair-plate.jpg', 1600, TRUE, 20, 3);

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

