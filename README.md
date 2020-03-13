## Para qualquer operacao no banco de dados utilizar migrations
https://sequelize.org/master/manual/migrations.html

- npx sequelize-cli migration:generate --name $NAME  // criar arquivo base para migrations
- npx sequelize-cli db:migrate // roda as migrations pendentes