import * as fs from 'fs';
import { z } from 'zod';

export interface DatabaseConfig {
  mongodbUri: string;
}

export interface JwtConfig {
  secret: string;
  expiration: string;
}

export interface ImageKitConfig {
  publicKey: string;
  privateKey: string;
  urlEndpoint: string;
  presignedExpire: number;
}

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

export interface ClientConfig {
  url: string;
  authSuccessUrl: string;
}

export interface ACMSConfiguration {
  port: number;
  database: DatabaseConfig;
  jwt: JwtConfig;
  oauth: OAuthConfig;
  imageKit: ImageKitConfig;
  client: ClientConfig;
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

    //   IMAGE-KIT
    IMAGEKIT_PUBLIC_KEY: z.string(),
    IMAGEKIT_PRIVATE_KEY: z.string(),
    IMAGEKIT_URL_ENDPOINT: z.string(),
    IMAGEKIT_URL_PRESIGNED_URL_TTL: z
      .string()
      .transform((val) => parseInt(val, 10)),

    //  Frontend
    CLIENT_URL: z.string(),
    AUTH_SUCCESS_URL: z.string(),
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
    imageKit: {
      publicKey: parsedEnv.IMAGEKIT_PUBLIC_KEY,
      privateKey: parsedEnv.IMAGEKIT_PRIVATE_KEY,
      urlEndpoint: parsedEnv.IMAGEKIT_URL_ENDPOINT,
      presignedExpire: parsedEnv.IMAGEKIT_URL_PRESIGNED_URL_TTL,
    },

    client: {
      url: parsedEnv.CLIENT_URL,
      authSuccessUrl: parsedEnv.AUTH_SUCCESS_URL,
    },
  };
};
