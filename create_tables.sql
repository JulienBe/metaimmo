CREATE TABLE guesstimate
(
    id SERIAL CONSTRAINT guesstimate_pk PRIMARY KEY,
    amount INTEGER,
    ref TEXT
);

CREATE TABLE seller
(
    id TEXT CONSTRAINT seller_pk PRIMARY KEY,
    seller_type TEXT,
    seller_name TEXT
);

CREATE TABLE house
( 
    id INTEGER CONSTRAINT house_pk PRIMARY KEY,
    title TEXT NOT NULL,
    house_description TEXT,
    link TEXT,
    images TEXT[],
    region_name TEXT,
    departement_name TEXT,
    zip_code INTEGER,
    loc POINT,
    price INTEGER,
    sell_date date,
    real_estate_type TEXT,
    rooms INTEGER,
    square INTEGER,
    ges TEXT,
    energy_rate TEXT,
    immo_sell_type TEXT,
    guesstimate_id INTEGER REFERENCES guesstimate(id),
    seller_id TEXT REFERENCES seller(id)
);
