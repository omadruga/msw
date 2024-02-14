export default oauth.githubEventHandler({
  async onSuccess(event, { user }) {
    console.log(user);
    await setUserSession(event, { user });
    return sendRedirect(event, "/");
  },
});
