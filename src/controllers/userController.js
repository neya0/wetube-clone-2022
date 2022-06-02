import User from "../models/User";
import bcrypt from "bcrypt";

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
    const user = await User.findOne({username});
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
}

export const edit = (req, res) => res.render("edit-user", {pageTitle: "Edit User"});
export const remove = (req, res) => res.render("delete-user", {pageTitle: "Delete User"});
export const see = (req, res) => res.render("see-user", {pageTitle: "See User"});
export const logout = (req, res) => res.render("logout", {pageTitle: "Logout"});

