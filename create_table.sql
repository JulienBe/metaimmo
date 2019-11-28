CREATE TABLE house
( 
    id integer CONSTRAINT house_pk PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    link TEXT,
    images TEXT[],
    region_name TEXT,
    departement_name TEXT,
    zip_code integer,
    loc point,
    price integer,
    sell_date date,
    seller_id integer,
    selleer_type TEXT,
    seller_name TEXT,
    real_estate_type TEXT,
    rooms integer,
    square integer,
    land_size integer,
    ges integer,
    energy_rate integer,
    immo_sell_type TEXT
);
