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
