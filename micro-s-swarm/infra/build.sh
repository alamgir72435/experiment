


docker stack rm somity;
cd ../;
cd server/;
docker build -t somity-server .
cd ../;
cd collection-process;
docker build -t collection-process-server .
cd ../;
docker stack deploy -c docker-compose.yaml somity;
# Create Network
# docker network create -d overlay --attachable somity;
# Create Nats Deployment
# docker service create -d -p 4222:4222 --name nats-depl --network somity nats-streaming:0.17.0;
# // Create main service
# docker service create -d -p 6000:6000 --name somity-server --network somity somity-server;