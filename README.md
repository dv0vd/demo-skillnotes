# Skillnotes
## https://dv0vd.xyz/demo/skillnotes 
A note management website developed using Node.js, Express, and the service-repository pattern.

## Getting started  
1) Configure the `.env` file.
2) In `./views/404.njk`, uncomment the link.
3) In `./views/_layout.njk`, set the `basePath` constant to `'/'`.
4) In `./frontend-src/api.js`, set the `basePath` constant to `''`.
5) In `utils.js`, `utils.js` set the `basePath` constant to `'/'`.
6) Run the command `make init`.
7) Start the project with: `make start`.
8) To stop or restart the project, use `make stop` and `make restart`, respectively.
