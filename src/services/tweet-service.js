import {TweetRepository, HashtagRepository} from '../repository/index.js'

class TweetService{
    constructor(){
        this.tweetRepository = new TweetRepository();
        this.hashtagRepository = new HashtagRepository();
    }
    async create(data){
        const content = data.content;
        const tags = content.match(/#[a-zA-Z0-9_]+/g) //it is a regular expression to extract word start with #
                            .map((tag)=> tag.substring(1).toLowerCase())
                            
                    
        const tweet = await this.tweetRepository.create(data);
        
        let alreadyPresentTags = await this.hashtagRepository.findByName(tags);//pure tags with tweets id and created and updated
        
        let titleOfPresentTags = alreadyPresentTags.map(tags =>tags.title)//naam of hashtags
        
        let newTags = tags.filter(tag => !titleOfPresentTags.includes(tag));// jo bhi tags pahale se  include nahi hai unhe batata hai
        newTags = newTags.map(tag =>{
            return {title: tag , tweets : [tweet.id]}
        });
        
        await this.hashtagRepository.bulkCreate(newTags); // jo bhi include  nahi hai unka # create karta hai
        alreadyPresentTags.forEach((tag)=> {
            tag.tweets.push(tweet.id);
            tag.save();
        })
        return tweet;

        

    }

    async get(tweetId){
        const tweet = await this.tweetRepository.getWithComments(tweetId);
        return tweet;
    }

}
export default TweetService;