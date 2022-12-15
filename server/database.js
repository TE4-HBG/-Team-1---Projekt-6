import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    favoriteLaureates: {
        type: [Number],
        default: [],
    },
    favoritePrizes: {
        type: [Number],
        default: [],
    },
});

const User = mongoose.model("User", userSchema);

const laureateSchema = new mongoose.Schema({
    _id: Number,
    filename: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },

    nobelPrizes: [Number],
    wikipedia: String,
    wikipediaID: String,
    wikiData: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    wikiDataID: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    orgName: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    knownName: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    fullName: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
});

const Laureate = mongoose.model("Laureate", laureateSchema);

const prizeSchema = new mongoose.Schema({
    _id: Number,
    awardYear: Number,
    category: String,
    categoryFull: String,
    laureates: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    prizeAmount: Number,
    prizeAmountAdjusted: Number,

});

const Prize = mongoose.model("Prize", prizeSchema);


function Connect() {
    // Connect to the database
    mongoose.connect(process.env.ATLAS_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "NobelPrizes",
    }, (err) => {console.error(err)});
}

// Export the User model and the connection to the database
export default {
    models: {
        User,
        Laureate,
        Prize,
    },
    connection: mongoose.connection,
    Connect, 
};