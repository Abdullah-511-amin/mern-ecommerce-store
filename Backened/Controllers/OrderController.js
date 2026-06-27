
const Order = require("../Models/OrderModel.js");
const User = require("../Models/UserModel");

const PlaceOrder = async (req, res) => {
    try {

        const { items, address, amount, paymentMethoud } = req.body;
        const userId = req.userid;

        if (paymentMethoud === 'COD') {
            const order = await Order.create({
                items,
                address,
                amount,
                userId,
                paymentMethoud: "COD",
                payment: false
            });

            await User.findByIdAndUpdate(
                userId,
                { cartData: [] }
            );

            return res.status(201).json({
                success: true,
                message: "Order Placed Successfully",
                order
            });
        }

    } catch (error) {

        console.log("Order Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });

    }
}

const GetUserOrders = async (req, res) => {
    try {
        const userId = req.userid

        const orders = await Order.find({ userId })
            .sort({ createdAt: -1 })

        if (!orders) {
            return res.status(400).json({
                success: false,
                message: 'User Orders Not Found'
            })
        }


        return res.status(200).json({
            success: true,
            message: 'User Orders Found Successfully',
            orders
        })




    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

const adminOrders = async (req, res) => {
    try {

        const orders = await Order.find()
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            totalOrders: orders.length,
            orders
        });

    } catch (error) {

        console.log("Admin Orders Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}

const ChangeStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        if (!orderId || !status) {
            return res.status(400).json({
                success: false,
                message: 'Orderid and status required'
            })
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { status },
            { new: true }
        )

        

        return res.status(200).json({
            success: true,
            message: 'Status changed successfullyy'
        })
    } catch (error) {
        console.log(" Order Status Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

module.exports = { PlaceOrder, GetUserOrders, adminOrders, ChangeStatus }