import { prisma } from '../../../util/db.server.js'
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";

export default async function handledeletenews(req, res){
	const {deletenewsid} = req.query
	console.log(req.query)
	const data = await prisma.News.delete({
		where:{news_id:Number(deletenewsid)},
	});
	res.json(data)
}