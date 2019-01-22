# CalipsoPlus Frontend

The aim of this project is to provide a frontend for the CalipsoPlus JRA2 Demonstrator application.

### Contents

*  [Architecture](#architecture)
*  [Requirements](#requirements)
*  [Development setup](#development-setup)
    *  [Installation](#installation)
    *  [Running the development server](#running-the-development-server)
*  [Configuration](#configuration)
*  [Deploy](#deploy)
    *  [Build](#build)
    *  [Running under Apache 2](#running-under-apache-2)


## Architecture

This frontend is build using [Angular 6](https://angular.io/) and interfaces with the [CalipsoPlus RESTful backend](https://github.com/Calipsoplus/calipsoplus-backend), which is developed in Python 3 using the [Django](https://www.djangoproject.com/) and [Django REST](https://www.django-rest-framework.org/) frameworks.

Additionally, this frontend also interfaces with an [Apache Guacamole](https://guacamole.apache.org/) service to provide access to the remote resources (Docker containers, virtual machines...) requisitioned by the users of the application.

## Requirements

(TODO)

## Development setup

The only prerequisites for a development setup is to have a working NodeJS/NPM installation in your system (any recent LTS release of Node will suffice) and install the ngi-cli package.

```bash
npm install -g @angular/cli
```

### Installation
In the project folder, run `npm install` to download any required dependencies.

### Running the development server
To start a development server, run `ng serve`. This will start a development server listening in [http://localhost:4200](http://localhost:4200). The application will automatically reload if you change any of the source files.

## Configuration

For the application to function properly, the relevant environment settings need to be configured. The configuration files have to be stored in the **src/environments** folder, use the provided example files for reference. By default, the environment.ts file, the "dev" environment, will be used.

These files contain the mappings to the backend and Guacamole instance.

## Deploy

### Build
To build the project, use `ng build`. The build artifacts will be stored in the **dist/** directory. 

To specify the environment use `ng build --configuration={ENVIRONMENT}`, where environment is one of dev, test, demo, docker, or prod. These environments correspond to each of the files in the **src/environments** folder. 

In case you are deploying the application behind a proxy, you will also need to use the `--base-href {HREF}` option to specify the base path used in the internal links inside the application (eg.: `--base-href '/calipsoplus/'`), this has to match with the ProxyPass setting in the Apache config file.

### Running under Apache 2
The result of the build step is to be used as the site in the deployment server. Set up a configuration file in the **APACHE_DIR/apps-available**, where APACHE_DIR is the APACHE 2 root folder. Sym-link the file to the **APACHE_DIR/apps-enabled** folder to enable the application and reload the server settings (`sudo service apache2 reload`).

The following snippet is provided for reference:
```apache
RewriteEngine On
RewriteCond %{HTTPS} !=on
RewriteRule ^/calipsoplus/?(.*) https://%{SERVER_NAME}/calipsoplus/$1 [R=301,L]

ProxyPass /calipsoplus !
Alias /calipsoplus {APPLICATION_FOLDER}

<Directory {APPLICATION_FOLDER}>
        Order allow,deny
            Allow from all
            Require all granted
        AllowOverride All
                Options Indexes FollowSymLinks
</Directory>

```
Replace **APPLICATION_FOLDER** with the path to the folder that contains the results of the build step.
