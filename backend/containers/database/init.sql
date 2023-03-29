CREATE DATABASE Toro;
\c Toro

CREATE SEQUENCE account_id_factory;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  cpf VARCHAR(11) UNIQUE
);

CREATE TABLE accounts (
    id INT PRIMARY KEY NOT NULL DEFAULT nextval('account_id_factory'),
    current_balance FLOAT,
    cpf VARCHAR(11) REFERENCES users(cpf)
);

CREATE TABLE assets (
  id SERIAL PRIMARY KEY,
  symbol VARCHAR(10) UNIQUE,
  current_price DECIMAL(10, 2)
);

CREATE TABLE user_assets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  asset_id INTEGER REFERENCES assets(id),
  amount INTEGER
);

INSERT INTO users (name, cpf) VALUES ('João', '12345678900');
INSERT INTO users (name, cpf) VALUES ('Maria', '23456789011');

INSERT INTO assets (symbol, current_price) VALUES ('PETR4', 28.44);
INSERT INTO assets (symbol, current_price) VALUES ('SANB11', 40.77);
INSERT INTO assets (symbol, current_price) VALUES ('VALE3', 103.11);

INSERT INTO accounts (current_balance, cpf) VALUES (234.0, '12345678900');
INSERT INTO accounts (current_balance, cpf) VALUES (450.2, '23456789011');

INSERT INTO user_assets (user_id, asset_id, amount) VALUES (1, 1, 2);
INSERT INTO user_assets (user_id, asset_id, amount) VALUES (1, 2, 3);
INSERT INTO user_assets (user_id, asset_id, amount) VALUES (1, 3, 4);
INSERT INTO user_assets (user_id, asset_id, amount) VALUES (2, 3, 5);
INSERT INTO user_assets (user_id, asset_id, amount) VALUES (2, 1, 2);