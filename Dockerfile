FROM nginx:alpine
LABEL maintainer="DevQAC"
COPY dist/qa-cv-standalone /usr/share/nginx/html
COPY env/config/default.conf /etc/nginx/conf.d

