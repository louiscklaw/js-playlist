const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const faker = require('faker');

const DockerProvision = require('../../src/models/docker_provision.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const dockerProvisionOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const dockerProvisionTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
};

const insertDockerProvisions = async (dockerProvisions) => {
  await DockerProvision.insertMany(dockerProvisions.map((dockerProvision) => ({ ...dockerProvision, password: hashedPassword })));
};

module.exports = {
  dockerProvisionOne,
  dockerProvisionTwo,
  insertDockerProvisions,
};
