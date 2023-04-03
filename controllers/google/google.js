const queryString = require("query-string");

const redirect = "http://localhost:3000/auth/google-redirect";

exports.google = async (req, res) => {
    const string = queryString.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: redirect,
        scope: [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" "),
        response_type:'code',
        access_type: 'offline',
        prompt: 'consent',
    });

    return res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${string}`)
};

