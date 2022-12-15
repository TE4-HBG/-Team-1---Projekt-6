import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    favoriteLaureates: [Number],
    favoritePrizes: [Number],
});

const User = mongoose.model("User", userSchema);

const laureateSchema = new mongoose.Schema({
    isOrganization: Boolean,
    filename: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    nobelPrizes: [Number],
    wikipedia: String,
    wikiData: {
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

const Laureate = mongoose.model("Laureate", userSchema);

const nobelPrizeSchema = new mongoose.Schema({
    isOrganization: Boolean,
    filename: {
        type: mongoose.Schema.Types.Mixed,
        default: null,
    },
    nobelPrizes: [Number],
    wikipedia: String,
    wikiData: {
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

const NobelPrize = mongoose.model("NobelPrize", userSchema);


// Connect to the database
mongoose.connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "NobelPrizes",
});

// Export the User model and the connection to the database
export default {
    schemas: {
        User: { name: "User", model: User, },
        Laureate: { name: "Laureate", model: Laureate },
        NobelPrize: {name: "NobelPrize", model: NobelPrize },
    },
    connection: mongoose.connection,
};