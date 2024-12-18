function index(req, res) {
    res.render("home/index.ejs", { user: req.session.user });
}

module.exports = { index }



// function index(req, res) {
//     res.render('home', { title: 'Home Page' })
// }