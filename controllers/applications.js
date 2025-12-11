const express = require('express')
const router = express.Router()
const Applications = require('../models/applications')

router.get('/', async (req, res) => {
  try {
    const applications = await Applications.find().populate('owner')
    res.render('apps/index.ejs', { applications })
  } catch (error) {
    console.error(error)
  }
})
router.get('/new', async (req, params) => {
  try {
    res.render('../views/apps/new.ejs')
  } catch (err) {
    console.error(err)
  }
})
module.exports = router
