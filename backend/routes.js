var express = require('express');
var hobbieModel = require('./models/hobbie.model');

var router = express.Router();
var price_sort = -1

// 1. List and Filter
router.get('/plants', async (req, res) => {
    try {
        const filters = {};
        if (req.query.name) {
            filters.plant_name = req.query.name;
        }
        if (req.query.difficulty) {
            filters.difficulty_level = req.query.difficulty;
        }
        if (req.query.type) {
            filters.plant_type = req.query.type;
        }
        if (req.query.soil_type) {
            filters.soil_type = req.query.soil_type;
        }
        if (req.query.price) {
            filters.price = req.query.price;
        }
        const plants = await hobbieModel.find(filters);
        res.json(plants);
    } catch (err) {
        res.status(500).json({ message: error.message });
    }
});

// 2. Add plant
router.post('/plants', async (req, res) => {
    const hobby = new hobbieModel({
        plant_name: req.body.name,
        description: req.body.description,
        image_url: req.body.url,
        plant_type: req.body.type,
        growing_season: req.body.season,
        sun_exposure: req.body.exposure,
        soil_type: req.body.soil,
        watering_needs: req.body.watering,
        difficulty_level: req.body.difficulty,
        price: req.body.price,
    })

    try {
        const data = await hobby.save();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// 3. Delete plant
router.delete('/plants/:plant_name', async (req, res) => {
    try {
        var hobby = await hobbieModel.find({ "plant_name": req.params.plant_name })
        hobby = await hobbieModel.findByIdAndDelete(hobby[0]._id)
        res.json({ "message": `Plant "${req.params.plant_name}" deleted` })
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// 4. Update plant
router.patch('/plants/:plant_name', async (req, res) => {
    var new_hobby = new hobbieModel({
        plant_name: req.body.name,
        description: req.body.description,
        image_url: req.body.url,
        plant_type: req.body.type,
        growing_season: req.body.season,
        sun_exposure: req.body.exposure,
        soil_type: req.body.soil,
        watering_needs: req.body.watering,
        difficulty_level: req.body.difficulty,
        price: req.body.price,
    })
    try {
        var hobby = await hobbieModel.find({ "plant_name": req.params.plant_name })
        hobby = await hobbieModel.findByIdAndDelete(hobby[0]._id)
        const data = await new_hobby.save();
        res.status(200).json(data)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// 5. Sort
router.get("/sortByPrice", async (req, res) => {
    try {
        const plants = await hobbieModel.find().sort({ price: price_sort });
        price_sort = price_sort == 0 ? -1 : 0
        res.json(plants)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;