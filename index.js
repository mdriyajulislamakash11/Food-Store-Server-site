// Express.js লাইব্রেরি ইমপোর্ট করা হচ্ছে, এটি Node.js এর একটি ওয়েব ফ্রেমওয়ার্ক যা API তৈরি করতে ব্যবহৃত হয়।
const express = require('express'); 

// CORS (Cross-Origin Resource Sharing) প্যাকেজ ইমপোর্ট করা হচ্ছে, যা বিভিন্ন ডোমেইন থেকে API অনুরোধ গ্রহণের অনুমতি দেয়।
const cors = require('cors'); 

// MongoDB লাইব্রেরি থেকে MongoClient, ServerApiVersion, এবং ObjectId ইমপোর্ট করা হচ্ছে। MongoClient দিয়ে ডাটাবেস কানেকশন করা হয়, ObjectId দিয়ে ডকুমেন্ট আইডি তৈরি হয়।
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); 

// সার্ভার চলবে এমন পোর্ট নির্ধারণ করা হচ্ছে। যদি পরিবেশ ভেরিয়েবল(PORT) না থাকে, তাহলে ডিফল্টভাবে 5000 পোর্ট ব্যবহার হবে।
const port = process.env.PORT || 5000; 

// Express অ্যাপ্লিকেশন তৈরি করা হচ্ছে।
const app = express(); 

// CORS পলিসি সক্রিয় করা হচ্ছে, যাতে অন্যান্য ডোমেইন থেকে API কল করা যায়।
app.use(cors()); 

// ইনকামিং HTTP রিকোয়েস্টের বডি JSON ফরম্যাটে পার্স করতে middleware ব্যবহার করা হচ্ছে।
app.use(express.json()); 

const uri = "mongodb+srv://foodStore:ox048c6Oc7tqDE37@cluster0.zchez.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 
// MongoDB এর URI বা কানেকশন স্ট্রিং সেট করা হচ্ছে, যার মাধ্যমে MongoDB ডাটাবেসের সাথে কানেকশন করা হবে।

const client = new MongoClient(uri, { 
  serverApi: { 
    version: ServerApiVersion.v1, 
    strict: true, 
    deprecationErrors: true, 
  } 
});
// MongoClient এর মাধ্যমে MongoDB এর সাথে কানেকশন তৈরি করা হচ্ছে। এখানে Stable API version এবং কিছু অপশন দেওয়া হয়েছে।

