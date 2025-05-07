# Setup

Backend server:
- Install: `npm install`
- Build: `npm run build`
- Start: `npm run start`
  - Note: The `build` and `start` scripts are optimised for PowerShell. If you would like to run commands differently, please change the scripts accordingly (e.g. `"build": "node_modules/typescript/bin/tsc"` and `"start": "node build/index.js"`)!

Database:
- Build: `docker build -t test_management_db .`
- Start: `docker run -p 6000:27017 -it --name test_managemenet_db_container -d test_management_db`


# Endpoints

Example endpoint calls:

- Register: `curl -X POST -d "email=test@example.com&password=Test1234" localhost:5000/app/register`
- Login: `curl -X POST -d "username=test@example.com&password=Test1234" localhost:5000/app/login`
- Logout: `curl -X POST localhost:5000/app/logout`