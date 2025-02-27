import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Cart } from "./schemas/cart.schema";
import { Model } from "mongoose";
import { User } from "../users/schemas/user.schema";
import { Product } from "../products/schemas/product.schema";
import { promises } from "dns";
import { Types } from 'mongoose';  // Thêm dòng này vào đầu file


@Injectable()
export class CartsService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const products = createCartDto.products;
    let totalAmount = 0;

    let cart = await this.cartModel.findOne({ user: createCartDto.user });

    if (!cart) {
        cart = new this.cartModel({
            user: createCartDto.user,
            products: [],
            totalAmount: 0,
        });
    }

    for (const product of products) {
        // Chuyển productId thành ObjectId
        const productId = new Types.ObjectId(product.productId);

        const productInfo = await this.productModel.findById(productId);

        if (!productInfo) {
            throw new NotFoundException(
                `Sản phẩm với ID ${product.productId} không tồn tại`,
            );
        }

        const productPrice = productInfo.price;
        const productQuantity = product.quantity;
        const productTotalPrice = productPrice * productQuantity;
        totalAmount += productTotalPrice;

        // Kiểm tra sản phẩm đã có trong giỏ hàng chưa
        const existingProduct = cart.products.find(
            (cartProduct) => cartProduct.productId.toString() === productId.toString()
        );

        if (existingProduct) {
            
            existingProduct.quantity += productQuantity;
        } else {
           
            cart.products.push({
                productId: productId,
                quantity: productQuantity,
                
            });
        }
        
    }
    cart.totalAmount += totalAmount;
    return await cart.save();
}


  async findAll(id: string) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new NotFoundException(`Không tìm thấy người dùng với id: ${id}`);
    }
    const cart = this.cartModel
      .find({ user: user })
      .populate("products.productId");
    //  console.log(cart)

    return cart;
  }

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  async update(id: string, updateCartDto: UpdateCartDto) {
    const products = updateCartDto.products; // Lấy danh sách sản phẩm trong giỏ hàng
    let totalAmount = 0; // Biến để tính lại tổng tiền của giỏ hàng
  
    // Tìm giỏ hàng theo id
    const cart = await this.cartModel.findById(id);
    if (!cart) {
      throw new NotFoundException(`Giỏ hàng với ID ${id} không tồn tại.`);
    }
  
    // Lặp qua từng sản phẩm trong giỏ hàng để cập nhật
    for (const product of products) {
      const productId = new Types.ObjectId(product.productId); // Chuyển đổi productId thành ObjectId
  
      // Tìm thông tin sản phẩm từ cơ sở dữ liệu
      const productInfo = await this.productModel.findById(productId);
      if (!productInfo) {
        throw new NotFoundException(`Sản phẩm với ID ${productId} không tồn tại.`);
      }
  
      // Tính giá trị tổng của sản phẩm
      const productPrice = productInfo.price;
      const productQuantity = product.quantity;
      const productTotalPrice = productPrice * productQuantity;
  
      // Kiểm tra sản phẩm có trong giỏ hàng chưa
      const productIndex = cart.products.findIndex(
        (cartProduct) => cartProduct.productId.toString() === productId.toString()
      );
  
      if (productIndex !== -1) {
        // Nếu sản phẩm đã có trong giỏ hàng, cập nhật số lượng và tính lại giá
        const existingProduct = cart.products[productIndex];
        existingProduct.quantity = productQuantity;
       
      } else {
        // Nếu sản phẩm chưa có trong giỏ hàng, thêm mới sản phẩm vào giỏ
        cart.products.push({
          productId: productId,
          quantity: productQuantity,
          
        });
      }
  
      // Cộng dồn tổng giá của giỏ hàng
      totalAmount += productTotalPrice;
    }
  
    // Cập nhật lại tổng giá của giỏ hàng
    cart.totalAmount = totalAmount;
  
    // Lưu giỏ hàng sau khi cập nhật
    await cart.save();
  
    return `Giỏ hàng đã được cập nhật thành công.`;
  }
  
  
  async remove(id:string,userId:string){
    const productId = new Types.ObjectId(id);
    const userCart = new Types.ObjectId(userId)
    const updatedCart = await this.cartModel.updateOne(
      { 'products.productId': productId },  // Điều kiện tìm giỏ hàng có sản phẩm cần xóa
      { $pull: { products: { productId: productId } } }  // Sử dụng $pull để xóa sản phẩm khỏi mảng products
    );

    const user = await this.cartModel.findOne({user:userCart});
    if(!updatedCart){
      console.log('khoong tim thay')
    }
    if(user){
      console.log('khong tim thay user')
    }
    

    // Tính lại tổng giá sau khi xóa các sản phẩm
    let newTotalAmount = 0;
    for (const remainingProduct of user.products) {
      // Giả sử mỗi sản phẩm trong giỏ hàng có price và quantity
      const productId = new Types.ObjectId(remainingProduct.productId); // Chuyển đổi productId thành ObjectId
  
      // Tìm thông tin sản phẩm từ cơ sở dữ liệu
      const productInfo = await this.productModel.findById(productId);
      newTotalAmount += productInfo.price * remainingProduct.quantity;
    }

    user.totalAmount = newTotalAmount;

    await user.save();
    
    return updatedCart
  }
 
}
