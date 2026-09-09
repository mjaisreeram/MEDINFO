const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/antibioticsDB";

// Schemas & Models
const AntibioticSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String, required: true },
  usage: { type: String, required: true },
  resistance_level: { type: String, default: "Medium" },
  resistance_detail: { type: String, default: "" },
  warning: { type: String, default: "" },
  alternatives: { type: String, default: "" }
}, { timestamps: true });

const RemedySchema = new mongoose.Schema({
  ailment: { type: String, required: true },
  remedies: { type: Array, default: [] },
  warning: { type: String, default: "" }
}, { timestamps: true, strict: false });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" }
}, { timestamps: true });

const Antibiotic = mongoose.models.Antibiotic || mongoose.model("Antibiotic", AntibioticSchema);
const Remedy = mongoose.models.Remedy || mongoose.model("Remedy", RemedySchema);
const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Initial Data Seeders
const initialAntibiotics = [
  {
    name: "Amoxicillin",
    class: "Penicillin Antibiotic",
    usage: "Ear, nose, throat, chest, and lower respiratory bacterial infections.",
    resistance_level: "High",
    resistance_detail: "Widespread resistance in Streptococcus pneumoniae and E. coli due to self-medication.",
    warning: "Requires valid prescription. Always complete the full course even if feeling better.",
    alternatives: "Rest, fluids, or natural home remedies for viral colds."
  },
  {
    name: "Azithromycin",
    class: "Macrolide Antibiotic",
    usage: "Strep throat, bronchitis, sinus infections, and pneumonia.",
    resistance_level: "Critical",
    resistance_detail: "Extremely high resistance rates reported in outpatient clinics across South Asia.",
    warning: "Do NOT use for viral colds, flu, or simple runny nose. Ineffective against viral infection.",
    alternatives: "Warm saltwater gargles, honey ginger tea for sore throat."
  },
  {
    name: "Ciprofloxacin",
    class: "Fluoroquinolone Antibiotic",
    usage: "Severe urinary tract infections (UTI), typhoid fever, and infectious diarrhea.",
    resistance_level: "High",
    resistance_detail: "Significant resistance reported in Salmonella and E. coli strains in clinical labs.",
    warning: "Strict prescription medicine. Reserve for severe bacterial infections verified by lab test.",
    alternatives: "Cranberry extract and high water intake for mild urinary discomfort."
  },
  {
    name: "Augmentin (Amoxicillin + Clavulanate)",
    class: "Combination Penicillin Antibiotic",
    usage: "Resistant sinus infections, severe bronchitis, wound infections, and UTI.",
    resistance_level: "Rising",
    resistance_detail: "Beta-lactamase inhibitor protects amoxicillin, but rising resistance in staph and hospital strains.",
    warning: "Can cause mild stomach upset. Take with meals as directed by your physician.",
    alternatives: "Physician guidance required for broad spectrum antibiotics."
  },
  {
    name: "Doxycycline",
    class: "Tetracycline Antibiotic",
    usage: "Acne, respiratory tract infections, cholera, and vector-borne infections (Lyme/Typhus).",
    resistance_level: "Medium",
    resistance_detail: "Moderate resistance observed; highly effective when taken according to medical instructions.",
    warning: "Do not take with milk or antacids as calcium inhibits drug absorption.",
    alternatives: "Consult doctor for precise dosage."
  },
  {
    name: "Metronidazole",
    class: "Nitroimidazole Antimicrobial",
    usage: "Amebiasis, giardiasis, dental abscesses, and anaerobic bacterial infections.",
    resistance_level: "Medium",
    resistance_detail: "Low resistance in gut protozoa, but overuse in simple diarrhea increases risk.",
    warning: "Strictly avoid alcohol while taking metronidazole to prevent severe nausea.",
    alternatives: "ORS fluids and probiotics for simple non-bacterial diarrhea."
  },
  {
    name: "Ceftriaxone",
    class: "3rd Gen Cephalosporin Injectable",
    usage: "Hospitalized severe bacterial sepsis, meningitis, and severe pneumonia.",
    resistance_level: "Critical",
    resistance_detail: "High rates of ESBL (Extended-Spectrum Beta-Lactamase) producing bacterial resistance.",
    warning: "Hospital administration drug only under expert supervision.",
    alternatives: "Targeted hospital antibiotic therapy."
  },
  {
    name: "Paracetamol (Acetaminophen)",
    class: "Analgesic & Antipyretic (Non-Antibiotic)",
    usage: "Relieving fever, mild headaches, muscle aches, and general cold pains.",
    resistance_level: "Safe",
    resistance_detail: "Not an antibiotic. Bacteria do not develop resistance to paracetamol.",
    warning: "Do not exceed 4,000 mg (4 grams) per day to prevent liver strain.",
    alternatives: "Adequate hydration and cold compress."
  }
];

