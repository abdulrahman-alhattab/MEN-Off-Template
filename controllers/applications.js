const express = require('express')
const router = express.Router()
const applications = require('../models/applications')

router.get('/', async (req, res) => {
  try {
    const Applications = await applications.find().populate('owner')
  res.render('applications/index.ejs', { applications })
  } catch (error) {
    console.error(error)
  }
})
router.get('/new', async (req,params) => {
try {
res.render('apps/new.ejs')
} catch (err) {
console.error(err)
}
})
module.exports = router
