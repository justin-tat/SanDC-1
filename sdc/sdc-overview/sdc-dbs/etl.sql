\c sdc
COPY sdc.products.product(product_id, name, slogan, description, category, default_price)
FROM '/Users/n8/HackReactor/Coding/sandc/SanDC/sdc/sdc-overview/sdc-dbs/product.csv'
DELIMITER ','
CSV HEADER;