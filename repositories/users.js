const fs = require("fs");
const crypto = require("crypto");
const util = require("util");
const Repository = require("./repository");

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async comparePasswords(saved, supplied) {
    // Saved – password saved in the database: 'hashed.salt'
    // Supplied – password given by a user trying to sign in
    const [hashed, salt] = saved.split(".");
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);

    return hashed === hashedSuppliedBuf.toString("hex");
  }

  async create(attrs) {
    attrs.id = this.randomId();

    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buf.toString("hex")}.${salt}`,
    };
    records.push(record);

    await this.writeAll(records);

    return record;
  }

  async updatePassword(id, newPassword) {
    const salt = crypto.randomBytes(8).toString("hex");
    const buf = await scrypt(newPassword, salt, 64);
    const changes = await this.getOneBy({ id });
    changes.password = `${buf.toString("hex")}.${salt}`;
    try {
      await this.update(id, changes);
    } catch (err) {
      return res.send(err, "Could not find user");
    }
  }
}

module.exports = new UsersRepository("users.json");
