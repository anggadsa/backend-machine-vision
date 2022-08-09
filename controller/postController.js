const { User, Post } = require("../models");
const model = require('../models');

const createPost = async (req, res) => {
    try{
        const { caption, tags } = req.body;
        const jwt_payload = req.user
        const splitUrl = req.file.path.split("\\");
        const url = splitUrl[splitUrl.length - 1];
        const image = `${process.env.PATH_URL}${url}`;
        const postData = {
            userId: jwt_payload.id,
            caption: caption,
            tags: tags,
            likes: 0,
            Image: image
        }
        const post = await Post.create(postData)
        if(post) {
            console.log(jwt_payload)
            const reload = await Post.findOne({
                where: {
                    id: post.id
                },
                attributes: {
                    exclude: ['id', 'createdAt', 'updatedAt']
                },  
                include: {
                    model: model.User,
                    attributes: ['name', 'username', 'email', 'photo']
                }
            })
            return res.status(201).json({
                success: false,
                message:"Successfully Create Post",
                data: reload
    
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: `Data not found`,
            data: null
          });
    }
};

const listPost = async (req, res) => {};

const listPostByUserId = async (req, res) => {};

const getPostById = async (req, res) => {};

const updatePost = async (req, res) => {};

const deletePost = async (req, res) => {};

const like = async (req, res) => {};

const unLike = async (req, res) => {};

const uploadImage = async (req, res) => {};

module.exports = {
    createPost
}