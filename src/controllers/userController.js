import User from "../models/User";
import fetch from "node-fetch";
import bcrypt from "bcrypt";
import { resetWatchers } from "nodemon/lib/monitor/watch";

export const getJoin = (req, res) => {
    return res.render("join", {pageTitle: "Join"});
};

export const postJoin = async (req, res) => {
    const { name, username, email, password, password2, address } = req.body;
    if(password !== password2){
        return res.status(400).render("join",{
            pageTitle: "Join",
            errorMessage: "Please chack your password.",
        });
    }
    const usernameExists = await User.exists({ $or: [{username}, {email}] });
    if(usernameExists){
        return res.status(400).render("join",{
            pageTitle: "Join",
            errorMessage: "This username/email is already use.",
        });
    };
    try{
        await User.create({
            name,
            username,
            email,
            password,
            address,
        });
        return res.redirect("/login");
    } catch (error){
        return res.status(400).render("join", {
            pageTitle: "Join",
            errorMessage: error._message,
        });
    }
};
export const getLogin = (req, res) => res.render("login", {pageTitle: "Login"});
export const postLogin = async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username, socialOnly: false});
    if(!user){
        return res.status(400).render("login", {
            pageTitle: "Login",
            errorMessage: "An account with this username does not exsits."
        });
    };
    const ok = await bcrypt.compare(password, user.password);
    if(!ok){
        return res.status(400).render("login",{
            pageTitle: "Login",
            errorMessage: "Wrong Password"
        });
    };
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};
export const startGithubLogin = (req, res) =>{
    const baseUrl = "https://github.com/login/oauth/authorize";
    const config = {
        client_id: process.env.GH_CLIENT,
        allow_signup: false,
        scope: "read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};
export const finishGithubLogin = async (req, res) => {
    const baseUrl = "https://github.com/login/oauth/access_token";
    const config={
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code,
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    const tokenRequest = await (await fetch(finalUrl,{
        method: "POST",
        headers: {
            Accept: "application/json",
        }
    })
    ).json();
    if("access_token" in tokenRequest){
        const {access_token} = tokenRequest;
        const baseUrl = "https://api.github.com"
        const userData = await (await fetch(`${baseUrl}/user`,{
            headers: {
                Authorization: `token ${access_token}`,
            }
        })
        ).json();
        const emailRequest = await (await fetch(`${baseUrl}/user/emails`,{
            headers: {
                Authorization: `token ${access_token}`,
            }
        })
        ).json();
        const emailObj = emailRequest.find(
            (email) => email.primary === true && email.verified === true
        );
        if(!emailObj){
            return res.redirect("/login");    
        }
        let user = await User.findOne({ email: emailObj.email});
        if(!user){
            user = await User.create({
                name: userData.name,
                username: userData.login,
                avatarUrl: userData.avatar_url,
                socialOnly: true,
                email: emailObj.email,
                password: "",
                address: userData.location,
            });
        }
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
    }else{
        return res.redirect("/login");
    }
};
export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};
export const getEdit = (req, res) => {
    return res.render("editUser", {pageTitle: "Edit User"});
};

export const postEdit = async (req, res) => {
    const { name, username, email, address } = req.body;
    const user = await User.find({ username });
    try{
        User.updateOne({
            name,
            username,
            address,
            email,
        });
        return res.render("editUser", {pageTitle: "Edit User"});
    }catch{}
};


export const remove = (req, res) => res.render("delete-user", {pageTitle: "Delete User"});
export const see = (req, res) => res.render("see-user", {pageTitle: "See User"});

