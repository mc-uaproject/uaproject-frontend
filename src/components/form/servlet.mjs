import express from 'express';
import session from 'express-session';
import passport from 'passport';
import {Strategy as DiscordStrategy} from 'passport-discord';
import dotenv from 'dotenv';
import {handler as ssrHandler} from '../../../dist/server/entry.mjs';

dotenv.config();

const app = express();

passport.use(new DiscordStrategy({
    clientID: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    callbackURL: process.env.DISCORD_REDIRECT_URI,
    scope: ['identify']
}, (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
}));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));

app.use(session({
    secret: process.env.SECRET_KEY, // Use the secret from .env
    resave: false, saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/login', passport.authenticate('discord'));

app.get('/auth/callback', passport.authenticate('discord', {failureRedirect: '/'}), (request, response) => {
    console.log('User authenticated:', request.user.username);
    response.redirect('/form');
});

app.post('/submit', express.urlencoded({extended: true}), (request, response) => {
    if (!request.isAuthenticated()) {
        return response.status(401).send('You must be logged in to submit this form.');
    }
    response.send('Form submitted successfully!');
});

app.get('/api/session/', (req, res) => {
    console.log('Session:', req.isAuthenticated() ? req.user.username : 'anonymous');
    res.json({user: req.isAuthenticated() ? req.user : null});
});

app.use("/", express.static('dist/client/'));
app.use(ssrHandler);

// Start the server
const PORT = process.env.PORT || 4321;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Press Ctrl+C to stop the server`);
});
