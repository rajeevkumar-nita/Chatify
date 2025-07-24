// export const host = "http://localhost:5000";
// export const host = "https://chatify-kkpf.onrender.com";
export const host = process.env.REACT_APP_API_HOST;
export const loginRoute = `${host}/api/auth/login`;
export const registerRoute = `${host}/api/auth/register`;
export const logoutRoute = `${host}/api/auth/logout`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;
export const setAvatarRoute = `${host}/api/auth/setavatar`;





export const avatarRoute = `${host}/api/avatar/avatars`;
