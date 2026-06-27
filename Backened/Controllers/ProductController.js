const { json } = require("express")
const UploadonCloudinary = require("../Config/cloudinary")
const Product = require("../Models/ProductModel");
const User = require("../Models/UserModel");

const AddProduct = async (req, res) => {
    try {

        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestseller
        } = req.body;

        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !subCategory ||
            !sizes
        ) {
            return res.status(400).json({
                success: false,
                message: "Please Fill All Fields"
            });
        }

        if (
            !req.files?.image1 ||
            !req.files?.image2 ||
            !req.files?.image3 ||
            !req.files?.image4
        ) {
            return res.status(400).json({
                success: false,
                message: "Please Upload All Images"
            });
        }

        const image1 = req.files.image1[0].path;
        const image2 = req.files.image2[0].path;
        const image3 = req.files.image3[0].path;
        const image4 = req.files.image4[0].path;

        const upload1 = await UploadonCloudinary(image1);
        const upload2 = await UploadonCloudinary(image2);
        const upload3 = await UploadonCloudinary(image3);
        const upload4 = await UploadonCloudinary(image4);

        if (!upload1 || !upload2 || !upload3 || !upload4) {
            return res.status(400).json({
                success: false,
                message: "Image Upload Failed"
            });
        }

        const product = await Product.create({
            name,
            description,
            price,
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestseller === "true",
            date: Date.now(),

            image1: upload1,
            image2: upload2,
            image3: upload3,
            image4: upload4
        });

        return res.status(201).json({
            success: true,
            message: "Product Added Successfully",
            product
        });

    } catch (error) {

        console.log("Add Product Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

const ListProduct = async (req, res) => {
    try {

        const products = await Product.find();

        if (products.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No Products Listed Yet'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Products fetched successfully',
            products
        });

    } catch (error) {

        console.log("List Product Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const RemoveProduct = async (req, res) => {
    try {

        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product Removed Successfully',
            product
        });

    } catch (error) {

        console.log("Remove Product Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const AddtoCart = async (req, res) => {
    try {

        const userid = req.userid;
        const { productId, size } = req.body;

        // Validation
        if (!productId || !size) {
            return res.status(400).json({
                success: false,
                message: "Product ID and Size are required"
            });
        }

        // User Check
        const user = await User.findById(userid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Product Check
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Same Product + Same Size
        const existingItem = user.cartData.find(
            (item) =>
                item.productId.toString() === productId &&
                item.size === size
        );

        if (existingItem) {

            existingItem.quantity += 1;

        } else {

            // New Product or Different Size
            user.cartData.push({
                productId,
                size,
                quantity: 1
            });

        }

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            cartData: user.cartData
        });

    } catch (error) {

        console.log("Add To Cart Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const RemoveCart = async (req, res) => {
    try {

        const userid = req.userid;
        const { cartItemId } = req.body;

        if (!cartItemId) {
            return res.status(400).json({
                success: false,
                message: "Cart Item ID is required"
            });
        }

        const user = await User.findById(userid);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.cartData = user.cartData.filter(
            (item) => item._id.toString() !== cartItemId
        );

        await user.save();

        await user.populate('cartData.productId');

        return res.status(200).json({
            success: true,
            message: "Cart item removed successfully",
            cartData: user.cartData
        });

    } catch (error) {

        console.log("Remove Cart Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const GetCartData = async (req, res) => {
    try {

        const userid = req.userid;

        const user = await User.findById(userid)
            .populate("cartData.productId");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Cart data fetched successfully",
            cartData: user.cartData
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
module.exports = { AddProduct, ListProduct, RemoveProduct, AddtoCart, GetCartData, RemoveCart }






// yr ma na ecommerce website bna rha hon mern stack ka use krka meri site ma na ui acha sa naii hn is main animations responsive sai nai hn ap na mujhe isa thek kro basically ma ap ko chota chota parts ma na pages do ga ap unhein style krka mujhe code do aur yadd rha yr ap ko na logic ko hath b ni lgana hn backened etc yr ap ko na full zyda acha sa styling krni hn modern tariqa sa yr ma ap ko chota chota page do ga jaisa ka registration ap ko usa style krna hn phir production admin etc 