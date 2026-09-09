const mongoose = require("mongoose");

const data = [
{
"name": "Ceftriaxone",
"class": "Cephalosporin",
"usage": "Severe bacterial infections, Pneumonia, Meningitis",
"resistance_level": "Medium",
"resistance_detail": "Increasing resistance seen in hospital-acquired infections",
"warning": "Use with caution in newborns",
"alternatives": "Cefotaxime"
},
{
"name": "Cefixime",
"class": "Cephalosporin",
"usage": "Typhoid fever, Urinary tract infections",
"resistance_level": "High",
"resistance_detail": "Resistance observed in Salmonella typhi",
"warning": "Overuse can reduce effectiveness",
"alternatives": "Azithromycin"
},
{
"name": "Doxycycline",
"class": "Tetracycline",
"usage": "Acne, Respiratory infections, Malaria prevention",
"resistance_level": "Medium",
"resistance_detail": "Some resistance in respiratory pathogens",
"warning": "Avoid in pregnancy and children under 8",
"alternatives": "Azithromycin"
},
{
"name": "Clindamycin",
"class": "Lincosamide",
"usage": "Skin infections, Dental infections",
"resistance_level": "Medium",
"resistance_detail": "Resistance increasing in MRSA strains",
"warning": "May cause severe diarrhea",
"alternatives": "Vancomycin"
},
{
"name": "Vancomycin",
"class": "Glycopeptide",
"usage": "Serious Gram-positive infections, MRSA",
"resistance_level": "Low",
"resistance_detail": "Vancomycin-resistant enterococci emerging",
"warning": "Requires monitoring of kidney function",
"alternatives": "Linezolid"
},
{
"name": "Linezolid",
"class": "Oxazolidinone",
"usage": "MRSA infections, Pneumonia",
"resistance_level": "Low",
"resistance_detail": "Rare resistance cases reported",
"warning": "Long use may affect blood cells",
"alternatives": "Vancomycin"
},
{
"name": "Metronidazole",
"class": "Nitroimidazole",
"usage": "Anaerobic infections, Amoebiasis",
"resistance_level": "Low",
"resistance_detail": "Resistance uncommon but possible",
"warning": "Avoid alcohol during treatment",
"alternatives": "Tinidazole"
},
{
"name": "Tinidazole",
"class": "Nitroimidazole",
"usage": "Protozoal infections, Amoebiasis",
"resistance_level": "Low",
"resistance_detail": "Limited resistance reported",
"warning": "May cause nausea",
"alternatives": "Metronidazole"
},
{
"name": "Gentamicin",
"class": "Aminoglycoside",
"usage": "Serious bacterial infections",
"resistance_level": "Medium",
"resistance_detail": "Resistance emerging in hospital settings",
"warning": "Possible kidney and ear toxicity",
"alternatives": "Amikacin"
},
{
"name": "Amikacin",
"class": "Aminoglycoside",
"usage": "Severe infections caused by Gram-negative bacteria",
"resistance_level": "Low",
"resistance_detail": "Less resistance compared to gentamicin",
"warning": "Requires monitoring for toxicity",
"alternatives": "Gentamicin"
},
{
"name": "Levofloxacin",
"class": "Fluoroquinolone",
"usage": "Respiratory infections, UTIs",
"resistance_level": "High",
"resistance_detail": "Rising resistance worldwide",
"warning": "May cause tendon problems",
"alternatives": "Ciprofloxacin"
},
{
"name": "Ofloxacin",
"class": "Fluoroquinolone",
"usage": "UTI, Respiratory infections",
"resistance_level": "Medium",
"resistance_detail": "Resistance increasing in UTI pathogens",
"warning": "Avoid in children",
"alternatives": "Levofloxacin"
},
{
"name": "Norfloxacin",
"class": "Fluoroquinolone",
"usage": "Urinary tract infections",
"resistance_level": "High",
"resistance_detail": "High resistance in E. coli strains",
"warning": "Not recommended for severe infections",
"alternatives": "Nitrofurantoin"
},
{
"name": "Nitrofurantoin",
"class": "Nitrofuran",
"usage": "Uncomplicated UTIs",
"resistance_level": "Low",
"resistance_detail": "Still effective against many UTI pathogens",
"warning": "Not suitable for kidney disease patients",
"alternatives": "Fosfomycin"
},
{
"name": "Fosfomycin",
"class": "Phosphonic acid derivative",
"usage": "Urinary tract infections",
"resistance_level": "Low",
"resistance_detail": "Low resistance currently",
"warning": "Single-dose therapy common",
"alternatives": "Nitrofurantoin"
},
{
"name": "Colistin",
"class": "Polymyxin",
"usage": "Multi-drug resistant infections",
"resistance_level": "Rising",
"resistance_detail": "mcr gene causing resistance globally",
"warning": "Toxic to kidneys",
"alternatives": "Tigecycline"
},
{
"name": "Tigecycline",
"class": "Glycylcycline",
"usage": "Complicated infections",
"resistance_level": "Low",
"resistance_detail": "Limited resistance reported",
"warning": "Not for bloodstream infections",
"alternatives": "Colistin"
},
{
"name": "Erythromycin",
"class": "Macrolide",
"usage": "Respiratory infections",
"resistance_level": "Medium",
"resistance_detail": "Resistance seen in Streptococcus",
"warning": "May cause stomach upset",
"alternatives": "Azithromycin"
},
{
"name": "Rifampicin",
"class": "Rifamycin",
"usage": "Tuberculosis treatment",
"resistance_level": "High",
"resistance_detail": "Resistance common in TB if misused",
"warning": "Can change urine color",
"alternatives": "Isoniazid"
},
{
"name": "Isoniazid",
"class": "Antimycobacterial",
"usage": "Tuberculosis treatment",
"resistance_level": "High",
"resistance_detail": "Drug-resistant TB strains emerging",
"warning": "May cause liver toxicity",
"alternatives": "Rifampicin"
}
];

mongoose.connect("mongodb://127.0.0.1:27017/antibioticsDB")
.then(async () => {
  const AntibioticSchema = new mongoose.Schema({
    name:String,
    class:String,
    usage:String,
    resistance_level:String,
    resistance_detail:String,
    warning:String,
    alternatives:String
  });
  
  // Create a new model if it hasn't been compiled yet
  const Antibiotic = mongoose.models.Antibiotic || mongoose.model("Antibiotic", AntibioticSchema);

  await Antibiotic.insertMany(data);
  console.log("Successfully inserted " + data.length + " antibiotics into the database!");
  mongoose.disconnect();
})
.catch(err => {
    console.log("Error inserting data:", err);
    mongoose.disconnect();
});
