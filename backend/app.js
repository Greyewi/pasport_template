const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const passport = require('passport')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(
  session({
    secret: 'qvybt7qy42b79vtyq3by',
    store: new FileStore(),
    cookie: {
      path: '/',
      httpOnly: true,
      maxAge: 60 * 60 * 1000
    },
    resave: false,
    saveUninitialized: false
  })
)

require('./config-passport')
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  console.log(req.session)
  res.send('Hello World!')
})

app.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user) {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.send('Укажите правильный email или пароль!')
    }
    req.logIn(user, function(err) {
      if (err) {
        return next(err)
      }
      return res.redirect('/admin')
    })
  })(req, res, next)
})

const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.send('Доступ запрещенн!')
  }
}

app.get('/admin', auth, (req, res) => {
  res.send('Admin page!')
})

app.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

app.get('/auth/google',
  passport.authenticate(
    'google',
    { scope: ['https://www.googleapis.com/auth/plus.login'] }
    )
)

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/admin')
  })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
