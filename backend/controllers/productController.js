import SellerProduct from '../models/SellerProduct.js';
import axios from 'axios';

export const addProduct = async (req, res) => {
  const { sellerName, productName, productId, price, description, quantity } = req.body;

  const productImage = req.files && req.files.productImage
    ? `/uploads/${req.files.productImage[0].filename}`
    : '';

  try {
    const newProduct = new SellerProduct({
      sellerName,
      productName,
      productId,
      price,
      description,
      productImage,
      quantity,
    });

    const savedProduct = await newProduct.save();
    const response = await axios.post('https://678e-35-234-168-113.ngrok-free.app/api/kaggle/send-image', savedProduct);

    res.status(201).json({ message: 'Product added successfully!', product: savedProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Error adding product', error: error.message });
  }
};

export const getSellerProducts = async (req, res) => {
  const { sellerName } = req.params;

  try {
    const products = await SellerProduct.find({ sellerName });
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching seller products:', error);
    res.status(500).json({ message: 'Error fetching seller products', error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await SellerProduct.find();
    res.status(200).json({ products });
  } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};

export const getProductDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await SellerProduct.findById(id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const relatedProducts = await SellerProduct.find({
      productName: { $regex: product.productName, $options: 'i' },
    }).limit(5);

    res.status(200).json({
      product,
      relatedProducts,
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, price, description, quantity } = req.body;

  try {
    const updatedProduct = await SellerProduct.findByIdAndUpdate(
      id,
      { productName, price, description, quantity },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    res.status(200).json({ message: 'Product updated successfully.', product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product.' });
  }
};