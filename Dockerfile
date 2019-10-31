FROM node:10 as build
ARG ANGULAR_CLI_VERSION=8.0.6
RUN NG_CLI_ANALYTICS=ci npm install -g @angular/cli@${ANGULAR_CLI_VERSION}
RUN ng v
RUN apt update
RUN apt install -y chromium

WORKDIR /build
COPY package.json .
RUN NG_CLI_ANALYTICS=ci npm install
COPY . .
RUN ng test --browsers=ChromiumCI --watch=false
RUN ng build --prod --configuration=production

FROM nginx:alpine
COPY --from=build /build/dist/qa-cv-standalone /opt/qa-cv-standalone
COPY nginx.conf /etc/nginx/nginx.conf
