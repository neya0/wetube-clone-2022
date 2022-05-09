export const homepage = (req, res) => res.render("home", {pageTitle: "Home"});
export const watch = (req, res) => res.render("watch", {pageTitle: "Watching Viedo"});
export const edit = (req, res) => res.send("Edit Video Page");
export const remove = (req, res) => res.send("Delete Video Page");
export const search = (req, res) => res.send("Searching Video Page");
export const upload = (req, res) => res.send("Upload Video Page");