const db = require('../../services/db/db');
const {Sequelize} = require("sequelize");

const IngredientTable = require("./tables/ingredient")(db);
const RecipeIngredientTable = require("./tables/recipe_ingredient")(db);
const RecipeTable = require("./tables/recipe")(db);
const MealTable = require("./tables/meal")(db);

MealTable.belongsTo(RecipeTable, { as: "recipe"});
RecipeTable.belongsToMany(IngredientTable, {through: RecipeIngredientTable});

const mealDao = {
    get: () =>
        new Promise((resolve, reject) => {
            MealTable.findAll({
                raw: true,
                attributes: ['id', 'date', 'order', 'quantity',
                    [Sequelize.col('recipe.id'), 'recipe_id'], Sequelize.col('recipe.name'), Sequelize.col('recipe.image')],
                include: [{
                    model: RecipeTable,
                    as: 'recipe',
                    attributes: []
                }],
                order: [['order', 'ASC']]
            })
                .then(results => resolve(results))
                .catch(err => reject(err));
        }),
    insert: meal =>
        new Promise((resolve, reject) => {
            MealTable.findOne({
                where: {
                    recipeId: meal.recipe_id,
                    date: meal.date
                },
            }).then(obj => {
                if(obj)
                    return obj.update({...meal, quantity: obj.quantity + 1});
                return MealTable.create({...meal, quantity: 1});
            }).then(meal => resolve({...meal}))
                .catch(err => reject(err));
        }),
    update: (id, newRecipes) =>
        new Promise((resolve, reject) => {
            MealTable.findByPk(id)
                .then(meal =>
                    meal
                        .update(newRecipes)
                        .then(() => resolve(200))
                        .catch(err => reject(err))

                )
                .catch(err => reject(err));
        }),
    delete: id =>
        new Promise((resolve, reject) => {
            MealTable.findByPk(id)
                .then(meal =>
                    meal
                        .destroy()
                        .then(() => resolve(204))
                        .catch(err => reject(err))

                )
                .catch(err => reject(err));
        })
};

module.exports = mealDao;
