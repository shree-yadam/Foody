-- Users table seeds here (Example)
INSERT INTO restaurants (name, email, password, street, city, country, phone_number, type_of_cuisine)
  VALUES ('hotPizza', 'hotpizza@pizza.com', 'password', '1 Yonge St', 'Toronto', '647-222-3333', 'pizza');

INSERT INTO customers (name, phone_number, email, password)
  VALUES ('Kevin Klein', '647-333-4444', 'kevin.klein@gmail.com', 'password'),
         ('Bob Kim', '416-222-3333', 'bob.kim@gmail.com', 'password'),
         ('Edward Lee', '416-355-5999', 'edward.lee@email.com', 'password');

INSERT INTO menu_items (name, description, image_url, price, is_available, prep_time, restaurant_id)
  VALUES ('pepperoni', 'pepperoni pizza', '/../menu-pic/hotPizza/pepperoni.jpeg', 1500, TRUE, 20, 1)
         ('hawaiian', 'hawaiian pizza', '/../menu-pic/hotPizza/hawaiian.jpeg', 1500, TRUE, 20, 1)
         ('veggie deluxe', 'veggie deluxe pizza', '/../menu_pic/hotPizza/veggie_deluxe', 1500, TRUE, 20, 1);
