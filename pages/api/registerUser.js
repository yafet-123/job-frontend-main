import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async(req, res) => {
	const {UserName , Password, email} = req.body;
	console.log(UserName)
	const data = await prisma.User.create({
		data:{
			UserName,
			email,
			Password:bcrypt.hashSync(Password, 8)	
		},
	});

	// take the username and password and save it , the password is bcrypt
  	const token = jwt.sign(
    	{ userId: data.user_id, user: data.UserName },process.env.JWT_SECRET,
    		{expiresIn: process.env.JWT_LIFETIME,}
  	);
  

  	res.status(StatusCodes.CREATED).json({
    	data: {
      		userId: data.user_id,
    		user: data.UserName,
    	},
    	token,
  	});
	
}

