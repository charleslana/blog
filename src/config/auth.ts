export default {
    jwt: {
        secret: process.env.APP_TOKEN_SECRET_KEY as string,
        expiresIn: '1d'
    }
}