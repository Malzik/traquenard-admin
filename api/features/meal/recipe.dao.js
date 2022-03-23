const db = require('../../services/db/db');
const logger = require("../../services/logger/logger");

const IngredientTable = require("./tables/ingredient")(db);
const RecipeIngredientTable = require("./tables/recipe_ingredient")(db);
const RecipeTable = require("./tables/recipe")(db);

RecipeTable.belongsToMany(IngredientTable, {through: RecipeIngredientTable});
IngredientTable.belongsToMany(RecipeTable, {through: RecipeIngredientTable});

const recipeDao = {
    get: () =>
        new Promise((resolve, reject) => {
            RecipeTable.findAll({
                attributes: ['id', 'name', 'image'],
                include: {
                    model: IngredientTable,
                    through: { attributes: ['quantity', 'unit'] }
                }
            })
                .then(results => resolve(results))
                .catch(err => reject(err));
        }),
    insert: recipe =>
        new Promise((resolve, reject) => {
            RecipeTable.findOrCreate({
                where: {
                    name: recipe.name,
                }
            })
                .then(newRecipe => {
                    newRecipe = newRecipe[0]
                    newRecipe.update({name: recipe.name, image: recipe.image}).then(newRecipe => {
                        recipe.ingredients.forEach(ingredient => {
                            IngredientTable.findOrCreate({
                                where: {
                                    name: ingredient.name
                                }
                            }).then(dbIngredient => {
                                newRecipe.removeIngredients(dbIngredient[0])
                                newRecipe.setIngredients([dbIngredient[0]], {
                                    through: {
                                        quantity: ingredient.quantity,
                                        unit: ingredient.unit === "" ? null : ingredient.unit
                                    }
                                })
                            })
                        })
                        resolve({...recipe, id: newRecipe.id})
                    })
                })
                .catch(err => reject(err));
        }),
    update: (id, newRecipe) =>
        new Promise((resolve, reject) => {
            RecipeTable.findByPk(id)
                .then(recipe =>
                    recipe
                        .update(newRecipe)
                        .then((newRecipe) => resolve(newRecipe))
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
