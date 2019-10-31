FROM node:10 as build
ARG ANGULAR_CLI_VERSION=8.0.6
RUN NG_CLI_ANALYTICS=ci npm install -g @angular/cli@${ANGULAR_CLI_VERSION}
WORKDIR /build
COPY . .
RUN NG_CLI_ANALYTICS=ci npm install
RUN ng v
RUN apt update
RUN apt install -y chromium
RUN ng test --browsers=ChromeHeadless --watch=false
RUN ng build --prod --configuration=production

FROM nginx:alpine
COPY --from=build /build/dist/qa-cv-standalone /opt/qa-cv-standalone
COPY nginx.conf /etc/nginx/nginx.conf
