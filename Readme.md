# Mando Smoothies

Dynamic Node.js application using MongoDB, Express, and JSON Web Tokens for authentication.

## Technologies Used

1. HTML/CSS.
1. EJS Templating Language.
1. Node.js.
1. Express Web Framework.
1. MongoDB.
1. Google Cloud Run.

## Installation Steps

1. Clone the project from the GitHub repository.
2. Open the project folder in Visual Studio Code and run the following commands.

```
npm install
```

3. Run the project

```
npm run serve
```

Since the project uses a `.env` file for security, it is advisable to provide the following key values for your own project.

```
DB_CONNECTION=<MongoDB connection string value>
PRIVATE_KEY=<JSON Web Token private key value>
JWT_MAX_AGE=<JSON Web Token maximum age value>
COOKIE_MAX_AGE=<Authentication cookie maximum age value>
```

Finally, to futher organize the code, I employ the MVC (model, view and controller) approach.

## Live Site

The live site can be accessed at the [Mando Smoothies website][website].

[website]: https://real-mando-smoothies.s3.co.ke/
