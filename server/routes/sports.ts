import express from 'express';
import {
    createSport, getSports, getSport, getTermByGroup, createGroup,
    updateSport,
    deleteSport,
    getSportsBySearch,
    commentSport,
    rateSport,
    enrollSport,
    deleteGroup,
    unEnrollSport,
    checkEnrolled,
    getSportGroup,
    editGroup,
    getEnrolledUsers
} from '../controllers/sports';
import auth from '../middleware/auth';



const router = express.Router();

router.get('/search/sport', getSportsBySearch);
router.post('/:id/commentSport', auth, commentSport)
router.post('/create-sport', auth, createSport);
router.get('/', getSports);
router.get('/:id', getSport);
router.get('/:id/term', getTermByGroup);
router.post('/create-group/:id', auth, createGroup);
router.patch('/edit-class/:id', auth, updateSport)
router.delete('/delete-sport/:id', auth, deleteSport)
router.delete('/delete-group/:id/:groupId', auth, deleteGroup)
router.patch('/:id/rateSport', auth, rateSport)
router.patch('/enroll/:id/:group/:userId', auth, enrollSport)
router.patch('/unenroll/:id/:userId', auth, unEnrollSport)
router.patch('/edit-group/:id/:groupId/edit', auth, editGroup)
router.get('/checkEnrolled/:id/:userId', auth, checkEnrolled)
router.get('/group/:id/:group', auth, getEnrolledUsers)
router.get('/edit-group/:id/:groupId', getSportGroup)

export default router;