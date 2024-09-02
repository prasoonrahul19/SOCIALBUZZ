import UserService from "../services/user-service.js";
const userService = new UserService();

export const signup = async (req,res)=>{
    try{
    const response = await userService.signup({
        email: req.body.email,
        password : req.body.password,
        name : req.body.name
    });
    return res.status(201).json({
        success: true,
        message : 'succesfully created a new User',
        data: response,
        err: {}
    })

}
catch(error){
    return res.status(500).json({
        success: false,
        message: 'something went worng in controller',
        data : {},
        err:error
    })
}
}

export const login = async (req,res)=>{
    try {
        const token = await userService.signIn(req.body);
        return res.status(200).json({
            success: true,
            message : 'succesfully logged In',
            data: token,
            err: {}
        })
    
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'something went worng in controller',
            data : {},
            err:error
        })
    }
}
