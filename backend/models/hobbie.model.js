var mongoose = require('mongoose');

var gardeningSchema = mongoose.Schema(
    {
        plant_name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: false,
            trim: true
        },
        image_url: {
            type: String,
            required: false,
            trim: true
        },
        plant_type: {
            type: String,
            required: true,
            trim: true
        },
        growing_season: {
            type: String,
            required: true,
            trim: true
        },
        sun_exposure: {
            type: String,
            required: true,
            trim: true
        },
        soil_type: {
            type: String,
            required: true,
            trim: true
        },
        watering_needs: {
            type: String,
            required: true,
            trim: true
        },
        difficulty_level: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true
        }
    },
    {
        versionKey: false
    })

module.exports = mongoose.model('Hobbie', gardeningSchema, 'gardening');