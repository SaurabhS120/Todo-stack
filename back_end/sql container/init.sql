CREATE USER docker;
CREATE DATABASE NotesDB;

SELECT datname FROM pg_database;

\c notesdb
  

CREATE TABLE Notes (
    ID serial primary key,
    note varchar(32)
);

SELECT *
FROM pg_catalog.pg_tables
WHERE schemaname != 'pg_catalog' AND 
    schemaname != 'information_schema';

INSERT INTO notes(note) VALUES ('test note');