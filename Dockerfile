FROM node:10 as base
ARG ANGULAR_CLI_VERSION=8.0.6
RUN NG_CLI_ANALYTICS=ci npm install -g @angular/cli@${ANGULAR_CLI_VERSION}
RUN ng v
RUN apt update
RUN apt install -y chromium

FROM base as source
WORKDIR /build
COPY package.json .
RUN NG_CLI_ANALYTICS=ci npm install
COPY . .

FROM source as test
RUN ng test --browsers=ChromiumCI --watch=false --code-coverage

FROM test as build
RUN ng build --prod --configuration=production

FROM nginx:alpine
COPY --from=build /build/dist/qa-cv-standalone /opt/qa-cv-standalone
COPY nginx.conf /etc/nginx/nginx.conf

