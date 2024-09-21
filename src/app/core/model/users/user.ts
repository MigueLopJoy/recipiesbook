export interface User extends UserData {
    id: string,
}
export interface UserData {
    uid: string,
    firstname: string,
    lastname: string,
    userName: string,
    email: string,
    favorites: string[]
}