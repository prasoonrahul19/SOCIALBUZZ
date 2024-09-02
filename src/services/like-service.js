import Like from "../models/like.js";
import { LikeRepository , TweetRepository} from '../repository/index.js'

class LikeService {
constructor(){
    this.likeRepository = new LikeRepository
    this.tweetRepository = new TweetRepository
}
async toggelLike (modelId , modelType, userId){
            if (modelType== 'Tweet'){
                    var likeable = await this.tweetRepository.find(modelId);
            }
            else if (modelType == 'Comment'){

            }
            else{
                throw new Error ('unknown model Type');
            }
            const exists = await this.likeRepository.findByUserAndLikeable({
                user: userId ,
                onModel : modelType,
                likeable : modelId
                            });
                           
                if(exists){
                        likeable.likes.pull(exists.id);
                        await likeable.save();
                        await this.likeRepository.destroy(exists.id);
                        var isAdded = true;
                }   
                else{
                        const newLike  = await this.likeRepository.create({
                            user: userId,
                            onModel: modelType,
                            likeable: modelId
                        })
                        likeable.likes.push(newLike);
                        await likeable.save();
                        var isAdded = false;

                }       
                return isAdded; 
}
}
export default LikeService ;