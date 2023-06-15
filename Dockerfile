FROM node:20-alpine as build
WORKDIR /var/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

FROM httpd:2.4
EXPOSE 80
WORKDIR /usr/local/apache2/htdocs/
COPY --from=build /var/app/dist/ .
COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf
RUN touch ./.htaccess
RUN echo "<IfModule mod_rewrite.c>\n \
    RewriteEngine on\n \
    RewriteCond %{REQUEST_FILENAME} -s [OR]\n \
    RewriteCond %{REQUEST_FILENAME} -l [OR]\n \
    RewriteCond %{REQUEST_FILENAME} -d\n \
    RewriteRule ^.*$ - [NC,L]\n \
    RewriteRule ^(.*) index.html [NC,L]\n \