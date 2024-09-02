import mongoose from 'mongoose'

const tweetSchema = new mongoose.Schema({
    content : {
        type : String,
        required : true,
        max : [250,'Cannot be more than 250 character']
    },
    likes :[ {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Like'
    }
],
comments : [
    {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Comment'
    }
]
}, {timestamps :true });

 

const Tweet = mongoose.model('Tweet', tweetSchema);
export default Tweet;
