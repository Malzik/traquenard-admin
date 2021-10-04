import * as ingredient from "./tables/ingredient";
import * as recipeIngredient from "./tables/recipe_ingredient";
import * as recipe from "./tables/recipe";
import * as mealRecipe from "./tables/meal_recipe";
import * as meal from "./tables/meal";

const Sequelize = require('sequelize');
const { Op } = require("sequelize");

const db = require('../../services/db/db');

const IngredientTable = ingredient.getTable()
const RecipeIngredientTable = recipeIngredient.getTable()
const RecipeTable = recipe.getTable()
const MealRecipeTable = mealRecipe.getTable()
const MealTable = meal.getTable()

RecipeIngredientTable.belongsTo(RecipeTable, {
    foreignKey: 'recipe_id',
    as: "recipe"
})
RecipeIngredientTable.belongsTo(IngredientTable, {
    foreignKey: 'ingredient_id',
    as: "ingredient"
})

MealRecipeTable.belongsTo(MealTable, {
    foreignKey: 'meal_id',
    as: "meal"
})
MealRecipeTable.belongsTo(RecipeTable, {
    foreignKey: 'recipe_id',
    as: "recipe"
})

const mealDao = {
    get: () =>
        new Promise((resolve, reject) => {
            MealTable.findAll({
                include: [{
                    model: RecipeTable,
                    as: "recipe",
                    attributes: ['name'],
                }]
            })
                .then(results => resolve(results))
                .catch(err => reject(err));
        }),
    insert: meal =>
        new Promise((resolve, reject) => {
            MealTable.create({
                title: meal.title,
                date: meal.date
            })
                .then(() => resolve(201))
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
