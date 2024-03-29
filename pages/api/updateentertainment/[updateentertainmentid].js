import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handleupdateentertainment(req, res){
	const {updateentertainmentid} = req.query
	const {Header ,ShortDescription ,Description ,user_id ,categoryId} = req.body

	const data = await prisma.Entertainment.update({
		where:{entertainment_id:Number(updateentertainmentid)},
		data:{
			Header,
			ShortDescription,
			Description 
		},
	});

	const deletecategorydata = await prisma.EntertainmentCategoryRelationship.deleteMany({
		where:{entertainment_id:Number(updateentertainmentid)},
	});
	

	for (let j = 0; j < categoryId.length; j++) {
	  	const jobcategory = await prisma.EntertainmentCategoryRelationship.create({
		    data:{
		      user_id : Number(user_id),
		      category_id : Number(categoryId[j]),
		      entertainment_id : Number(updateentertainmentid)
		    }
	  	})
	}



	res.json(data)
}