import { prisma } from '../../util/db.server.js'

export default async function handlesearchadmin(req, res){
    const { searchName, type } = req.body
    console.log(req.body)
    if (type == 1) {
        const searchData = await prisma.User.findMany({
            where: {
                UserName: {
                    contains: searchName,
                    mode: "insensitive",
                },
            },
        })

        const AllData = searchData.map((data)=>({
            user_id:data.user_id,
            UserName:data.UserName,
            email:data.email,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate
        }))

        res.json(AllData)

    } else if(type == 2){
        const searchData = await prisma.Category.findMany({
            where: {
                CategoryName: {
                    contains: searchName,
                    mode: "insensitive",
                },
            },
            include:{
                User:{
                    select:{
                        UserName:true
                    }
                }
            }
        })
        
        const AllData = searchData.map((data)=>({
            category_id:data.category_id,
            CategoryName:data.CategoryName,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate,
            userName:data.User.UserName
        }))

        res.json(AllData)
    } else if(type == 3){
        const searchData = await prisma.Job.findMany({
            where: {
                CompanyName: {
                    contains: searchName,
                    mode: "insensitive",
                },
            },
            include:{
                User:{
                    select:{
                        UserName:true
                    }
                },
                JobCategory:{
                    include:{
                      Category:{
                        select:{
                          category_id:true,
                          CategoryName:true
                        }
                      }
                    }
                },
            }
        })

        const AllData = searchData.map((data)=>({
            job_id:data.job_id,
            CompanyName:data.CompanyName,
            JobsType:data.JobsType,
            CareerLevel:data.CareerLevel,
            EmploymentType:data.EmploymentType,
            Salary:data.Salary,
            DeadLine:data.DeadLine,
            categories:data.JobCategory,
            Apply:data.Apply,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate,
            userName:data.User.UserName
        }))

        res.json(AllData)
    } else if (type == 4){
        const searchData = await prisma.Location.findMany({
            where: {
                LocationName: {
                    contains: searchName,
                    mode: "insensitive",
                },
            },
            include:{
                User:{
                    select:{
                        UserName:true
                    }
                },
            }
        })

        const AllData = searchData.map((data)=>({
            location_id:data.location_id,
            LocationName:data.LocationName,
            Image:data.Image,
            CreatedDate:data.CreatedDate,
            ModifiedDate:data.ModifiedDate,
            userName:data.User.UserName,
        }))

        res.json(AllData)
    }


}