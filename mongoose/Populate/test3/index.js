const mongoose = require('mongoose');
const { Schema } = mongoose;

const personSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  age: Number,
  stories: [{ type: Schema.Types.ObjectId, ref: 'Story' }],
});

const storySchema = Schema({
  author: { type: Schema.Types.ObjectId, ref: 'Person' },
  another_author: { type: Schema.Types.ObjectId, ref: 'Person' },
  title: String,
  fans: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
});

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);

(async () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/test', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log('Connected to MongoDB');
      await mongoose.connection.dropDatabase();

      const author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: 'Ian Fleming',
        age: 50,
      });

      await author.save();

      const another_person = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: 'another person',
        age: 51,
      });

      await another_person.save();

      const story1 = new Story({
        title: 'Casino Royale',
        author: author._id, // assign the _id from the person
        another_author: author._id, // assign the _id from the person
        fans: [author._id], // assign the _id from the person
      });

      await story1.save();

      console.log('test1');
      console.log(await Story.findOne({ title: 'Casino Royale' }).exec());

      console.log('test2');
      const story = await Story.find()
        .populate('another_author')
        .populate('author')
        .populate({
          path: 'fans',
          match: { age: { $gte: 21 } },
          // Explicitly exclude `_id`, see http://bit.ly/2aEfTdB
          select: 'name -_id',
          options: { limit: 2 },
        })
        .exec();
      console.log(story);

      // that's it!
      console.log('done');
    });
})();
