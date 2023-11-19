import User from "../../models/Users/user.schema";

export const getUserService = async (token: string, isMobile: boolean) => {
    try {
        let user;
        if(isMobile)
            user = await User.findOne({token: token});
        else    
            user = await User.findOne({tokenNonMobile: token});

        if(user === null) return 400;

        return user;
    } catch (error) {
        return 400;
    }
}

export const editUserService = async (data: any, token: string, isMobile: boolean) => {
    try {
        let user;
        if(isMobile)
            user = await User.findOne({token: token});
        else    
            user = await User.findOne({tokenNonMobile: token});

        if(user === null) return 400;

        if(!!user) {
            if(isMobile)
                await User.findOneAndUpdate({token: token}, data);
            else
                await User.findOneAndUpdate({tokenNonMobile: token}, data);
        }

        return 200;
    } catch (error) {
        return 400;
    }
}