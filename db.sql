CREATE TAbLE reviews(
    id BIGSERIAL NOT NULL PRIMARY KEY,
    fastfood_id INTEGER REFERENCES fastfood(id),
    name VARCHAR(50) NOT NULL,
    review TEXT NOT NULL,
    rating INT  NOT NULL check(rating >=1 and rating <=5)
);
