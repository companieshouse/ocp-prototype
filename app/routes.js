const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line
router.get('/', function (req, res) {
  req.session.destroy()
  res.render('index', {
  })
})

// Sign in
router.get('/sign-in', function (req, res) {
  res.render('sign-in', {
  })
})

router.post('/sign-in', function (req, res) {
  var errors = []
  var emailHasError = false
  var passwordHasError = false

  if (req.session.data['email'] === '') {
    emailHasError = true
    errors.push({
      text: 'Enter your email address',
      href: '#email-error'
    })
  }
  if (req.session.data['password'] === '') {
    passwordHasError = true
    errors.push({
      text: 'Enter your password',
      href: '#password-error'
    })
  }

  if (emailHasError || passwordHasError) {
    res.render('sign-in', {
      errorEmail: emailHasError,
      errorPassword: passwordHasError,
      errorList: errors
    })
  } else {
    res.redirect('company-number')
  }
})

// Company number
router.get('/company-number', function (req, res) {
  res.render('company-number', {
  })
})

router.post('/company-number', function (req, res) {
  var errors = []
  var str = req.session.data['company-number']
  var n = str.length

  if (req.session.data['company-number'] === '') {
    errors.push({
      text: 'Enter the company number',
      href: '#company-number'
    })
    res.render('company-number', {
      errorNum: true,
      errorList: errors
    })
  } else if (n !== 8) {
    errors.push({
      text: 'Company number must be 8 characters ',
      href: '#company-number'
    })
    res.render('company-number', {
      errorNum: true,
      errorList: errors
    })
  } else {
    res.redirect('confirm-company')
  }
})

// Auth
router.get('/auth-screen', function (req, res) {
  res.render('auth-screen', {
  })
})

router.post('/auth-screen', function (req, res) {
  var errors = []
  if (req.session.data['authNumber'] === '') {
    errors.push({
      text: 'Enter the company authentication code',
      href: '#auth-number'
    })
    res.render('auth-screen', {
      errorAuth: true,
      errorList: errors
    })
  } else {
    res.redirect('view-correspondence')
  }
})

module.exports = router
