
class CrudRepository {
    constructor(model){
        this.model = model;
    }
    async create(data){
        try {
           
            const result = await this.model.create(data);
            return result;
            
        } catch (error) {
            console.log("something went wrong in  crud repository")
        }
    }

    async destroy (id){
        try {
            const result = await this.model.findByIdAndDelete(id)
            return result;
        } catch (error) {
            console.log("something went wrong in crud repository")
        }
    }

    async get (id){
        try {
            const result = await this.model.findById(id);
            return result;
        } catch (error) {
            console.log("something went wrong in crud repository")
        }
    }

    async getAll (){
        try {
            const result = await this.model.find({});
            return result;
        } catch (error) {
            console.log("something went wrong in crud repository")
        }
    }

    async update (id,data){
        try {
            const result = await this.model.findByIdAndUpdate(id, data, {new : true});
            return result;
        } catch (error) {
            console.log("something went wrong in crud repository")
        }
    }


}
export default CrudRepository;