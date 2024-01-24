# QueryWhitelistedDomainWithNodeJs

## About
Checking whether the specified domain name is on the list of known malware using the DirectConnect API. Making DNS queries using the dnspython library for the domain names presented for control. Creating a graph showing the percentage distribution of the last 50 queries as "whitelisted" and "not whitelisted".

## Requirements
Python, pip, nodejs, npm

## Installation
Run `npm install -g nodemon` for installing nodemon module globally.

Run `npm install` for installing node modules.

Run `pip install dnspython` for installing dnspython library.

Create database in MongoDb for mongoose connection.

## Running Server Locally
Run `npm start` / `nodemon app` / `node app` 
