const queryString = require("query-string");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { User } = require("../../models/user");

const redirect = "http://localhost:3000/auth/google-redirect";

exports.googleRedirect = async (req, res) => {
    const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
    const url = new URL(fullUrl);
    const urlParams = queryString.parse(url.search);
    const code = urlParams.code;

    const googleToken = await axios({
        url: "https://oauth2.googleapis.com/token",
        method: 'post',
        data: {
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: redirect,
            grant_type: 'authorization_code',
            code,
        }
    });

    const userData = await axios({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        method: 'get',
        headers: { Authorization: `Bearer ${googleToken.data.access_token}` }
    });
    const {email}=userData.data

    const user = await User.findOne({ email });
    
    const googleRegister = async () => {
        await axios({
            url: "http://localhost:3000/auth/register",
            method: 'post',
            data: {
                name: userData.data.name,
                email: userData.data.email,
                password: userData.data.id,
            }
        })
    };

      const googleLogin = async() => {
        await axios({
            url: "http://localhost:3000/auth/login",
            method: 'get',
            data: {
                email: userData.data.email,
                password: userData.data.id,
            }
        })
    };

    if (user) {
        googleLogin()
    } else {
        googleRegister()
        googleLogin()
    }

    return res.redirect(`http://localhost:3000?email=${userData.data}`)
};