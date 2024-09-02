import LikeService from "../services/like-service.js";
const likeservice = new LikeService();
export const toggelLike = async (req,res)=>{
    try {
        const response = await likeservice.toggelLike(req.query.modelId, req.query.modelType, req.body.userId);
        return res.status(200).json({
            success: true ,
            data : response,
            message: 'Succesfully toggeled like',
            err : {}
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            data : {},
            message: 'something went Wrong',
            err: error
        })
    }
}