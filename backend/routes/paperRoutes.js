const express = require('express')
const router = express.Router()
const {
  getPapers,
  setPaper,
  updatePaper,
  deletePaper,
  getPaperById,
} = require('../controllers/paperController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getPapers).post(protect, setPaper)
router.route('/:id').delete(protect, deletePaper).put(protect, updatePaper).get(getPaperById)

module.exports = router