# Tech Blog

## Description

This application is a blog site where developers can publish their blog posts and comment on other developers’ posts as well. The app is built using Node.js and follows the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Deployed Website

https://the-tech-post.herokuapp.com/

## User Story

As a developer who writes about tech, I want a CMS-style blog site so that I can publish articles, blog posts, and my thoughts and opinions.

## Features

- Homepage that includes existing blog posts (if any have been posted), navigation links for the homepage and the dashboard, and the option to log in.
- Sign up and sign in pages that prompt users to create a username and password.
- Logged-in users see navigation links for the homepage, dashboard, and the option to log out.
- The homepage displays existing blog posts that include the post title and the date created.
- Clicking on an existing blog post presents the post title, contents, post creator's username, and date created for that post, and the option to leave a comment.
- Users can add new blog posts and edit/delete existing blog posts on their dashboard.
- Users can add comments to existing blog posts.
  -User authentication using express-session npm package.

## Install

To use this application, you will need Node.js and MySQL installed on your machine.

1. Clone the repository to your local machine.
2. Run npm install in your terminal to install the necessary dependencies.
3. Create a .env file in the root directory of the project with your MySQL username and password, and a session secret:

```
DB_NAME = "blog_db"
DB_USER = ""
DB_PASSWORD = ""
```

4. Run the database schema with mysql SOURCE db/schema.sql.
5. Start the server with npm start.
6. Navigate to http://localhost:3001 in your web browser.

## Technologies Used

- Handlebars.js
- Sequelize
- Express.js
- express-session
- Node.js
