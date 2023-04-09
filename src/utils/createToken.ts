const jwt = require('jsonwebtoken');

export const createToken = (data: any) => {
    const token = jwt.sign(
        data, process.env.SECRET_SESSION_KEY, { expiresIn: '24h' }
    );

    return token;
}