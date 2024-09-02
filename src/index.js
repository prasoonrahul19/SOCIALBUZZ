import express from 'express';
import {connect} from './config/database.js';
import passport from 'passport';
import bodyParser from 'body-parser';

import apiRoutes from './routes/index.js';
import {passportAuth} from './config/jwt-middleware.js'
import LikeService from './services/like-service.js';
import {UserRepository,TweetRepository} from './repository/index.js'; 

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.use(passport.initialize())
passportAuth(passport);

app.use('/api',apiRoutes);

import service from './services/tweet-service.js';

app.listen(3002 , async () => {
    console.log(`server started at  3002`);
    await connect();
    console.log('mongodb connectd');

    const UserRepo = new UserRepository();
    const tweetRepo = new TweetRepository();
    const tweets = await tweetRepo.getAll(0,10);
    const users = await UserRepo.getAll()
    
    const likeservice = new LikeService();
    await likeservice.toggelLike(tweets[0].id ,'Tweet', users[0].id)


});
