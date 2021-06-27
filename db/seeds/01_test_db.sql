-- Users table seeds here (Example)
INSERT INTO restaurants (name, email, password, street, city, country, phone_number, type_of_cuisine)
  VALUES ('hotPizza', 'hotpizza@pizza.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.', '1 Yonge St', 'Toronto', 'Canada', '+16472223333', 'pizza');

INSERT INTO customers (name, phone_number, email, password)
  VALUES ('Kevin Klein', '+16473334444', 'kevin.klein@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
         ('Bob Kim', '+14162223333', 'bob.kim@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
         ('Edward Lee', '+14163555999', 'edward.lee@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO menu_items (name, description, image_url, price, is_available, prep_time, restaurant_id)
  VALUES ('Pepperoni', 'extra pepperoni + extra cheese!', '/menu-pic/hotPizza/pepperoni.jpeg', 1500, TRUE, 20, 1),
         ('Hawaiian', 'Canadian bacon + pineapple', '/menu-pic/hotPizza/hawaiian.jpeg', 1500, TRUE, 20, 1),
         ('Veggie deluxe', 'mushrooms, green peppers, onion mix, black olives and Roma tomatoes. (Good healthy option!)', '/menu-pic/hotPizza/veggie_deluxe.jpeg', 1500, TRUE, 20, 1);
