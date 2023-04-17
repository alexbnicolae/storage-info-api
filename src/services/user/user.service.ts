import User from "../../models/Users/user.schema";

export const getUserService = async (token: string) => {
    try {
        const user = await User.findOne({token: token});

        return user;
    } catch (error) {
        return 400;
    }
}

export const editUserService = async (data: any, token: string) => {
    try {
        const user = await User.findOne({token: token});

        if(!!user)
            await User.findOneAndUpdate({token: token}, data)

        return 200;
    } catch (error) {
        return 400;
    }
}