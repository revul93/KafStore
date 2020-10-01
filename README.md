# KafStore متجر كاف

**KafStore is an online website that aims to help people sell thier own used books.**
**[Check it out](https://bit.ly/kafstore)**

## Run it on your machine:

1. Before running kafstore on your local machine, you must create default.json file in ./config directory. You have to supply your Database URI, JWT Secret Key, AWS S3 API Access Key, Access secret and S3 Bucket name. Tou can use this snippet:

```
{
  "DatabaseURI": "",
  "jwtSecret": "",
  "AWS_ACCESS_KEY": "",
  "AWS_ACCESS_SECRET": "",
  "AWS_S3_BUCKET": ""
}
```

2. Make sure you have node and npm installed on your machine.
3. Install dependencies packages for server, in the root directory
   > npm install
4. Install dependencies packages for client, in clinet directory
   > cd client
   >
   > npm install
5. Run development environment
   > npm run dev
6. Run production environmnet
   > npm run prod

## Built by:

- MERN Stack :heartpulse:
- DB is hosted on MongoDB Atlas :green_heart:
- User images is hosted using AWS S3 :blue_heart:
- Web Application is hosted on AWS EC2 Amazon Linux :blue_heart:
- Form handling using [react-hook-form](https://github.com/react-hook-form/react-hook-form)
- Thanks to: [nodemon](https://github.com/remy/nodemon), [express-validator](https://github.com/express-validator/express-validator), [mongoose](https://github.com/Automattic/mongoose), [concurrently](https://github.com/kimmobrunfeldt/concurrently) for making back-end dev life easier.
- Also thank to: [axios](https://github.com/axios/axios), [sweetalert](https://github.com/t4t5/sweetalert/tree/master/src) for saving front-end dev life.

## What needs to be improved:

- Styling :relieved:
- Sime API ends need to be optimized.
- React Components abstraction (maybe HOC will be helpful)
- S3 object management

### Disclaimer

KafStore is a college project. It's not made for business (yet).
You should use it for testing, learning and bug huntig.
Please don't use real personal information.
