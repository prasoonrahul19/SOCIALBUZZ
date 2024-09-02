import {UserRepository}from '../repository/index.js' 

class UserService {
    constructor(){
        this.userRepository = new UserRepository();
    }
    async signup(data){
     try{
            const user = await this.userRepository.create(data);
            return user;
     }
     catch(error){
        throw error;
     }
    }

    async getUserByEmail(email) {
        try {
            const user = await this.userRepository.findBy({email});
            return user;
        } catch (error) {
            throw error;
        }
    }

    async signIn(data){
        try {
            const user = await this.getUserByEmail(data.email);
            if(!user){
                   throw {
                   message: 'No User Found',
                   success: false
                   }
                }
            if(!user.comparePassword(data.password)){
                throw{
                    message:'no correct  password Found',
                    success : 'false'
                }
            }
            const token = user.genJWT();
            return token;
        } catch (error) {
            throw error;
        }
    }
    
}
export default UserService;