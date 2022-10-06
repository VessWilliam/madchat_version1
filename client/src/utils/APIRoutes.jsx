export const host = process.env.REACT_APP_BASE_URL
console.log(process.env.REACT_APP_BASE_URL)

export const registerRoute = `${host}auth/register`; 
export const loginRoute = `${host}auth/login`; 
export const setAvatarRoute = `${host}auth/setavatar`; 
export const allUsersRoute = `${host}auth/allusers`;
export const sendChatMessageRoute =`${host}messages/addMsg`; 
export const getAllMessage = `${host}messages/getMsg`;