const initialRemedies = [
  {
    ailment: "Common Cold & Cough",
    remedies: [
      {
        name: "Honey and Warm Ginger Tea",
        description: "Soothes throat irritation and helps relieve upper respiratory coughing.",
        ingredients: ["Ginger", "Honey", "Warm Water"],
        duration: "2-3 times daily"
      },
      {
        name: "Steam Inhalation",
        description: "Clears nasal congestion and relaxes airways.",
        ingredients: ["Hot Water", "Eucalyptus Oil (optional)"],
        duration: "10 mins daily"
      }
    ],
    warning: "Seek medical attention if fever persists beyond 3 days."
  },
  {
    ailment: "Sore Throat",
    remedies: [
      {
        name: "Warm Saltwater Gargle",
        description: "Reduces inflammation and cleanses throat pathogens naturally.",
        ingredients: ["Warm Water", "1/2 tsp Salt"],
        duration: "Every 4 hours"
      },
      {
        name: "Turmeric Milk (Haldi Doodh)",
        description: "Curcumin in turmeric has potent anti-microbial properties.",
        ingredients: ["Warm milk", "Turmeric powder", "Pinch of black pepper"],
        duration: "Once before sleeping"
      }
    ],
    warning: "If throat swelling hinders breathing or swallowing, visit urgent care immediately."
  },
  {
    ailment: "Mild Indigestion & Nausea",
    remedies: [
      {
        name: "Peppermint or Chamomile Infusion",
        description: "Relaxes gastrointestinal muscles and calms uneasy stomach.",
        ingredients: ["Chamomile Tea", "Mint Leaves"],
        duration: "After meals"
      }
    ],
    warning: "Do not use for severe persistent abdominal pain."
  }
];

const seedDatabase = async () => {
  try {
    const antCount = await Antibiotic.countDocuments();
    if (antCount === 0) {
      await Antibiotic.insertMany(initialAntibiotics);
      console.log("Seeded initial Antibiotics collection.");
    }

    const remCount = await Remedy.countDocuments();
    if (remCount === 0) {
      await Remedy.insertMany(initialRemedies);
      console.log("Seeded initial Remedies collection.");
    }

    const adminUser = await User.findOne({ email: "admin@example.com" });
    if (!adminUser) {
      await User.create({
        name: "System Admin",
        email: "admin@example.com",
        password: "admin123",
        role: "admin"
      });
      console.log("Seeded default Admin user (admin@example.com).");
    }
  } catch (err) {
    console.error("Database seeding error:", err);
  }
};

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected Successfully");
    await seedDatabase();
  })
  .catch(err => console.error("MongoDB Connection Error:", err));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// Antibiotics Routes
app.get("/antibiotics", async (req, res) => {
  try {
    const data = await Antibiotic.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/antibiotics/:id", async (req, res) => {
  try {
    const item = await Antibiotic.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Antibiotic not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/antibiotics", async (req, res) => {
  try {
    const newItem = new Antibiotic(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/antibiotics/:id", async (req, res) => {
  try {
    const updatedItem = await Antibiotic.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) return res.status(404).json({ error: "Antibiotic not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/antibiotics/:id", async (req, res) => {
  try {
    const deletedItem = await Antibiotic.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Antibiotic not found" });
    res.json({ message: "Antibiotic deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remedies Routes
app.get("/remedies", async (req, res) => {
  try {
    const data = await Remedy.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/remedies/:id", async (req, res) => {
  try {
    const item = await Remedy.findById(req.params.id);
    if (!item) return res.status(404).json({ error: "Remedy not found" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/remedies", async (req, res) => {
  try {
    const newItem = new Remedy(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/remedies/:id", async (req, res) => {
  try {
    const updatedItem = await Remedy.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedItem) return res.status(404).json({ error: "Remedy not found" });
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/remedies/:id", async (req, res) => {
  try {
    const deletedItem = await Remedy.findByIdAndDelete(req.params.id);
    if (!deletedItem) return res.status(404).json({ error: "Remedy not found" });
    res.json({ message: "Remedy deleted successfully", id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// User Authentication Routes
app.post("/auth/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ error: "Name, email, and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists with this email" });
    }

    const userRole = role || (email.toLowerCase().includes("admin") ? "admin" : "user");
    const user = await User.create({
      name,
      email,
      password,
      role: userRole
    });

    const userResp = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.status(201).json(userResp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    let user = await User.findOne({ email });
    
    // Fallback: If demo user logs in without prior db record, auto-create for seamless UX
    if (!user) {
      const userRole = email.toLowerCase().includes("admin") ? "admin" : "user";
      user = await User.create({
        name: email.split("@")[0],
        email,
        password,
        role: userRole
      });
    } else if (user.password !== password) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const userResp = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    res.json(userResp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/auth/me", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: "Email query parameter required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Platform Statistics Route
app.get("/stats", async (req, res) => {
  try {
    const [antibioticCount, remedyCount, userCount] = await Promise.all([
      Antibiotic.countDocuments(),
      Remedy.countDocuments(),
      User.countDocuments()
    ]);

    res.json({
      totalAntibiotics: antibioticCount,
      totalRemedies: remedyCount,
      activeUsers: userCount,
      timestamp: new Date()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});