const db = require('../../services/db/db');

const IngredientTable = require("./tables/ingredient")(db);
const RecipeIngredientTable = require("./tables/recipe_ingredient")(db);
const RecipeTable = require("./tables/recipe")(db);

// RecipeTable.belongsToMany(IngredientTable, {
//     through: RecipeIngredientTable,
//     as: "ingredients",
//     foreignKey: "ingredient_id",
// });


const ingredientDao = {
    get: () =>
        new Promise((resolve, reject) => {
            IngredientTable.findAll()
                .then(results => resolve(results))
                .catch(err => reject(err));
        }),
    insert: ingredient =>
        new Promise((resolve, reject) => {
            IngredientTable.create({
                name: ingredient.name,
            })
                .then(() =>
                    resolve(201))
                .catch(err => reject(err));
        }),
    update: (id, newIngredient) =>
        new Promise((resolve, reject) => {
            IngredientTable.findByPk(id)
                .then(ingredient =>
                    ingredient
                        .update(newIngredient)
                        .then(() => resolve(200))
                        .catch(err => reject(err))

                )
                .catch(err => reject(err));
        }),
    delete: id =>
        new Promise((resolve, reject) => {
            IngredientTable.findByPk(id)
                .then(ingredient =>
                    ingredient
                        .destroy()
                        .then(() => resolve(204))
                        .catch(err => reject(err))

                )
                .catch(err => reject(err));
        })
};

module.exports = ingredientDao;
