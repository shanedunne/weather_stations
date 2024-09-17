import { userStore } from "../models/user-store.js";

export const accountsController = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup",
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to your account",
    };
    response.render("login-view", viewData);
  },

  logout(request, response) {
    response.cookie("user", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Signup for an account",
    };
    response.render("signup-view", viewData);
  },

  async register(request, response) {
    const user = request.body;
    await userStore.addUser(user);
    console.log(`registering ${user.email}`);
    response.redirect("/");
  },

  async authenticate(request, response) {
    const user = await userStore.getUserByEmail(request.body.email);
    if (user) {
      response.cookie("user", user._id);
      console.log(`logging in ${user.email}`);
      response.redirect("/dashboard");
    } else {
      response.redirect("/login");
    }
  },

  async getLoggedInUser(request) {
    const userId = request.cookies.user;
    return await userStore.getUserById(userId);
  },

  async getAccountInfo(request, response) {
    const user = await accountsController.getLoggedInUser(request);

    const viewData = {
      title: "Account Information",
      user: user,
    };
    response.render("account-view", viewData);
  },

  async accountEditor(request, response) {
    const user = await accountsController.getLoggedInUser(request);
    const userId = user._id;

    console.log(userId + "is logged in")

    const viewData = {
      title: "Edit Account Information",
      user: user,
    };
    response.render("edit-account-view", viewData);
  },

  async updateAccount(request, response) {
    const userId = request.params.userid;
    const updatedAccount = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
    };
    console.log(`Updating user ${userId}`);
    await userStore.updateUser(userId, updatedAccount);
    response.redirect("/account")
  },
};
