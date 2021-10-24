const db = require('../../services/db/db');

const IngredientTable = require("./tables/ingredient")(db);
const RecipeIngredientTable = require("./tables/recipe_ingredient")(db);
const RecipeTable = require("./tables/recipe")(db);
const MealRecipeTable = require("./tables/meal_recipe")(db);
const MealTable = require("./tables/meal")(db);

MealTable.belongsToMany(RecipeTable, {through: MealRecipeTable});
RecipeTable.belongsToMany(IngredientTable, {through: RecipeIngredientTable});

const mealDao = {
    get: () =>
        new Promise((resolve, reject) => {
            MealTable.findAll({
                include: [{
                    model: RecipeTable,
                    as: "recipes",
                    required: true
                }]
            })
                .then(results => resolve(results))
                .catch(err => reject(err));
        }),
    insert: meal =>
        new Promise((resolve, reject) => {
            console.log(meal)
            MealTable.findOrCreate({
                where: {
                    title: meal.title,
                    date: meal.date
                }
            })
                .then(newMeal => {
                    newMeal = newMeal[0]
                    meal.recipes.forEach(recipe => {
                        RecipeTable.findOrCreate({
                            where: {
                                name: recipe.name
                            }
                        }).then(dbRecipe => {
                            newMeal.setRecipes([dbRecipe[0]])
                        })
                    })
                    resolve(201)
                })
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
