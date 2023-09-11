<p align="center">
  <a  target="blank"><img src="https://miro.medium.com/v2/resize:fit:1000/0*4Sm8jbdZunAYusQF.gif" width="200" alt="Nest Logo" /></a>
    <a target="blank"><img src="https://expressjs.com/images/express-facebook-share.png" width="200" alt="TypeORM Logo" /></a>
      <a target="blank"><img src="https://repository-images.githubusercontent.com/37153337/9d0a6780-394a-11eb-9fd1-6296a684b124" width="200" alt="Postgres Logo" /></a>
 <a target="blank"><img src="https://res.cloudinary.com/practicaldev/image/fetch/s--u9yx6diw--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/anuqor6vk1ibmhq8ntrf.png" width="200" alt="Postgres Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


  <p align="center">Full-stack MERN Sports Center application developed using MongodB, Express.JS, React.JS and Node.JS</p>

## Description

Full-stack MERN Sports Center application developed using MongodB, Express.JS, React.JS and Node.JS

Users are separated into admin and user roles. Users are able to enroll in up to 2 sport classes.
Each sport class has multiple age groups. A maximum of 10 users can be assigned to the same class term.
Admins are able to view, edit and manage classes for each of the sports, change dates and times
for each week and view users who applied for each course in a given period.
Admins can manage and delete users.
Each user can leave comments and ratings on each sport class
<br/>

Functionalities:
<ul>
  <li>User Authentication w/ Email Verification</li>
  <li>Role-Based Authorization</li>
  <li>Admin Sport Class Management</li>
  <li>Admin User Management</li>
  <li>Class rating</li>
  <li>Class commentingt</li>
  <li>User Image Management</li>
</ul>

### Setup Instructions
- Run `npm install` both in server and client folders
- Run `npm start` to start client
- Run `npm run dev` to start server
- Set up env variables in .env file (MongoDB cluster required)
