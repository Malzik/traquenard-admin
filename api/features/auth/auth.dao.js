const userDao = require("./user.dao");
const config = require("../../config/auth.config");
const User = userDao.UserTable;
const Role = userDao.RoleTable;

const Op = userDao.Sequelize.Op;
const tokenList = {}

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const ClientError = require("../../services/replyServerError/ClientError");

const createToken = (user, roles, secret) => {
    return jwt.sign({
            id: user.id,
            username: user.username,
            email: user.email,
            roles: roles
        },
        secret,
        {
            expiresIn: 86400 // 24 hours
        });
}

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
                        return reject(new ClientError({message: "User Not found."}, 404));
                    }

                    const passwordIsValid = bcrypt.compareSync(
                        req.body.password,
                        user.password
                    );

                    if (!passwordIsValid) {
                        return reject(new ClientError({
                            accessToken: null,
                            message: "Mot de passe invalide !"
                        }, 401));
                    }
                    const authorities = [];
                    user.getRoles().then(roles => {
                        for (let i = 0; i < roles.length; i++) {
                            authorities.push("ROLE_" + roles[i].name.toUpperCase());
                        }
                        const token = createToken(user, authorities, config.secret)
                        const refreshToken = createToken(user, authorities, config.refreshTokenSecret)
                        tokenList[refreshToken] = {token, refreshToken}

                        resolve(res.status(200).send({
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            roles: authorities,
                            accessToken: token,
                            refreshToken: token
                        }));
                    });
                })
                .catch(err => reject(err));
        }),
    refresh: (req, res) =>
        new Promise((resolve, reject) => {
            const postData = req.body

            if ((postData.refreshToken) && (postData.refreshToken in tokenList)) {
                const oldToken = jwt.decode(tokenList[postData.refreshToken])
                const token = createToken(oldToken.payload, oldToken.payload.roles, config.secret)
                const refreshToken = createToken(oldToken.payload, oldToken.payload.roles, config.refreshTokenSecret)

                tokenList[refreshToken] = {token, refreshToken}
                resolve(res.status(200).send({
                    accessToken: token,
                    refreshToken: token
                }));
            } else {
                reject(res.status(404).send('Invalid request'))
            }
        })
};

module.exports = authDao;
