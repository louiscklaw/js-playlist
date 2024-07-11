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

const categorySchema = mongoose.Schema(
  {
    title: { type: String, default: 'default category' },
    isActive: { type: Boolean, default: false },
    images: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ImageFile' }],
  },
  { timestamps: true }
);

const productSchema = mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    isActive: { type: Boolean, default: false },
    description: { type: String, required: true, trim: true },
    images: { type: mongoose.Schema.Types.Mixed },
    price: { type: Number, required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  { timestamps: true }
);

const Story = mongoose.model('Story', storySchema);
const Person = mongoose.model('Person', personSchema);
const Product = mongoose.model('Product', productSchema);
const Category = mongoose.model('Category', categorySchema);

(async () => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/test', {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(async () => {
      console.log('Connected to MongoDB');

      const author = new Person({
        _id: new mongoose.Types.ObjectId(),
        name: 'Ian Fleming',
        age: 50,
      });

      await author.save();

      const story1 = new Story({
        title: 'Casino Royale',
        author: author._id, // assign the _id from the person
        another_author: author._id, // assign the _id from the person
        fans: [author._id], // assign the _id from the person
      });

      await story1.save();

      const testCategory = new Category({
        title: 'test category',
        isActive: true,
      });
      await testCategory.save();

      const testProduct = new Product({
        name: 'test product',
        description: 'this is a test',
        price: 100,
        category: testCategory._id,
      });
      await testProduct.save();

      console.log('test1');
      console.log(await Story.findOne({ title: 'Casino Royale' }).exec());

      console.log('test2');
      const story = await Story.findOne({ title: 'Casino Royale' })
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

      console.log('test3');
      const test3 = await Product.findOne({ name: 'test product' }).populate('category').exec();

      test3.isActive = true;

      await test3.save();

      console.log(test3);

      // that's it!
      console.log('done');
    });
})();
