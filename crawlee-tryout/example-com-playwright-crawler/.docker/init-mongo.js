db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [
    {
      role: 'readWrite',
      db: 'test',
    },
  ],
});

db.createCollection('test'); //MongoDB creates the database when you first store data in that database
