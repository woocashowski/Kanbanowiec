function Get() {
    if (window.localStorage.User) {
      let user = JSON.parse(window.localStorage.User);
      if (user.email !== "" && user.token !== "") {
        return user;
      }
    }
    return null;
  
}
function Set(email, token) {
    window.localStorage.setItem("User", JSON.stringify({ email, token }));
}
function Clear() {
    Set("","");
}
export default {Get,Set,Clear};