import dotenv from 'dotenv';
dotenv.config()
const config = {
    cloud_name : process.env.CLOUDNAME,
    api_key : process.env.APIKEY,
    api_secret : process.env.APISECRET,
    url_mongodb : process.env.URLMONGODB,
    secret_jwt : process.env.SECRETJWT,
    user_google: process.env.USEREMAELGOOGLE,
    password_email:process.env.PASSGOOGLEEMAIL
}
export default config;