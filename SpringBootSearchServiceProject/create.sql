create database if not exists SpringDataBase;
Use SpringDataBase;
Create table IF NOT EXISTS SearchHistory (
searchId mediumint,
userId varchar(255),
airport varchar(255),
searchdate date,
plotted_image longblob,
dateCreated date,
hour varchar(45)
);
