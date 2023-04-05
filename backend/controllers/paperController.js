const asyncHandler = require('express-async-handler')

const Paper = require('../models/paperModel')
const User = require('../models/userModel')

// @desc    Get papers
// @route   GET /api/papers
// @access  Private
const getPapers = asyncHandler(async (req, res) => {
  const papers = await Paper.find({ user: req.user.id })

  res.status(200).json(papers)
})

// @desc    Set paper
// @route   POST /api/papers
// @access  Private
const setPaper = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400)
    throw new Error('Please add a text field')
  }

  const paper = await Paper.create({
    text: req.body.text,
    user: req.user.id,
  })

  res.status(200).json(paper)
})

// @desc    Update paper
// @route   PUT /api/papers/:id
// @access  Private
const updatePaper = asyncHandler(async (req, res) => {
  const paper = await Paper.findById(req.params.id)

  if (!paper) {
    res.status(400)
    throw new Error('Paper not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the paper user
  if (paper.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  const updatedPaper = await Paper.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })

  res.status(200).json(updatedPaper)
})

// @desc    Delete paper
// @route   DELETE /api/papers/:id
// @access  Private
const deletePaper = asyncHandler(async (req, res) => {
  const paper = await Paper.findById(req.params.id)

  if (!paper) {
    res.status(400)
    throw new Error('Paper not found')
  }

  // Check for user
  if (!req.user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Make sure the logged in user matches the paper user
  if (paper.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
  }

  await paper.remove()

  res.status(200).json({ id: req.params.id })
})

module.exports = {
  getPapers,
  setPaper,
  updatePaper,
  deletePaper,
}