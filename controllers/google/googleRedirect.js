const queryString = require("query-string");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../../models/user");
const { nanoid } = require("nanoid");

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
            redirect_uri: process.env.REDIRECT,
            grant_type: 'authorization_code',
            code,
        }
    });

    const userData = await axios({
        url: "https://www.googleapis.com/oauth2/v2/userinfo",
        method: 'get',
        headers: { Authorization: `Bearer ${googleToken.data.access_token}` }
    });
 

    const googleAuth = async () => {
        const {email}=userData.data

    const user = await User.findOne({ email });
        if (!user) {
            const password = await bcrypt.hash(nanoid(), 10);
            const defaultAvatar = "https://res.cloudinary.com/do316uvkf/image/upload/v1680493837/szccttwukvqfijjovgz5.jpg";
        
            const newUser = await User.create({
                name: userData.data.name,
                email,
                password,
                avatar: defaultAvatar,
            });
            
            newUser.token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: "24h" });
            return res.redirect(`https://4106677.github.io/so-yummy-front-end/main?token=${newUser.token}`)
        } else {
            const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "24h" });
            await User.findByIdAndUpdate(user._id, { token });
            return res.redirect(`https://4106677.github.io/so-yummy-front-end/main?token=${token}`)
        }
    };

    googleAuth()
};