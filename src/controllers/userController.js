export const joinPage = (req, res) => res.render("join", {pageTitle: "Join"});
export const edit = (req, res) => res.render("edit-user", {pageTitle: "Edit User"});
export const remove = (req, res) => res.render("delete-user", {pageTitle: "Delete User"});
export const login = (req, res) => res.render("login", {pageTitle: "Login"});
export const see = (req, res) => res.render("see-user", {pageTitle: "See User"});
export const logout = (req, res) => res.render("logout", {pageTitle: "Logout"});

