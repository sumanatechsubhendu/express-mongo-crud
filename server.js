const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/Product');
const multer = require('multer');
const path = require('path');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const app = express();

// Configure multer storage to handle the file destination and naming
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/image'); // Ensure this directory exists
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        cb(null, uniqueSuffix + extension); // Append original extension
    }
});

const upload = multer({ storage: storage });


app.use(bodyParser.json());

// Update the mongoose connection by removing deprecated options
mongoose.connect('mongodb://localhost:27017/products');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    description: {
        type: String,
        maxlength: 500
    },
    imageUrl: {
        type: String
    },
    imageType: {
        type: String,
    }
});

// Add a toJSON transform method
productSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret._id = ret._id.toString(); // Convert ObjectId to string
        delete ret.__v; // Optionally remove the __v field
    }
});

//module.exports = mongoose.model('Product', productSchema);
// Use "mongoose.models" to prevent overwriting
const Product1 = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product1;

// CREATE a product
app.post('/products', [
    body('name').isString().isLength({ min: 3, max: 50 }),
    body('price').isFloat({ min: 0 }),
    body('description').optional().isString().isLength({ max: 500 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product); // This will apply the toJSON transformation
});


// GET all products
app.get('/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// UPDATE a product by id
app.put('/products/:id', [
    body('name').optional().isString().isLength({ min: 3, max: 50 }),
    body('price').optional().isFloat({ min: 0 }),
    body('description').optional().isString().isLength({ max: 500 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.json(product);
});

// DELETE a product by id
app.delete('/products/:id', async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.status(204).send();
});

// FILE UPLOAD to a product
app.post('/products/:id/upload', upload.single('image'), async (req, res) => {
    try {
        console.log('Request received for uploading image for product ID:', req.params.id);

        const product = await Product.findById(req.params.id);
        if (!product) {
            console.log('Product not found');
            return res.status(404).send('Product not found');
        }

        // Construct the complete image URL
        const baseUrl = req.protocol + '://' + req.get('host');
        const imageUrl = `${baseUrl}/uploads/image/${req.file.filename}`;

        console.log('Image URL:', imageUrl);
        console.log('Image Type:', req.file.mimetype);

        // Update the product's image URL and type
        product.imageUrl = imageUrl;
        product.imageType = req.file.mimetype;

        await product.save();
        console.log('Product updated with new image info:', product);

        res.json({
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            imageUrl: imageUrl,
            imageType: product.imageType
        });
    } catch (error) {
        console.error('Error during image upload:', error);
        res.status(500).send('Server error during image upload');
    }
});

// Create an uploads/images directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
// Serve static files
app.use('/uploads', express.static(uploadsDir));
// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
