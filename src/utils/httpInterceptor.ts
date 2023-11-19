import User from "../models/Users/user.schema";

export const httpInterceptor = async (token?: string, isMobile?: boolean) => {
    
    let user;
    if(isMobile) {
        user = await User.findOne({token: token});
    } else {
        user = await User.findOne({tokenNonMobile: token});
    }

    if(!!user) 
        return 200;
    else 
        return 401;
    
}