async function run() { 
  try { 
    await client.connect(); 
    // MongoDB সার্ভারের সাথে কানেকশন করার জন্য MongoClient ব্যবহার করা হচ্ছে।
    
    const userCollection = client.db("foodstDB").collection("foods"); 
    // "foodstDB" নামক ডাটাবেসের "foods" নামক কোলেকশনে কানেকশন স্থাপন করা হচ্ছে।



                 //full explaine//
// ======================================================//
// "/foods" রুটে GET রিকোয়েস্ট আসলে "foods" কোলেকশনের সব ডেটা ফেরত পাঠানো হবে।

    app.get("/foods", async (req, res) => { 
      const cursor = userCollection.find(); 
      const result = await cursor.toArray(); 
      res.send(result); 
    }); 

// নিচে app.get("/foods", async (req, res) => { ... }) কোডটির উদ্দেশ্য এবং কাজ ব্যাখ্যা করা হলো:

// app.get("/foods", async (req, res) => { 
//   // "/foods" রুটে GET রিকোয়েস্ট আসলে এই ফাংশনটি এক্সিকিউট হবে।

//   const cursor = userCollection.find(); 
//   // MongoDB কোলেকশনে থাকা সব ডকুমেন্ট খুঁজতে 'find()' মেথড ব্যবহার করা হচ্ছে।
//   // 'userCollection' হলো "foods" নামক কোলেকশন যা MongoDB ডাটাবেসে রয়েছে।

//   const result = await cursor.toArray(); 
//   // 'cursor.toArray()' ব্যবহার করে সব ডকুমেন্ট একত্রে একটি অ্যারে আকারে নেওয়া হচ্ছে।
//   // 'await' ব্যবহার করা হচ্ছে কারণ এটি একটি অ্যাসিনক্রোনাস অপারেশন, তাই রেসপন্স পেতে কিছু সময় লাগতে পারে।

//   res.send(result); 
//   // সব ফলাফল (foods) এক্সট্র্যাক্ট করে ক্লায়েন্টকে ফেরত পাঠানো হচ্ছে।
// });
// ব্যাখ্যা:

// এটি একটি GET রিকোয়েস্ট হ্যান্ডলার যা "/foods" রুটে আসলে কার্যকর হবে।
// userCollection.find() কোলেকশনে থাকা সব ডকুমেন্ট খুঁজে বের করে।
// cursor.toArray() এর মাধ্যমে ডাটাবেসের সব ডেটা অ্যারে আকারে নিয়ে আসা হয়।
// তারপর সেই ফলাফল res.send(result) দিয়ে ক্লায়েন্টকে পাঠানো হয়, অর্থাৎ API কলের মাধ্যমে খাবারের সমস্ত ডেটা ফেরত আসবে।
    

 //=======================================================//   



                 //full explaine//
 // ======================================//
 // "/foods/:id" রুটে GET রিকোয়েস্ট আসলে নির্দিষ্ট আইডি অনুযায়ী একটি খাবারের তথ্য ফেরত পাঠানো হবে।
 
 app.get("/foods/:id", async (req, res) => { 
   const id = req.params.id; 
   const query = { _id: new ObjectId(id) }; 
   const result = await userCollection.findOne(query); 
   res.send(result); 
 }); 


//  এটি একটি GET রিকোয়েস্ট হ্যান্ডলার যা "/foods/:id" রুটে ব্যবহৃত হয়। এখানে :id এর মানে হলো ইউআরএল প্যারামিটার হিসেবে আইডি দেওয়া হবে, যার মাধ্যমে একটি নির্দিষ্ট ফুড আইটেম ডেটা রিট্রিভ করা হবে।

//  এখন কোডটি বিস্তারিতভাবে ব্যাখ্যা করা হলো:

//  app.get("/foods/:id", async (req, res) => { 
//    // "/foods/:id" রুটে GET রিকোয়েস্ট আসলে এই ফাংশনটি এক্সিকিউট হবে।
//    // এখানে ':id' ডাইনামিক্যালি প্যারামিটার হিসাবে ব্যবহৃত হবে।
 
//    const id = req.params.id; 
//    // 'req.params.id' এর মাধ্যমে ইউআরএল থেকে আইডিটি অ্যাক্সেস করা হচ্ছে। 
//    // যেমন '/foods/12345' হলে 'id' এর মান হবে '12345'
 
//    const query = { _id: new ObjectId(id) }; 
//    // এখানে 'id' থেকে একটি নতুন MongoDB ObjectId তৈরি করা হচ্ছে, কারণ MongoDB ডকুমেন্টের '_id' সাধারণত ObjectId টাইপের হয়।
//    // এই 'query' MongoDB তে অনুসন্ধানের জন্য ব্যবহার করা হবে।
 
//    const result = await userCollection.findOne(query); 
//    // 'userCollection.findOne(query)' ব্যবহার করে MongoDB তে নির্দিষ্ট '_id' এর সাথে ডকুমেন্টটি খুঁজে পাওয়া হচ্ছে।
//    // 'findOne()' ফাংশনটি একমাত্র একটি ডকুমেন্ট রিটার্ন করবে যেটি দেওয়া কুয়েরির সাথে মেলে।
 
//    res.send(result); 
//    // যদি কোন ফলাফল পাওয়া যায়, তাহলে তা ক্লায়েন্টে পাঠানো হচ্ছে।
//  });
//  ব্যাখ্যা:
 
//  /foods/:id: এই রুটের মাধ্যমে আপনি যে কোনো খাবারের নির্দিষ্ট ডকুমেন্ট বা আইটেমের তথ্য পাবেন, যেটির _id ইউআরএল প্যারামিটার হিসেবে দেয়া হবে।
//  req.params.id: এটি ইউআরএল থেকে id প্যারামিটার গ্রহণ করে, যাতে ব্যবহারকারী যে খাবারের আইডি চাইছে তা পেতে পারেন।
//  new ObjectId(id): MongoDB এর জন্য আইডি অবশ্যই ObjectId টাইপ হতে হবে, তাই এটি একটি নতুন ObjectId তৈরি করা হচ্ছে।
//  findOne(query): নির্দিষ্ট আইডি অনুসারে একক ডকুমেন্ট বের করা হচ্ছে।
//  res.send(result): ফলস্বরূপ পাওয়া ডকুমেন্টটি ক্লায়েন্টে পাঠানো হচ্ছে।
//  এটি API কলের মাধ্যমে নির্দিষ্ট খাবারের তথ্য ফিরে আনার জন্য ব্যবহৃত হবে।

// ======================================//







                //full explaine//
// ===============================================//
// "/foods" রুটে POST রিকোয়েস্ট আসলে নতুন খাবারের তথ্য ডাটাবেসে যোগ করা হবে।

app.post("/foods", async (req, res) => { 
  const newUser = req.body; 
  const result = await userCollection.insertOne(newUser); 
  res.send(result); 
}); 


// এই কোডটি একটি POST রিকোয়েস্ট হ্যান্ডলার, যা "/foods" রুটে ব্যবহৃত হয়। এর মাধ্যমে একটি নতুন ফুড ডকুমেন্ট MongoDB ডেটাবেসে ইনসার্ট করা হয়।

// এটি বিস্তারিতভাবে ব্যাখ্যা করা হলো:

// app.post("/foods", async (req, res) => { 
//   // "/foods" রুটে POST রিকোয়েস্ট আসলে এই ফাংশনটি এক্সিকিউট হবে।
//   // ক্লায়েন্টের কাছ থেকে ডেটা পাঠানো হবে, যেটি 'req.body' তে পাওয়া যাবে।
  
//   const newUser = req.body; 
//   // 'req.body' হল সেই ডেটা যা ক্লায়েন্ট POST রিকোয়েস্টে পাঠিয়েছে। 
//   // এটি সাধারণত ফর্ম ডেটা, JSON ডেটা বা অন্য কিছু হতে পারে। এখানে 'newUser' তে সেই ডেটা আসবে।

//   const result = await userCollection.insertOne(newUser); 
//   // 'userCollection.insertOne(newUser)' ব্যবহার করে MongoDB এর 'foods' কলে নতুন ডকুমেন্ট ইনসার্ট করা হচ্ছে।
//   // 'insertOne()' একটি নতুন ডকুমেন্ট ইনসার্ট করবে এবং এর রেজাল্ট ফেরত দেবে, যেমন ডকুমেন্টের আইডি বা সফলতা ইত্যাদি।
  
//   res.send(result); 
//   // ইনসার্টের পর ফলস্বরূপ পাওয়া ডেটা (যেমন: আইডি, সার্ভার রেসপন্স ইত্যাদি) ক্লায়েন্টে পাঠানো হচ্ছে।

// });
// ব্যাখ্যা:
// /foods: এটি একটি API রুট যা খাবারের তথ্য যোগ করার জন্য ব্যবহৃত হবে।
// req.body: এই অংশে ক্লায়েন্ট থেকে পাঠানো ডেটা পাওয়া যায়, যা সাধারাণত JSON ফরম্যাটে হয়।
// insertOne(newUser): MongoDB এর insertOne ফাংশনটি ব্যবহার করে newUser ডেটাকে foods নামক কলে ইনসার্ট করা হয়।
// res.send(result): MongoDB এর ইনসার্ট অপারেশন থেকে যে রেজাল্ট পাওয়া যাবে, তা ক্লায়েন্টে পাঠানো হবে। এটি সাধারণত ইনসার্ট হওয়া ডকুমেন্টের আইডি বা স্ট্যাটাস হতে পারে।
// উদাহরণ:
// ক্লায়েন্ট যদি নিচের JSON ডেটা পাঠায়:

// {
//   "name": "Pizza",
//   "chef": "John Doe",
//   "cuisine": "Italian",
//   "taste": "Savory",
//   "category": "Fast Food",
//   "details": "Delicious cheesy pizza with toppings",
//   "photo": "pizza-image.jpg"
// }
// এটি MongoDB তে নতুন একটি ফুড ডকুমেন্ট হিসেবে যোগ হবে।
// ===============================================//




                      //full explaine//
// ===================================================//
// "/foods/:id" রুটে PUT রিকোয়েস্ট আসলে নির্দিষ্ট আইডি অনুযায়ী খাবারের তথ্য আপডেট করা হবে।

app.put("/foods/:id", async (req, res) => { 
  const id = req.params.id; 
  const filter = { _id: new ObjectId(id) }; 
  const options = { upsert: true }; 
  const updatedData = req.body; 
  const updatedDoc = { 
    $set: { 
      name: updatedData.name, 
      chef: updatedData.chef, 
      cuisine: updatedData.cuisine, 
      taste: updatedData.taste, 
      category: updatedData.category, 
      details: updatedData.details, 
      photo: updatedData.photo, 
    }, 
  }; 
  //mustbe filter ar option er majh khane variavle er name ta dite hobe ekhane jmn: updateDoc ta ase
  const result = await userCollection.updateOne(filter, updatedDoc, options); 
  res.send(result); 
}); 



// এই কোডটি একটি PUT রিকোয়েস্ট হ্যান্ডলার, যা /foods/:id রুটে ব্যবহৃত হয়। এটি MongoDB ডেটাবেসে একটি নির্দিষ্ট খাবারের তথ্য আপডেট করে।

// এটি বিস্তারিতভাবে ব্যাখ্যা করা হলো:

// app.put("/foods/:id", async (req, res) => { 
//   // "/foods/:id" রুটে PUT রিকোয়েস্ট আসলে এই ফাংশনটি এক্সিকিউট হবে। 
//   // এখানে :id হল সেই খাবারের আইডি, যেটি আপডেট করতে হবে।

//   const id = req.params.id; 
//   // URL প্যারামিটার থেকে খাবারের আইডি বের করা হচ্ছে। এটি 'req.params.id' তে পাওয়া যাবে।

//   const filter = { _id: new ObjectId(id) }; 
//   // ফিল্টারটি তৈরি করা হচ্ছে। এটি MongoDB এর 'ObjectId' এর মাধ্যমে সঠিক ডকুমেন্ট খুঁজে পেতে ব্যবহৃত হবে।

//   const options = { upsert: true }; 
//   // 'upsert' অপশনটি সেট করা হয়েছে, যার মানে যদি নির্দিষ্ট ID এর ডকুমেন্ট না থাকে, তবে একটি নতুন ডকুমেন্ট তৈরি হবে।

//   const updatedData = req.body; 
//   // ক্লায়েন্ট থেকে পাঠানো ডেটা (যা আপডেট করা হবে) 'req.body' তে পাওয়া যাচ্ছে।

//   const updatedDoc = { 
//     $set: { 
//       // $set অপারেটর ব্যবহার করে কেবলমাত্র সেই ফিল্ডগুলি আপডেট করা হবে, যেগুলি 'updatedData' তে রয়েছে।
//       name: updatedData.name, 
//       chef: updatedData.chef, 
//       cuisine: updatedData.cuisine, 
//       taste: updatedData.taste, 
//       category: updatedData.category, 
//       details: updatedData.details, 
//       photo: updatedData.photo, 
//     }, 
//   }; 
//   // 'updatedDoc' হল সেই ডকুমেন্ট, যা MongoDB তে আপডেট হবে।

//   const result = await userCollection.updateOne(filter, updatedDoc, options); 
//   // MongoDB তে 'updateOne' ফাংশনটি ব্যবহার করে আপডেট করা হচ্ছে।
//   // 'filter' ব্যবহার করে সঠিক ডকুমেন্ট চিহ্নিত করা হচ্ছে এবং 'updatedDoc' দিয়ে সেটি আপডেট করা হচ্ছে।
//   // 'options' ব্যবহার করা হচ্ছে যাতে যদি ডকুমেন্ট না পাওয়া যায়, তবে একটি নতুন ডকুমেন্ট তৈরি হয়।

//   res.send(result); 
//   // ফলস্বরূপ পাওয়া ডেটা (যেমন: আপডেট হওয়া ডকুমেন্ট বা স্ট্যাটাস) ক্লায়েন্টে পাঠানো হচ্ছে।
// });
// ব্যাখ্যা:
// /foods/:id: এটি একটি PUT API রুট যা খাবারের আইডি দিয়ে সেই খাবারের তথ্য আপডেট করবে।
// req.params.id: এটি URL প্যারামিটার থেকে খাবারের আইডি বের করবে। যেমন /foods/123 এর ক্ষেত্রে id = 123 হবে।
// filter: MongoDB তে সঠিক ডকুমেন্ট খুঁজে পেতে এই ফিল্টার ব্যবহার করা হচ্ছে। এখানে _id ফিল্ডের মান হিসাবে খাবারের আইডি দেওয়া হচ্ছে।
// $set: MongoDB এর $set অপারেটরটি ব্যবহার করে নির্দিষ্ট ফিল্ডগুলো আপডেট করা হয়।
// updateOne(): MongoDB এর updateOne ফাংশনটি একটি ডকুমেন্ট আপডেট করে। যদি ডকুমেন্ট না পাওয়া যায় এবং upsert: true অপশন ব্যবহার করা হয়, তবে এটি একটি নতুন ডকুমেন্ট তৈরি করবে।
// উদাহরণ:
// যদি ক্লায়েন্ট নিচের JSON ডেটা পাঠায়:

// {
//   "name": "Pasta",
//   "chef": "Jane Doe",
//   "cuisine": "Italian",
//   "taste": "Delicious",
//   "category": "Italian Food",
//   "details": "A classic Italian pasta with a rich tomato sauce.",
//   "photo": "pasta-image.jpg"
// }
// এটি MongoDB তে আপডেট করা হবে, যদি আইডি সঠিকভাবে মেলাতে পাওয়া যায়।

// ===================================================//





                  //full explaine//
// ==================================================//
// "/foods/:id" রুটে DELETE রিকোয়েস্ট আসলে নির্দিষ্ট আইডি অনুযায়ী খাবার ডিলিট করা হবে।

app.delete("/foods/:id", async (req, res) => { 
  const id = req.params.id; 
  const query = { _id: new ObjectId(id) }; 
  const result = await userCollection.deleteOne(query); 
  res.send(result); 
}); 



// এই কোডটি একটি DELETE রিকোয়েস্ট হ্যান্ডলার যা /foods/:id রুটে ব্যবহৃত হয়। এটি MongoDB ডেটাবেস থেকে একটি নির্দিষ্ট খাবারের ডকুমেন্ট ডিলিট করে।

// এটি বিস্তারিতভাবে ব্যাখ্যা করা হলো:

// app.delete("/foods/:id", async (req, res) => { 
//   // "/foods/:id" রুটে DELETE রিকোয়েস্ট আসলে এই ফাংশনটি এক্সিকিউট হবে।
//   // এখানে :id হল সেই খাবারের আইডি, যেটি মুছে ফেলতে হবে।

//   const id = req.params.id; 
//   // URL প্যারামিটার থেকে খাবারের আইডি বের করা হচ্ছে। এটি 'req.params.id' তে পাওয়া যাবে।

//   const query = { _id: new ObjectId(id) }; 
//   // MongoDB তে সঠিক ডকুমেন্ট খুঁজে পেতে '_id' এর মান হিসেবে ObjectId ব্যবহার করা হচ্ছে। 
//   // এটি MongoDB এর ডকুমেন্ট আইডি হিসেবে ব্যবহৃত হয়।

//   const result = await userCollection.deleteOne(query); 
//   // MongoDB তে 'deleteOne' ফাংশনটি ব্যবহার করে, যে ডকুমেন্টটি '_id' অনুযায়ী মেলে, সেটি ডিলিট করা হচ্ছে।
//   // এখানে 'query' হচ্ছে সেই শর্ত যা MongoDB তে ডকুমেন্ট মুছে ফেলতে ব্যবহার করা হচ্ছে।

//   res.send(result); 
//   // ডিলিট অপারেশনের ফলস্বরূপ MongoDB থেকে পাওয়া রেজাল্ট (যেমন: ডকুমেন্ট মুছে ফেলা হয়েছে কিনা) ক্লায়েন্টে পাঠানো হচ্ছে।
// });


// ব্যাখ্যা:
// /foods/:id: এটি একটি DELETE API রুট যা একটি নির্দিষ্ট খাবারের আইডি দিয়ে সেই খাবারের ডকুমেন্ট MongoDB থেকে ডিলিট করবে।
// req.params.id: এটি URL প্যারামিটার থেকে খাবারের আইডি বের করবে। যেমন /foods/123 এর ক্ষেত্রে id = 123 হবে।
// query: MongoDB তে সঠিক ডকুমেন্ট খুঁজে পেতে এই ফিল্টার ব্যবহার করা হচ্ছে। এখানে _id ফিল্ডের মান হিসাবে খাবারের আইডি দেওয়া হচ্ছে।
// deleteOne(): MongoDB এর deleteOne ফাংশনটি একটি ডকুমেন্ট মুছে ফেলবে, যদি _id সঠিকভাবে মেলে।
// res.send(result): এই রেসপন্সটি ক্লায়েন্টে পাঠানো হচ্ছে, যাতে তারা জানতে পারে ডকুমেন্টটি সফলভাবে মুছে ফেলা হয়েছে কি না।
// উদাহরণ:
// যদি ক্লায়েন্ট একটি DELETE রিকোয়েস্ট পাঠায়, যেমন:

// bash
// Copy code
// DELETE /foods/634f5412f58e4c28bc5faeb7
// তাহলে এই রিকোয়েস্টটি MongoDB তে থাকা _id: "634f5412f58e4c28bc5faeb7" ডকুমেন্টটি মুছে ফেলবে।

// এখন, রেসপন্সে আপনি MongoDB থেকে পাওয়া ফলস্বরূপ দেখতে পারবেন, যা সাধারণত এমন হবে:

// json
// Copy code
// {
//   "acknowledged": true,
//   "deletedCount": 1
// }
// এটা নির্দেশ করে যে, ১টি ডকুমেন্ট সফলভাবে মুছে ফেলা হয়েছে।

// ==================================================//
    


    await client.db("admin").command({ ping: 1 }); 
    console.log("Pinged your deployment. You successfully connected to MongoDB!"); 
    // MongoDB এর সাথে সফলভাবে কানেক্ট হওয়া যাচাই করার জন্য পিং কমান্ড পাঠানো হচ্ছে।
  } finally { 
    // If there is any error, MongoDB কানেকশন ক্লোজ করতে পারেন (এটা কোডের শেষে ব্যবহৃত হয়)। 
  } 
}

run().catch(console.dir); 
// ফাংশনটি কল করা হচ্ছে এবং যদি কোনো ত্রুটি ঘটে তবে তা লগ করা হবে।

app.get("/", (req, res) => { 
    res.send("My server site is running..."); 
}); 
// "/ রুটে GET রিকোয়েস্ট আসলে সার্ভারের স্ট্যাটাস হিসেবে "My server site is running..." মেসেজ পাঠানো হবে।

app.listen(port, () => { 
    console.log(`my port is running: ${port}`); 
}); 
// সার্ভারটি নির্দিষ্ট পোর্টে চালু করা হচ্ছে এবং সফলভাবে চালু হলে কনসোলে পোর্ট নম্বর প্রদর্শন করা হচ্ছে।
