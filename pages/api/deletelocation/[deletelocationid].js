import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeletecategory(req, res){
	const {deletelocationid} = req.query
	console.log(req.query)
	const data = await prisma.Location.delete({
		where:{location_id:Number(deletelocationid)},
	});
	res.json(data)
}