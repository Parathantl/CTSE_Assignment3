
# docker build -t $1/nginx:$2 -t $1/nginx:latest .
# docker push $1/nginx

docker build -t $1/products:$2 -t $1/products:latest .
docker push -a $1/products

docker build -t $1/checkout:$2 -t $1/checkout:latest .
docker push -a $1/checkout

docker build -t $1/review:$2 -t $1/review:latest .
docker push -a $1/review