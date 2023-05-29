import { Schema, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';

// Schemas define the shape of the documents within the collection.
const UserSchema = new Schema(
  {
    // Schemas define the properties of the document
    fullname: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "please provide a valid email address"]
    },
    addressStreet: {
      type: String,
      required: true,
      trim: true
    },
    addressStreet2: {
      type: String,
      trim: true
    },
    addressCity: {
      type: String,
      required: true,
      trim: true
    },
    addressState: {
      type: String,
      required: true,
      trim: true
    },
    addressZip: {
      type: String,
      required: true,
      trim: true
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      // TODO: add regex to validate phone number
      match: [/^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/, "please provide a valid phone number"]
    },
    passwordHash: {
      type: String,
      required: true,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post'
      }
    ],
    images: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Image'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date
    }
  },
  {
    toJSON: {
      virtuals: true
    },
    id: false,
  }
);

// Create model using mongoose.model()
const User = model('User', UserSchema);

const customizationOptions = {};
const UserTC = composeMongoose(User, customizationOptions);

schemaComposer.Query.addFields({
  userById: UserTC.mongooseResolvers.findById(),
  userByIds: UserTC.mongooseResolvers.findByIds(),
  userOne: UserTC.mongooseResolvers.findOne(),
  userMany: UserTC.mongooseResolvers.findMany(),
  userDataLoader: UserTC.mongooseResolvers.dataLoader(),
  userDataLoaderMany: UserTC.mongooseResolvers.dataLoaderMany(),
  userByIdLean: UserTC.mongooseResolvers.findById({ lean: true }),
  userByIdsLean: UserTC.mongooseResolvers.findByIds({ lean: true }),
  userOneLean: UserTC.mongooseResolvers.findOne({ lean: true }),
  userManyLean: UserTC.mongooseResolvers.findMany({ lean: true }),
  userDataLoaderLean: UserTC.mongooseResolvers.dataLoader({ lean: true }),
  userDataLoaderManyLean: UserTC.mongooseResolvers.dataLoaderMany({ lean: true }),
  userCount: UserTC.mongooseResolvers.count(),
  userConnection: UserTC.mongooseResolvers.connection(),
  userPagination: UserTC.mongooseResolvers.pagination(),
});

schemaComposer.Mutation.addFields({
  userCreateOne: UserTC.mongooseResolvers.createOne(),
  userCreateMany: UserTC.mongooseResolvers.createMany(),
  userUpdateById: UserTC.mongooseResolvers.updateById(),
  userUpdateOne: UserTC.mongooseResolvers.updateOne(),
  userUpdateMany: UserTC.mongooseResolvers.updateMany(),
  userRemoveById: UserTC.mongooseResolvers.removeById(),
  userRemoveOne: UserTC.mongooseResolvers.removeOne(),
  userRemoveMany: UserTC.mongooseResolvers.removeMany(),
});

const schema = schemaComposer.buildSchema();

export default schema;
