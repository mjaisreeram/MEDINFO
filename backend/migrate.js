const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/antibioticsDB').then(async () => {
  const db = mongoose.connection.db;
  const rems = await db.collection('antibiotics').find({ ailment: { $exists: true } }).toArray();
  if (rems.length > 0) {
    await db.collection('remedies').insertMany(rems);
    await db.collection('antibiotics').deleteMany({ ailment: { $exists: true } });
    console.log('Moved', rems.length, 'remedies to new collection.');
  } else {
    console.log('No remedies to move.');
  }
  mongoose.disconnect();
}).catch(console.error);
