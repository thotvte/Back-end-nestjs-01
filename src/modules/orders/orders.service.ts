import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User } from "../users/schemas/user.schema";
import { Order } from "./schemas/order.schema";
import { Product } from "../products/schemas/product.schema";

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const { user, products, shippingAddress } = createOrderDto;
  
    const userId = new Types.ObjectId(user);
  
    // Kiểm tra xem người dùng có tồn tại không
    const users = await this.userModel.findById(userId);
    if (!users) {
      throw new NotFoundException(`Không tìm thấy người dùng với id: ${userId}`);
    }
  
    // Khởi tạo tổng số tiền
    let totalAmount = 0;
  
    // Duyệt qua từng sản phẩm trong danh sách sản phẩm
    for (const product of products) {
      const productId = new Types.ObjectId(product.productId);
      
      // Kiểm tra xem sản phẩm có tồn tại không
      const productInfo = await this.productModel.findById(productId);
      if (!productInfo) {
        throw new NotFoundException(`Sản phẩm với ID ${product.productId} không tồn tại`);
      }
  
      // Lưu giá sản phẩm vào product để tránh việc giá thay đổi trong tương lai
      const priceOder =  product.price = productInfo.price;
  
      // Cập nhật tổng giá trị đơn hàng (cộng dồn giá sản phẩm nhân với số lượng)
      totalAmount += priceOder * product.quantity;
    }
  
    // Tạo đơn hàng mới với tổng số tiền đã tính
    const order = new this.orderModel({
      user: userId,
      products: products.map(product => ({
        productId: new Types.ObjectId(product.productId),
        quantity: product.quantity,
        price: product.price, // Giá sản phẩm được lưu tại thời điểm tạo đơn hàng
      })),
      totalAmount,
      shippingAddress:users.address,
      createdAt: new Date(),
    });
  
    // Lưu đơn hàng vào cơ sở dữ liệu
    await order.save();
  
    // Trả về đơn hàng đã tạo
    return order;
  }
  

  async findAll() {
    const orders = await this.orderModel
      .find()
      .populate("user")
      .populate('products.productId')

    return orders;
  }

  async findOne(id: string) {
    const userId = new Types.ObjectId(id);
    const orders = await this.orderModel
      .find({ user: userId })
      .populate("user")
      .populate('products.productId')
      

    return orders;
  }

  async updateOderUser(id: string, updateOrderDto: UpdateOrderDto) {
    const cartId = new Types.ObjectId(id);
    const cart = await this.orderModel.findOne({ _id: cartId });

    if (!cart) {
      return;
    }

    const updateCart = await this.orderModel.updateOne(
      { _id: cartId },  // Điều kiện tìm kiếm
      { ...updateOrderDto }  // Dữ liệu cần cập nhật
  );
    if (!cart) {
      return;
    }
    return updateCart;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
