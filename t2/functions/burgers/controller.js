const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault()
  });

const db = admin.firestore();


const getAllBurgers = async (req, res, next) => {
    try {
        const noteSnapshot = await db.collection('burgers').get();
        const notes = [];
        noteSnapshot.forEach((doc) => {
            notes.push(
                doc.data()
            );
        });
        res.status(200).send(notes);
    } 
    catch(e) {
        res.status(500).send('hubo un error');
    }
}

const getBurger = async (req, res, next) => {
    try {
        const data = await db.collection('burgers').doc(`${req.params.id}`).get()
        if (data.data()) {
            res.status(200).send(data.data());
            console.log("200")

          } 
        else {
            console.log("404 else")
            res.status(404).send({
              message: "hamburguesa inexistente" 
            });
          }
    }
    catch(e) {
        res.status(500).send('hubo un error');
    }
}

const getAllIngredients = async (req, res, next) => {
    try {
        const noteSnapshot = await db.collection('ingredients').get();
        const notes = [];
        noteSnapshot.forEach((doc) => {
            notes.push(
                doc.data()
            );
        });
        res.status(200).send(notes);
    } 
    catch(e) {
        res.status(500).send('hubo un error');
    }
}

const getIngredient = async (req, res, next) => {
    try{
        console.log(req.params.id);
        const data = await db.collection('ingredients').doc(`${req.params.id}`).get();
        console.log(data.data());
        res.status(200).send(data.data());
    }
    catch(e){
        res.status(500).send('hubo un error');
    }
}


const createBurger = async (req, res, next) => {
    try{
        console.log(req.body);
        const nombre = req.body.nombre;
        const descripcion = req.body.descripcion;
        const imagen = req.body.imagen;
        const precio = req.body.precio;
        const ingredientes = [];
        const length = await db.collection('burgers').get().then(snap => snap.size);
        const id = length + 2;
        console.log(id);
        const data = { id, nombre, descripcion, imagen, precio, ingredientes };
        console.log(length);
        await db.collection('burgers').doc(`${id}`).set(data)
            .then(res.status(201).send(data)
            )
            .catch(res.status(400).send("input invalido")
            )
    }
    catch(e){
        res.status(400).send('input invalido');
    }
}

const createIngredient = async (req, res, next) => {
    try{
    const nombre = req.body.nombre;
    const descripcion = req.body.descripcion;
    const length = await db.collection('ingredients').get().then(snap => snap.size);
    const id = length + 1;
    const data = { id, nombre, descripcion};
    await db.collection('ingredients').doc(`${id}`).set(data)
        .then(res.status(201).send(data)
        )
        .catch(res.status(400).send("input invalido")
        )
    }
    catch(e){
        res.status(400).send('input invalido');
    }
}

const deleteBurger = async (req, res, next) => {
        const id = req.params.id;
        try{
            const doc = await db.collection('burgers').doc(`${id}`)
            if (doc){
                doc.delete();
                res.status(200).send({
                    message: "Hamburguesa retirada"
                    });
            }
            else{
                res.status(404).send({
                    message: "Hamburguesa inexistente"
                    });
            }
        }
        catch(e){
            res.status(404).send({
                message: "Hamburguesa inexistente"
                });
        }
    }

const deleteIngredient = async (req, res, next) => {
    const id = req.params.id;
    if (!id) throw new Error('id is blank');
    await db.collection('ingredients').doc(`${id}`).delete();
    res.json({
        id
    });
}

const deleteIngredientInBurger = async (req, res, next) => {
    try{
        const burger_id = req.params.id;
        const ingredient_id = req.params.id2;
        const burger = await db.collection('burgers').doc(`${burger_id}`).get();
        const old_ingredientes = burger.data().ingredientes;
        const id = burger.data().id;
        const nombre = burger.data().nombre;
        const descripcion = burger.data().descripcion;
        const imagen = burger.data().imagen;
        const precio = burger.data().precio;

        console.log(old_ingredientes.length);
        console.log(old_ingredientes);
        console.log(old_ingredientes[0].id);
        console.log(old_ingredientes[1].id);
        console.log(ingredient_id);

        let ingredientes = [];
        for (i = 0; i < old_ingredientes.length; i++) {
            
            if (old_ingredientes[i].id !== int(ingredient_id)){
                ingredientes.push(old_ingredientes[i]);
            }
        }
        console.log(ingredientes);
        const data = { id, nombre, descripcion, imagen, precio, ingredientes };
        await db.collection('burgers').doc(`${burger_id}`).update(data)
            .then(
                res.status(200).send("OK")
                )
            .catch(
                res.status(400).send({
                    message: "ERROR"
                    })
            )
    }
    catch(e){
        res.status(400).send({
            message: "ERROR"
            });
    }
}

const addIngredientInBurger = async (req, res, next) => {
    try{
        const burger_id = req.params.id;
        const ingredient_id = req.params.id2;
        const ing = await db.collection('ingredients').doc(`${ingredient_id}`).get();
        const ing_list = await db.collection('burgers').doc(`${burger_id}`).get();
        const ingredientes = ing_list.data().ingredientes;
        const id = ing_list.data().id;
        const nombre = ing_list.data().nombre;
        const descripcion = ing_list.data().descripcion;
        const imagen = ing_list.data().imagen;
        const precio = ing_list.data().precio;

        console.log(ingredientes);
        ingredientes.push(
            ing.data()
        );
        console.log(ingredientes);
        const data = { id, nombre, descripcion, imagen, precio, ingredientes };
        await db.collection('burgers').doc(`${burger_id}`).update(data)
            .then(
                res.status(201).send("OK")
                )
            .catch(
                res.status(400).send({
                    message: "ERROR"
                    })
            )
    }
    catch(e){
        res.status(400).send({
            message: "ERROR"
            });
    }
}

const updateIngredient = async (req, res, next) => {
    console.log(req.body);
    const name = req.body.name;
    const description = req.body.description;
    const id = req.params.id;
    console.log("1,2,3,4", name);
    if (!name) throw new Error('Text is blank');
    const data = { name, description};
    const ref = await db.collection('ingredients').doc(`${id}`).update(data);
    res.json({
        id: ref.id,
        data
    });
}

const updateBurger = async (req, res, next) => {
    console.log(req.body);
    const name = req.body.name;
    const description = req.body.description;
    const image = req.body.image;
    const price = req.body.price;
    const ingredients = req.body.ingredients;
    const id = req.params.id;
    if (!name) throw new Error('Text is blank');
    const data = { name, description, image, price, ingredients };
    try {
        await db.collection('burgers').doc(`${id}`).update(data)
        res.status(200).send("Hamburguesa actualizada")
    }
    catch(e){
        res.status(404).send("No se encuentra la hamburguesa")
    }
}





module.exports = {
    getAllBurgers,
    getBurger,
    getAllIngredients,
    getIngredient,
    createBurger,
    createIngredient,
    deleteBurger,
    deleteIngredient,
    deleteIngredientInBurger ,
    updateIngredient,
    updateBurger,
    addIngredientInBurger
}