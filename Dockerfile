FROM hub.c.163.com/library/nginx:latest
COPY ./dist/ /usr/share/nginx/html/
