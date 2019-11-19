## The Software House - Node.js Developer recruitment task

>Hey there!
>
>This is a very old code that clearly needs some improvements :) Can you help us with it?

Hi guys!

Nice to meet you :)

I will try my best to help you with a task.

#### Stage 1 - Code review

 > Create a new GitHub/BitBucket repository and do a pull request of our code to it. Perform a code review of our code.
What should be changed in your opinion?

---

In my opinion following changes shall be done to the source:

1. Creating `.gitignore` with common values for NodeJS development
2. Separation of concerns / new files structure witch an architecture as follows:

```bash
    .
    ├── /helpers                   # utils | error handler
    ├── /models                    # model(s) (entity definition, repository actions, entity tests)
    ├── /routes                    # api routes
    ├── /tests                     # tests
    ├── index.js
    └── readme.md
```

3. Proper APP configuration - fixing initial config (express + supertest/jest)
4. Adding features and further development (validation +  tests amendment, Not Found Page, centralized error handling)

#### Stage 2 - Bug fixing

> We have tested all of the positive paths in our API, however for some reason our tests are not working
properly anymore. Can you fix it?
>
> What's more, the app is not working on production. For some reason nothing is available on address `http://localhost:3000/posts`. Can you help us?
>
> All of the fixes should be added as a new commit.

I fixed all above and since I prefer YARN (https://yarnpkg.com/) I describe the steps to validate my fix using it. With NPM it shall be a similar process.

Running tests:

```Javascript
yarn run test
```
For development I added *nodemon* (https://nodemon.io/) utility to DEV dependencies. If you willing to use it just type:

```Javascript
yarn run nodemon src/index.js
```
but simple:
```Javascript
node src/index.js
```
would work as well and you shall  see a console info:

```Javascript
λ node src\index.js
TSH app listening on port 3000! api@ http://localhost:3000/
```

#### Stage 3 - new features

>Our app lacks a few things:
>
>- validation for post body on `POST /posts` endpoint
>- not found page endpoint (right now it is a static page, we want a JSON response)
>- centralized error handling
>
>Can you help us add those features?

1. Validation has been added and is set as follows:
- title 	- required | string | min 6 chars
- body 		- required | string | min 20 chars

in Post model file under `static validatePost(post)` function.

Test cases have been extended to cover the validation within above constrains.

2. Not Found Page  is returning 404 standard error with a structure as follows:

```JSON
{
  "status":"error",
  "statusCode":404,
  "message":"Page Not Found"
}

```
3. Centralized error handler uses above JSON error structure. Test cases have been adjusted to expect above structure.


### Rules

>**Every stage should be added as separate commit.**
>
>**As a result we want to have a repository with single PR containing 3 commits: initial, bugfixing and new features.**  
>
>**Feel free to refactor our code.**

3 commits are part of PR [[link]](http://github.com "[link]") :+1: on my GitHub. In case of any question(s) shoot me a message.

Cheers. :shipit:
