--psql -f pgschema.sql -p 5432


DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;
\c sdc
DROP SCHEMA IF EXISTS products CASCADE;
CREATE SCHEMA products;
CREATE TABLE sdc.products.product (
  id SERIAL,
  product_id INT,
  name TEXT,
  slogan TEXT,
  description TEXT,
  category TEXT,
  default_price TEXT,
  PRIMARY KEY (id),
  UNIQUE (product_id)
);

CREATE TABLE sdc.products.styles (
  id SERIAL,
  styles_id INT,
  product_id INT,
  PRIMARY KEY (id),
  UNIQUE (styles_id),
  CONSTRAINT fk_products
    FOREIGN KEY (product_id)
      REFERENCES sdc.products.product(product_id)
);

CREATE TABLE sdc.products.style (
  id SERIAL,
  style_id INT,
  styles_fk INT,
  skus_id INT,
  name VARCHAR (50),
  original_price VARCHAR (11),
  sale_price VARCHAR (11),
  style_default BOOLEAN,
  photos TEXT,

  PRIMARY KEY (id),
  UNIQUE (style_id),
  CONSTRAINT fk_styles
    FOREIGN KEY (styles_fk)
      REFERENCES sdc.products.styles(styles_id)
);

CREATE TABLE sdc.products.skus (
  id SERIAL,
  skus_id INT,
  quantity INT,
  size INT,
  PRIMARY KEY (id),
  UNIQUE (skus_id)
);