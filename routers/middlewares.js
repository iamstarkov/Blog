const usersRepo = require("../repositories/users");
const { validationResult } = require("express-validator");

module.exports = {
  requireAuth(req, res, next) {
    if (!req.session.userId) {
      return res.redirect("/signin");
    }
    next();
  },

  async requireAdmin(req, res, next) {
    const id = req.session.userId;
    const user = await usersRepo.getOneBy({ id });
    if (!user.admin) {
      return res.redirect("/signin");
    }
    next();
  },

  handleErrors(templateFunc, dataCb) {
    return async (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        let data = {};
        if (dataCb) {
          data = await dataCb(req);
        }

        return res.send(templateFunc({ errors, ...data }));
      }
      next();
    };
  },
};
