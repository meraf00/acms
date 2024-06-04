import * as fs from 'fs';
import { z } from 'zod';

export interface DatabaseConfig {
  mongodbUri: string;
}

export interface JwtConfig {
  secret: string;
  expiration: string;
}

// export interface CloundinaryConfig {
//   name: string;
//   apiKey: string;
//   apiSecret: string;
//   folder: string;
// }

export interface OAuthConfig {
  client_id: string;
  project_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_secret: string;
  redirect_uris: string[];
  javascript_origins: string[];
}

export interface ACMSConfiguration {
  port: number;
  database: DatabaseConfig;
  jwt: JwtConfig;
  oauth: OAuthConfig;
}

const envSchema = z
  .object({
    //   Server
    PORT: z.string().transform((val) => parseInt(val, 10)),

    //   Database
    MONGODB_URI: z.string(),

    //   JWT
    JWT_SECRET: z.string(),
    JWT_EXPIRATION: z.string(),

    //   OAuth
    OAUTH_CLIENT_SECRET_FILEPATH: z.string(),

    //   Cloundinary
    // CLOUDINARY_NAME: z.string(),
    // CLOUDINARY_API_KEY: z.string(),
    // CLOUDINARY_API_SECRET: z.string(),
    // CLOUDINARY_FOLDER: z.string(),
  })
  .required();

export default (): ACMSConfiguration => {
  const env = process.env;

  const parsedEnv = envSchema.parse(env);

  const oauth: { web: OAuthConfig } = JSON.parse(
    fs.readFileSync(parsedEnv.OAUTH_CLIENT_SECRET_FILEPATH).toString(),
  );

  return {
    port: parsedEnv.PORT,
    database: {
      mongodbUri: parsedEnv.MONGODB_URI,
    },
    jwt: {
      secret: parsedEnv.JWT_SECRET,
      expiration: parsedEnv.JWT_EXPIRATION,
    },

    oauth: oauth.web,
    // cloudinary: {
    //   name: parsedEnv.CLOUDINARY_NAME,
    //   apiKey: parsedEnv.CLOUDINARY_API_KEY,
    //   apiSecret: parsedEnv.CLOUDINARY_API_SECRET,
    //   folder: parsedEnv.CLOUDINARY_FOLDER,
    // },
  };
};
