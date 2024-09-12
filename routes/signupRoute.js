const express = require("express");

const router = express.Router();

const { signup, getUser, userGet, deleteUser, updateUser, updatePassword } = require("../controller/signupController");

router.post("/", signup);
router.get("/", getUser);
router.get('/:id', userGet)
router.put('/:id', updateUser)
router.put('/password/:id', updatePassword)
router.delete('/:id', deleteUser)

module.exports = router;
