const router = require("express").Router();
const controller = require("./controller");

router.get("/hamburguesa", controller.getAllBurgers);
router.get("/hamburguesa/:id", controller.getBurger);
router.get('/ingrediente', controller.getAllIngredients);
router.get('/ingrediente/:id', controller.getIngredient);
router.post('/hamburguesa', controller.createBurger);
router.post('/ingrediente', controller.createIngredient);
router.delete('/hamburguesa/:id', controller.deleteBurger);
router.delete('/ingrediente/:id', controller.deleteIngredient);
router.delete('/hamburguesa/:id/ingrediente/:id2', controller.deleteIngredientInBurger);
router.post('/hamburguesa/:id/ingrediente/:id2', controller.addIngredientInBurger);
router.patch('/ingrediente/:id', controller.updateIngredient);
router.patch('/hamburguesa/:id', controller.updateBurger);




module.exports = router;
 