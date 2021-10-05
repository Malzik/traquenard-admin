const db = require('../../services/db/db');

const IngredientTable = require("./tables/ingredient")(db);
const RecipeIngredientTable = require("./tables/recipe_ingredient")(db);
const RecipeTable = require("./tables/recipe")(db);

RecipeTable.belongsToMany(IngredientTable, {through: RecipeIngredientTable});

const recipeDao = {
    get: () =>
        new Promise((resolve, reject) => {
            RecipeTable.findAll({
                include: IngredientTable
            })
                .then(results => resolve(results))
                .catch(err => reject(err));
        }),
    insert: recipe =>
        new Promise((resolve, reject) => {
            RecipeTable.create({
                name: recipe.name,
            })
                .then(newRecipe => {
                    recipe.ingredients.forEach(async ingredient => {
                        const [dbIngredient, ] = await IngredientTable
                            .findOrCreate({
                                where: {
                                    name: ingredient.name
                                }
                            })
                        RecipeIngredientTable.create({
                            ingredient_id: dbIngredient.id,
                            recipe_id: newRecipe.id,
                            quantity: ingredient.quantity,
                            unit: ingredient.unit
                        })
                    }, resolve(201))
                })
                .catch(err => reject(err));
        }),
    update: (id, newRecipe) =>
        new Promise((resolve, reject) => {
            RecipeTable.findByPk(id)
                .then(recipe =>
                    recipe
                        .update(newRecipe)
                        .then(() => resolve(200))
                        .catch(err => reject(err))

                )
                .catch(err => reject(err));
        }),
    delete: id =>
        new Promise((resolve, reject) => {
            RecipeTable.findByPk(id)
                .then(recipe =>
                    recipe
                        .destroy()
                        .then(() => resolve(204))
                        .catch(err => reject(err))

                )
                .catch(err => reject(err));
        })
};

module.exports = recipeDao;
