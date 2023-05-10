Install PostgreSQL
```sudo apt-get install postgresql postgresql-contrib```

Check status of postgress
``` sudo systemctl status postgresql```

Install Project: 

1. Make sure you have installed node, PostgreSQL, NPM, Sequelize-cli on your machine

2. Navigate to the directory you want to project download.

3. Execute following command: 
```git clone git@github.com:DavitKheoshvili/inventories.git```
4. Go to the project root: 
``` cd inventories ```
5. Navigate to frontend directory and run command: 
``` npm install ``` 
Do same for backend directory. 
7. Create postgres db: ```createdb <database_name>```
8. run ```npx sequelize-cli init:config``` to generate configuration file and fill it with your data.
9. Navigate to backend directory and run following command to migrate DB: 
```npx sequelize-cli db:migrate``` 
10. Make sure 3000 and 4200 ports are not used on your machine. Otherwise change ports inthe config file.
11. run ```npm run start``` from backend directory.
12. open new terminal run ```ng serve``` from frontend directory.
