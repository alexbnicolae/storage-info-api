import User from "../models/Users/user.schema";

export const httpInterceptor = async (token?: string) => {
    
    let user = await User.findOne({token: token});

    if(!!user) 
        return 200;
    else 
        return 401;
    
}