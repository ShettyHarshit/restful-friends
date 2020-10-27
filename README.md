# APIs built on Node + Express. SPA build with React.

## DATABASE MIGRATION

### Sequelize will create the tables if not present.

### We can create the tables ourself using these commands

```

CREATE TABLE IF NOT EXISTS `users` (`id` INTEGER NOT NULL auto_increment , `first_name` VARCHAR(255), `last_name` VARCHAR(255), `avatar` VARCHAR(255), `createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB;
CREATE TABLE IF NOT EXISTS `user_friends` (`createdAt` DATETIME NOT NULL, `updatedAt` DATETIME NOT NULL, `friend_id` INTEGER , `user_id` INTEGER , PRIMARY KEY (`friend_id`, `user_id`), FOREIGN KEY (`friend_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE, FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE) ENGINE=InnoDB;

```

## TESTING APIS VIA POSTMAN

### Once we start the server, we should see the welcome message we specified in our index.js, if we make a GET request to '/' using Postman or your browser.

### For all our APIs we'll make GET requests to the '/api'.

### In Postman we can view all the users by making a GET request to '/api/users'.

### Making a GET request to 'api/users/:id/friends' would return the given user with a list of the user's friends.

### We can test our APIs by using the following tests for the API status and if the GET request to '/api/users' return an array

```

pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});

pm.test("is an Array", () =>
  pm.expect(pm.response.json()).to.be.an("array").but.not.an("object")
);

```

### We can test the other to APIs for if the response body is an Object

```

pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});

pm.test("is an Object", () =>
  pm.expect(pm.response.json()).to.be.an("object")
);

```

## TESTS

### We can write unit tests for our APIs using Mocha to check GET /users always responds with an array of user objects

```
describe('/GET users', () => {
      it('it should GET all the users', (done) => {
        chai.request(server)
            .get('/api/users')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
              done();
            });
      });
  });
```
