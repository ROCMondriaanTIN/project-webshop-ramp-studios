const router = require('express').Router();
let Post = require('../models/post.model');
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    Post.find()
        .populate('author')
        .populate('comments')
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json(`Error: ${err}`));
})

router.route('/add').post((req, res) => {
    const userid = req.body.userid;
    
    User.findById(userid)
        .then((user) => {
            const title = req.body.title;
            const content = req.body.content;
            const date = Date.parse(req.body.date);
        
            const newPost = new Post({
                author:user,
                title,
                content,
                date
            });
        
            newPost.save()
                .then(() => res.json('Post added!'))
                .catch(err => res.status(400).json(`Error: ${err}`));
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});
        
router.route('/:id').get((req, res) => {
    Post.findById(req.param.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.param.id)
        .then(posts => res.json(posts))
        .catch(err => res.status(400).json(`Error: ${err}`));
    });
    
router.route('/like/:id').post((req, res) => {
    Post.findById(req.params.id)
    .then(post => {
        post.likes = post.likes == undefined ? 1 : post.likes + 1;
        post.save()
            .then(() => res.json("Post Liked"))
            .catch(err => res.status(400).json(`Error: ${err}`));
            
    })
    .catch(err => res.status(400).json(`Error: ${err}`));
});

router.route('/update/:id').post((req, res) => {
    const userid = req.body.userid;
    Post.findById(req.params.id)
        .then(post => {
            if(post.author.id === userid) {
                post.title = req.body.title;
                post.content = req.body.content;
                post.date = Date.parse(req.body.date);
                post.save()
                    .then(() => res.json("Post Liked"))
                    .catch(err => res.status(400).json(`Error: ${err}`));
            }
            else {
                res.status(400).json(`Error: Could not find user with the post`)
            }
                
        })
        .catch(err => res.status(400).json(`Error: ${err}`));
});

module.exports = router;