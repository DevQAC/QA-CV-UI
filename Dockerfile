FROM node:10 as build
RUN NG_CLI_ANALYTICS=ci npm install -g @angular/cli
WORKDIR /build
COPY . .
RUN NG_CLI_ANALYTICS=ci npm install
RUN ng build --prod --configuration=production

FROM nginx:alpine
COPY --from=build /build/dist/qa-cv-standalone /opt/qa-cv-standalone
COPY nginx.conf /etc/nginx/nginx.conf
