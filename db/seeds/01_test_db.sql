-- Users table seeds here (Example)
INSERT INTO restaurants (name, email, password, street, city, country, phone_number, type_of_cuisine)
  VALUES ('hotPizza', 'hotpizza@pizza.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '1 Yonge St', 'Toronto', 'Canada', '+18198560945', 'pizza');

INSERT INTO customers (name, phone_number, email, password)
  VALUES ('Kevin Klein', '+18198560945', 'kevin.klein@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
         ('Bob Kim', '+14162223333', 'bob.kim@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
         ('Edward Lee', '+14163555999', 'edward.lee@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO menu_items (name, description, image_url, price, is_available, prep_time, restaurant_id)
  VALUES ('Pepperoni', 'extra pepperoni + extra cheese!', '/img/menu-pic/hotPizza/pepperoni.jpeg', 1500, TRUE, 20, 1),
         ('Hawaiian', 'Canadian bacon + pineapple', '/img/menu-pic/hotPizza/hawaiian.jpeg', 1500, TRUE, 20, 1),
         ('Veggie deluxe', 'mushrooms, green peppers, onion mix, black olives and Roma tomatoes. (Good healthy option!)', '/img/menu-pic/hotPizza/veggie_deluxe.jpeg', 1500, TRUE, 20, 1);

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

