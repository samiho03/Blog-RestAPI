const {
    PORT, 
    CONNECTION_URL, 
    JWT_SECRET, 
    SENDER_EMAIL, 
    EMAIL_PASSWORD, 
    AWS_ACCES_KEY ,
    AWS_SECRET_ACCESS_KEY ,
    AWS_BUCKET_NAME, 
    AWS_REGION  
} = process.env;

module.exports = {
    port: PORT,
    connectionUrl: CONNECTION_URL,
    jwtSecret: JWT_SECRET, 
    senderEmail: SENDER_EMAIL,
    emailPassword: EMAIL_PASSWORD,
    awsAccessKey : AWS_ACCES_KEY,
    awsSecretAcessKey: AWS_SECRET_ACCESS_KEY,
    awsBucketName: AWS_BUCKET_NAME,
    awsRegion: AWS_REGION
}; 
