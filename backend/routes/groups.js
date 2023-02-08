const router = require('express').Router();
const {
    getGroup, 
    createGroup, 
    deleteGroup, 
    updateGroup,
    updateGroupMember
} = require('../controllers/groupController')
// GET a single group
router.get('/:id', getGroup)

// POST a new group
router.post('/', createGroup)

// DELETE a group
router.delete('/:id', deleteGroup)

// UPDATE a group
router.patch('/:id', updateGroup)

//UPDATE group members
router.patch('/:id', updateGroupMember)

module.exports = router;