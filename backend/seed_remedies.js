const mongoose = require("mongoose");

const data = [
    {
        ailment: "Common Cold & Cough",
        remedies: [
            {
                name: "Honey and Warm Tea",
                description: "Soothes irritated throat and loosens mucus.",
                ingredients: ["Honey", "Warm Water or Tea", "Lemon"],
                duration: "2-3 times a day"
            },
            {
                name: "Ginger Decoction (Kadha)",
                description: "Natural anti-inflammatory and boosts immunity.",
                ingredients: ["Ginger", "Black Pepper", "Tulsi Leaves", "Cloves"],
                duration: "Twice daily for 3 days"
            },
            {
                name: "Steam Inhalation",
                description: "Clears nasal congestion and relieves sinus pressure.",
                ingredients: ["Hot water", "Eucalyptus Oil (optional)"],
                duration: "10-15 mins before bed"
            }
        ],
        warning: "If symptoms persist beyond 7-10 days, or you develop a high fever, consult a doctor."
    },
    {
        ailment: "Sore Throat",
        remedies: [
            {
                name: "Salt Water Gargle",
                description: "Reduces throat swelling and washes away bacteria.",
                ingredients: ["Warm water", "Half teaspoon salt"],
                duration: "Every 4 hours"
            },
            {
                name: "Turmeric Milk (Haldi Doodh)",
                description: "Curcumin in turmeric has potent anti-microbial properties.",
                ingredients: ["Warm milk", "Turmeric powder", "Pinch of black pepper"],
                duration: "Once before sleeping"
            }
        ],
        warning: "If accompanied by difficulty breathing, swallowing, or high fever, seek immediate medical care."
    },
    {
        ailment: "Mild Stomach Upset / Indigestion",
        remedies: [
            {
                name: "Ginger Tea",
                description: "Helps calm the stomach and alleviate nausea.",
                ingredients: ["Fresh ginger slices", "Hot water"],
                duration: "Sip slowly when feeling nauseous"
            },
            {
                name: "Fennel Seeds (Saunf) Water",
                description: "Reduces bloating and aids digestion.",
                ingredients: ["Fennel seeds", "Warm water"],
                duration: "After heavy meals"
            },
            {
                 name: "BRAT Diet",
                 description: "Gentle foods that won't irritate the stomach.",
                 ingredients: ["Bananas", "Rice", "Applesauce", "Toast"],
                 duration: "For 24-48 hours during stomach upset"
            }
        ],
        warning: "If you experience severe pain, bloody stools, or cannot keep liquids down for 24 hours, see a doctor."
    },
    {
        ailment: "Mild Headache & Tension",
        remedies: [
            {
                 name: "Peppermint Oil Massage",
                 description: "Provides a cooling sensation and relaxes tense muscles.",
                 ingredients: ["Peppermint essential oil", "Carrier oil (coconut/almond)"],
                 duration: "Massage on temples as needed"
            },
            {
                 name: "Adequate Hydration",
                 description: "Dehydration is a leading cause of tension headaches.",
                 ingredients: ["Water", "Electrolytes (optional)"],
                 duration: "Drink 8-10 glasses daily"
            }
        ],
        warning: "If headache is sudden, incredibly severe, or accompanied by vision loss or numbness, seek emergency care."
    },
    {
         ailment: "Minor Skin Irritation / Bug Bites",
         remedies: [
             {
                 name: "Aloe Vera Gel",
                 description: "Soothes inflammation and provides a cooling effect.",
                 ingredients: ["Fresh Aloe Vera gel"],
                 duration: "Apply gently 2-3 times a day"
             },
             {
                 name: "Cold Compress",
                 description: "Reduces local swelling and numbs the itch.",
                 ingredients: ["Ice wrapped in cloth", "Cold water pack"],
                 duration: "10 minutes on the affected area"
             }
         ],
         warning: "If the area becomes hot, rapidly spreads redness, or oozes pus, it may be infected."
    }
];

mongoose.connect("mongodb://127.0.0.1:27017/antibioticsDB").then(async () => {
    console.log("Connected to MongoDB");
    const db = mongoose.connection.db;
    
    // Clear existing to avoid duplicates in this demo
    await db.collection("remedies").deleteMany({});
    
    await db.collection("remedies").insertMany(data);
    console.log("Inserted new remedies data.");
    mongoose.disconnect();
}).catch(console.error);
