var crypto = require('crypto');
var mongoose = require('mongoose');

var AccountModel;
var iterations = 10000;
var saltLength = 64;
var keyLength = 64;

var AccountSchema = new mongoose.Schema({
  firstname: {
    type: String,
    require: true
  },

  lastname: {
    type: String,
    require: true
  },

  email: {
    type: String,
    require: true,
    unique: true
  },

  salt: {
    type: Buffer,
    require: true
  },

  username: {
    type: String,
    require: true,
    trim: true,
    unique: true,
    match: /^[A-Za-z0-9_\-\.]{1,16}$/
  },

  password: {
    type: String,
    require: true
  },

  createdDate: {
    type: Date,
    default: Date.now
  }
});

AccountSchema.methods.toAPI = function() {
  return {
    username: this.username,
    _id: this._id
  };
};

AccountSchema.methods.validatePassword = function(password, callback) {
  var pass = this.password;
  crypto.pbkdf2(password, this.salt, iterations, keyLength, function(err, hash) {
    if (hash.toString('hex') !== pass) {
      return callback(false);
    } else {
      return callback(true);
    }
  });
};

AccountSchema.statics.findByUsername = function(name, callback) {
  var search = {
    username: name
  };

  return AccountModel.findOne(search, callback);
};

AccountSchema.statics.findByEmail = function(email, callback) {
  var search = {
    email: email
  };

  return AccountModel.findOne(search, callback);
};

AccountSchema.statics.generateHash = function(password, callback) {
  var salt = crypto.randomBytes(saltLength);
  console.log("generateHash = " + password);

  crypto.pbkdf2(password, salt, iterations, keyLength, function(err, hash) {
    return callback(salt, hash.toString('hex'));
  });
};

AccountSchema.statics.authenticate = function(user, password, callback) {
  return AccountModel.findByUsername(user, function(err, doc) {
    if (err || !doc) {
      return AccountModel.findByEmail(user, function(err, doc) {
        if (err) {
          return callback(err);
        } else if (!doc) {
          return callback();
        } else {
          doc.validatePassword(password, function(result) {
            if (result === true) {
              return callback(null, doc);
            } else {
              return callback();
            }
          });
        }
      });
    } else {
      doc.validatePassword(password, function(result) {
        if (result === true) {
          return callback(null, doc);
        } else {
          return callback();
        }
      });
    }
  });
};

AccountModel = mongoose.model('Account', AccountSchema);

module.exports.AccountModel = AccountModel;
module.exports.AccountSchema = AccountSchema;
