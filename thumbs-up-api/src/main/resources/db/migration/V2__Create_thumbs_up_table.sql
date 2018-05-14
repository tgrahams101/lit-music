CREATE TABLE Thumbsups (
  ID serial NOT NULL,
  favorite_id integer NOT NULL,
  time_stamp TIMESTAMPTZ
)