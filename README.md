# microservices_with_three_databases_fullstack

#login and register user
npm run start:dev

#add post
main port : npm run start:dev
listen port :npm run listen

#i am using docker to get the redis image because i am using the redis cache to store the success message if user login sucsfully to our application 
so for that need to inastall docker in your machine 
and pull redis image by using the below commend

docker pull redis

#for run the docker use below commend
docker run --name myrediscache -p 5003:6379 -d redis

#if you want to use docker cli in your terminal you have to use below commend
docker exec -it myrediscache redis-cli

#comment 
main port: npm run start:dev
listen port:npm run listen


for user login and register use mysql database
for add post use the mangoDB database 
and comment use the postgras database
