DROP TABLE IF EXISTS restaurants;
CREATE TABLE restaurants (
  place_id SERIAL UNIQUE PRIMARY KEY,
  restaurant_name VARCHAR(60) NOT NULL,
  formatted_address VARCHAR(120) NOT NULL,
  international_phone_number VARCHAR(20) NOT NULL,
  website VARCHAR(120) NOT NULL,
  google_map_url VARCHAR(120) NOT NULL,
  open_now JSON NOT NULL,
  longitude FLOAT (10) NOT NULL,
  latitude FLOAT (10) NOT NULL
)