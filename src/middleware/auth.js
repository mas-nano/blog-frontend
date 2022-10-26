export default function auth({ next, router }) {
  if (!localStorage.getItem("AUTH_TOKEN")) {
    return router.push({ name: "auth.login" });
  }
  return next();
}
