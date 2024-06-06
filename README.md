# rahti-2-express-server
Testing express server to connect MySQL in Rahti2.

##
```
npm init -y

npm install mysql
npm install express --save

```

Run the following commands to set the environment variables:

```
oc set env dc/my-express-app MYSQL_HOST=<mysql-service>
oc set env dc/my-express-app MYSQL_USER=<mysql-username>
oc set env dc/my-express-app MYSQL_PASSWORD=<mysql-password>
oc set env dc/my-express-app MYSQL_DATABASE=<mysql-database>
```

List the services in the project to find the MySQL service.

```
oc get svc

Deploy this project in Rahti2

```
 oc new-app https://github.com/jemaltahir/rahti-2-express-server.git --name server --strategy=docker
```
