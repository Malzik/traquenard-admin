const userDao = require("./user.dao");
const config = require("../../config/auth.config");
const User = userDao.UserTable;
const Role = userDao.RoleTable;

const Op = userDao.Sequelize.Op;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const authDao = {
    signup: (req, res) =>
        new Promise((resolve, reject) => {
            User.create({
                username: req.body.username,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8)
            }).then(user => {
                if (req.body.roles) {
                    Role.findAll({
                        where: {
                            name: {
                                [Op.or]: req.body.roles
                            }
                        }
                    }).then(roles => {
                        user.setRoles(roles).then(() => {
                            resolve(res.send({ message: "User was registered successfully!" }));
                        });
                    });
                } else {
                    user.setRoles([1]).then(() => {
                        return resolve(res.send({ message: "User was registered successfully!" }));
                    });
                }
            })
                .catch(err => reject(err));
        }),
    signin: (req, res) =>
        new Promise((resolve, reject) => {
            User.findOne({
                where: {
                    username: req.body.username
                }
            })
                .then(user => {
                    if (!user) {
                        return reject(res.status(404).send({ message: "User Not found." }));
                    }

                    const passwordIsValid = bcrypt.compareSync(
                        req.body.password,
                        user.password
                    );

                    if (!passwordIsValid) {
                        return res.status(401).send({
                            accessToken: null,
                            message: "Invalid Password!"
                        });
                    }
                    const authorities = [];
                    user.getRoles().then(roles => {
                        for (let i = 0; i < roles.length; i++) {
                            authorities.push("ROLE_" + roles[i].name.toUpperCase());
                        }
                        const token = jwt.sign({
                                id: user.id,
                                username: user.username,
                                email: user.email,
                                roles: authorities
                            },
                            config.secret,
                            {
                                expiresIn: 86400 // 24 hours
                            });

                        resolve(res.status(200).send({
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            roles: authorities,
                            accessToken: token
                        }));
                    });
                })
                .catch(err => reject(err));
        })
};

module.exports = authDao;