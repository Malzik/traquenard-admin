FROM mariadb:10.3.27

ADD ./db.sql /docker-entrypoint-initdb.d/init.sql
ADD ./meal.sql /docker-entrypoint-initdb.d/meal.sql

EXPOSE 3306