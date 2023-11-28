# AutoRia Clone
#### AutoRia Clone is a modern web application for car sales using a serverless home computing environment. 
#### It is designed to handle significant user traffic and is flexible enough to be constantly updated. 
#### The application caters to various user roles and functions, including both basic and premium accounts.

## Getting Started
### Ensure AWS CLI is installed on your system. If not, download and install it from https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
### Node.js version 18.x or later should be installed. Download it from the official Node.js website.
### Serverless framework installed globally. [npm install -g serverless]
### Run AWS Configure Command:  [aws configure]
### Enter Credentials:
##### AWS Access Key ID: Enter AWS_S3_ACCESS_KEY
##### AWS Secret Access Key: Enter AWS_S3_SECRET_ACCESS_KEY
##### Default Region Name: eu-west-1
##### Default Output Format: json (You can leave this blank)

### Clone the repository:
### git clone https://github.com/AlenaMushko/AutoRia
### cd AutoRia
### npm install
### npm run start

### cd AutoRia/serverless
### sls deploy --stage dev

## Technical Stack
###### Runtime: AWS Lambda with Node.js v18.x.
###### Programming Language: TypeScript.
###### Bundling and Transpilation: esbuild.
###### Infrastructure as Code: Serverless Framework.
###### Database: MongoDB.
###### Caching: Node-cache.
###### Authentication and Security: bcrypt, JSON Web Tokens (JWT).
###### Email Services: Nodemailer, Express Handlebars, AWS SES.
###### File Uploads: Express Fileupload.
###### API Documentation: Swagger UI Express.
###### Code Quality and Linting: ESLint with Prettier, TypeScript ESLint.
###### Development Tools: Nodemon, ts-watch.
###### Additional Libraries: @middy/*, dayjs, joi.

## Project Structure
### src/handlers/ - Contains Lambda function handlers.
### serverless.yml - Serverless Framework configuration file.
### src - Express

#### src/handlers/: contains AWS Lambda function handlers responsible for:
#### getAllUsers: get users with pagination and query
#### getAllCars: get cars with pagination and query
#### etQueryPrice: Handles car price queries based on region.
#### getQueryCount: Returns the number of queries for a specific vehicle ID.
#### cronOldTokensRemover: Scheduled task to remove old tokens (at 3:00 AM every Monday).
#### cronUpdatePrice: Scheduled car price update feature to ensure listings have the most up-to-date pricing information. (at 8:20 every day).
#### serverless.yml: A configuration file for the Serverless Framework that defines AWS resources, Lambda functions, and other service settings.

### src: Contains the server-side code written by Express.js

#### Endpoint: /auth
###### Functionality: Manages authentication and authorization processes.
#### Endpoint: /roles
###### Functionality: manages operations related to various user roles on the platform (customer, seller, manager, admin)
#### Endpoint: /users
###### Functionality: Performs operations related to the user.
#### Endpoint: /brands
###### Functionality: designed for operations related to car brands.
#### Endpoint: /models
###### Functionality: focused on car models for a specific brand.
#### Endpoint: /cars
###### Functionality: a central place in the management of the list of cars.

## Postman Collection 
###### autoRia.postman_collection.json




