const mongoose = require('mongoose');

const config = require('../src/config/config');
const adminSchema = require('../src/schemas/admin');

const Admin = mongoose.model('Admin', adminSchema);

// Connect to the "node-boilerplate" database
const seedAdmin = () =>
  mongoose
    .connect('mongodb://localhost:27017/node-boilerplate', config.mongoose.options)
    .then(() => {
      console.log('seeding Admin');
      console.log('clean all admin');

      return Admin.deleteMany({});
    })
    .then(() => {
      // console.log('clear Admin done')
      // console.log('connected')
    })
    .then(() => {
      const saving = Array(1)
        .fill(0)
        .map((_, idx) => {
          const newAdmin = new Admin({
            avatar:
              'https://plus.unsplash.com/premium_photo-1661715626413-97025519e975?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            city: 'Cleveland',
            country: 'USA',
            currency: '$',
            email: `admin_${idx}@devias.io`,
            hasAcceptedMarketing: true,
            isProspect: false,
            isReturning: true,
            name: 'Carson Darrin',
            state: 'Ohio',
            totalAmountSpent: 300.01,
            totalOrders: 3.1,
            isVerified: false,
          });

          return newAdmin.save();
        });

      // wait for all saving completed
      return Promise.all(saving);
    })
    .then(() => {
      mongoose.connection.close();

      console.log('seeding done');
    })
    .catch((error) => console.error(error));

module.exports = { seedAdmin };
