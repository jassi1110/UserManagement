var Userdb = require('../model/model')

// Create and Save new User
exports.create = (req,res)=>{
    // Validate req.
    if(!req.body){
        res.status(400).send({message:"Content Cannot be empty"})
        return
    }
    
    // New User
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    // Save User in Databse
    user
        .save(user)
        .then(data=>{
            // res.send(data)
            res.redirect('/add-user')
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message||" Some error occured while creating a create option "
            })
        })

}

// Retreive and return all users
exports.find = (req,res)=>{

    if(req.query.id){
        const id = req.query.id
        Userdb.findById(id)
                    .then(data=>{
                        if(!data){
                            res.status(404).send({message:"No User Found"})
                        }
                        else{
                            res.send(data)
                        }
                    })
                    .catch(err=>{
                        res.status(500).send({message:"Error retrieving User"})
                    })
    }
    
else{
    Userdb.find()
                .then(user=>{
                    res.send(user)
                })
                .catch(err=>{
                    res.status(500).send({message:err.message||"Error occured"})
                })
}
}

// Update a new indentified user by userId
exports.update = (req,res)=>{
    if(!req.body){
        return res
                .status(400)
                .send({message:"Data to Update can not be empty"})
    }
    const id = req.params.id
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message:`cannot update user with ${id},Maybe no user found`})
            }
            else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error Update user info"})
        })
}

// Delete a user with User Id in req
exports.delete = (req,res)=>{
    const id = req.params.id

    Userdb.findOneAndDelete(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Delete with ${id}. Not found`})
            }
            else{
                res.send({message:"Deleted Successfully"})
            }
        })

        .catch(err=>{
            res.status(500).send({
                message:`Could not delete User with id = ${id}`
            })
        })
}