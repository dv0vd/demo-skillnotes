const userService = require("../../services/userService");
const { getBasePath, getSIDCookieName } = require("../../utils");

async function dashboard(req, res) {
  if (!userService.isAuthenticated(req)) {
    return res.clearCookie(getSIDCookieName()).redirect(getBasePath());
  }

  res.render("dashboard", { user: req.user });
}

async function index(req, res) {
  if (userService.isAuthenticated(req)) {
    return res.redirect(getBasePath() + "dashboard");
  }

  res.render("index", { user: req.user, basePath: getBasePath() });
}

async function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const user = await userService.isRegistered(username);

  if (!user || !userService.checkPassword(password, user.password)) {
    return res.render("index", { authError: "Неверный логин или пароль", basePath: getBasePath() });
  }

  const sessionId = await userService.createSession(user.id);

  return res.cookie(getSIDCookieName(), sessionId, { httpOnly: true }).redirect(getBasePath());
}

async function logout(req, res) {
  const sessionId = req.cookies[getSIDCookieName()];

  if (sessionId) {
    await userService.deleteSession(sessionId);
  }

  return res.clearCookie(getSIDCookieName()).redirect(getBasePath());
}

async function signup(req, res) {
  const username = req.body.username;
  const isRegistered = await userService.isRegistered(username);

  if (isRegistered) {
    return res.render("index", {
      authError: `Пользователь '${username}' уже зарегистрирован`,
      basePath: getBasePath(),
    });
  }

  const user = await userService.register(username, req.body.password);
  const sessionId = await userService.createSession(user.id);

  return res.cookie(getSIDCookieName(), sessionId, { httpOnly: true }).redirect(getBasePath());
}

module.exports = {
  dashboard,
  index,
  login,
  logout,
  signup,
};
