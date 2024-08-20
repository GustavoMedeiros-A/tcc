CREATE TABLE Clientes (
    ID SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100)
);

CREATE TABLE Produtos (
    ID SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    descricao TEXT,
    preco DECIMAL(10, 2)
);

CREATE TABLE Pedidos (
    ID SERIAL PRIMARY KEY,
    data DATE,
    ID_cliente INT REFERENCES Clientes(ID)
);

CREATE TABLE Itens_Pedido (
    ID SERIAL PRIMARY KEY,
    ID_pedido INT REFERENCES Pedidos(ID),
    ID_produto INT REFERENCES Produtos(ID),
    quantidade INT
);

CREATE TABLE Estoque (
    ID SERIAL PRIMARY KEY,
    ID_produto INT REFERENCES Produtos(ID),
    quantidade_disponivel INT
);
