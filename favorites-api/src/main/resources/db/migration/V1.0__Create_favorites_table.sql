create table Favorites (
    ID serial,
    title varchar(100) NOT NULL,
    artist_name varchar(100) NOT NULL,
    artwork_url text,
    short_description text,
    description text,
    release_date date,
    record_label text

);