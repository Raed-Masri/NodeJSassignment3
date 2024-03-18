export interface IUser {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    isVip?:  boolean;   
    isAdmin?:  boolean;  
}

export interface IUserLogin{
    email: string;
    password: string;
}