var express = require("express");
var router = express.Router();
const { check } = require("express-validator");
const Comment = require("../controllers/comment_controllers");
const { isAdmin } = require("../middlewares/isAdmin");
const isAuthenticated = require("../middlewares/isAuthenticated");
const validarCampos = require("../middlewares/validar_campos");

router.get("/", [
    isAuthenticated,
    isAdmin
], Comment.get);

router.post("/", [
    isAuthenticated,
    check('body', 'You cannot post an empty comment.').not().isEmpty(),
    check('news_id', 'You must send a post ID.').not().isEmpty(),
    // check('user_id', 'You must send a user ID.').not().isEmpty(),
    validarCampos
], Comment.create)

router.put("/:comment_id", [
    isAuthenticated
], Comment.update)

router.delete("/:comment_id", [
    isAuthenticated
], Comment.delete)

module.exports = router;
