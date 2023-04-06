const queryString = require("query-string");

exports.google = async (req, res) => {
    const string = queryString.stringify({
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: process.env.REDIRECT,
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

