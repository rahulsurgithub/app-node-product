const { Category } = require("./models/category");
const { Product } = require("./models/product");
const mongoose = require("mongoose");
const config = require("config");

const data = [
  {
    name: "Electronic",
    products: [
      { Title: 'TeleVison', Quantity: 5, Price: 1000, IsDeleted: false, liked: false },
      { Title: 'Option 1', Quantity: 5, Price: 3000, IsDeleted: false, liked: false },
      { Title: 'Option 2', Quantity: 4, Price: 3000, IsDeleted: false, liked: false },
      { Title: 'Option 3', Quantity: 10, Price: 3000, IsDeleted: false, liked: false },
      { Title: 'Option 4', Quantity: 11, Price: 3000, IsDeleted: false, liked: false },
      { Title: 'Option 5', Quantity: 12, Price: 3000, IsDeleted: false, liked: false },
      { Title: 'Option 6', Quantity: 13, Price: 3000, IsDeleted: false, liked: false }      
    ]
  },
  {
    name: "Furniture",
    products: [
      { Title: 'Bed', Quantity: 2, Price: 5000, IsDeleted: false, liked: false },
      { Title: 'Sofa', Quantity: 1, Price: 2000, IsDeleted: false, liked: false }
    ]
  },
  {
    name: "Sport",
    products: [
      { Title: 'Football', Quantity: 2, Price: 1000, IsDeleted: false, liked: false },
      { Title: 'Bat', Quantity: 1, Price: 800, IsDeleted: false, liked: false }      
    ]
  },
  {
    name: "Hygine",
    products: [
      { Title: 'Brush', Quantity: 2, Price: 200, IsDeleted: false, liked: false },
      { Title: 'Towel', Quantity: 1, Price: 700, IsDeleted: false, liked: false }            
    ]
  }
];

async function seed() {
  await mongoose.connect(config.get("db"));

  await Product.deleteMany({});
  await Category.deleteMany({});

  for (let category of data) {
    const { _id: categoryId } = await new Category({ name: category.name }).save();
    const products = category.products.map(product => ({
      ...product,
      Category: { _id: categoryId, name: category.name }
    }));
    await Product.insertMany(products);
  }

  mongoose.disconnect();

  console.info("Done!");
}

seed();
