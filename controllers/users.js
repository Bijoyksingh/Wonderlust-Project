const User = require("../models/user.js");

module.exports.renderSignUpForm = (req, res) => {
    res.render("./users/signup.ejs");
  };

module.exports.signUp = async (req, res) => {
    try {
      let { username, email, password } = req.body;
      console.log(password);
      const newUser = new User({ email, username });
      const registeredUser = await User.register(newUser, password);
      req.login(registeredUser, (err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "Welcome to WonderLust");
        res.redirect("/listings");
      });
    } catch (e) {
      req.flash("error", e.message);
      res.redirect("/signup");
    };
  };

  module.exports.renderLoginForm = (req,res)=>{
    res.render("./users/login.ejs");
};

module.exports.logIn = (req, res) => {
    req.flash("success", "Welcomeback to WonderLust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
  };

  module.exports.logOut = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
        return next(err);
        }
        req.flash("success", "You're logged out successfully");
         res.redirect("/listings");
    });
};