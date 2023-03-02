const router = require('express').Router();
const {
  getGroup,
  createGroup,
  deleteGroup,
  updateGroup,
  updateGroupDeleteMember,
  getGroupEvents,
  updateGroupEvents,
  updateGroupMemberEvents,
<<<<<<< HEAD
  hideGroupMemberEvents,
=======
  getFreeTime,
>>>>>>> 0d0fa5a (dc - should work for only PST)
} = require('../controllers/groupController');

// GET a single group
router.get('/:id', getGroup);

// POST a new group
router.post('/', createGroup);

// DELETE a group
router.delete('/:id', deleteGroup);

// UPDATE a group
router.patch('/:id', updateGroup);

//UPDATE group members
router.patch('/members/:id', updateGroupDeleteMember);

//GET a group's events
router.get('/events/:id', getGroupEvents);

//UPDATE a group's events
router.patch('/events/:id', updateGroupEvents);

//UPDATE a specific group member's events
router.patch('/events/member/:id', updateGroupMemberEvents);

//UPDATE a group's events to hide a certain member
router.patch('/events/member/hide/:id', hideGroupMemberEvents);

//GET a group's free time
router.patch('/free/:id', getFreeTime);

module.exports = router;
