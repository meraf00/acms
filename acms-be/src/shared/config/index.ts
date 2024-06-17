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

export interface StorageConfig {
  bucketName: string;
  region: string;
  type: 's3' | 'gcs';

  gcs: {
    projectId: string;
    keyFilename: string;
  };

  s3: {
    accessKeyId: string;
    secretAccessKey: string;
    endpoint: string;
  };
}

export interface ACMSConfiguration {
  port: number;
  database: DatabaseConfig;
  jwt: JwtConfig;
  oauth: OAuthConfig;
  imageKit: ImageKitConfig;
  client: ClientConfig;
  storage: StorageConfig;
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

    //   Storage
    STORAGE_BUCKET_NAME: z.string(),
    STORAGE_REGION: z.string(),
    STORAGE_TYPE: z.enum(['s3', 'gcs']),

    STORAGE_GCS_PROJECT_ID: z.string().optional(),
    STORAGE_GCS_KEY_FILENAME: z.string().optional(),

    STORAGE_S3_ACCESS_KEY_ID: z.string().optional(),
    STORAGE_S3_SECRET_ACCESS_KEY: z.string().optional(),
    STORAGE_S3_ENDPOINT: z.string().optional(),
  })
  .required()
  .refine((data) => {
    if (data.STORAGE_TYPE === 'gcs') {
      return data.STORAGE_GCS_PROJECT_ID && data.STORAGE_GCS_KEY_FILENAME;
    }

    if (data.STORAGE_TYPE === 's3') {
      return (
        data.STORAGE_S3_ACCESS_KEY_ID &&
        data.STORAGE_S3_SECRET_ACCESS_KEY &&
        data.STORAGE_S3_ENDPOINT
      );
    }

    return false;
  });

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

    storage: {
      bucketName: parsedEnv.STORAGE_BUCKET_NAME,
      region: parsedEnv.STORAGE_REGION,
      type: parsedEnv.STORAGE_TYPE,

      gcs: {
        projectId: parsedEnv.STORAGE_GCS_PROJECT_ID,
        keyFilename: parsedEnv.STORAGE_GCS_KEY_FILENAME,
      },

      s3: {
        accessKeyId: parsedEnv.STORAGE_S3_ACCESS_KEY_ID,
        secretAccessKey: parsedEnv.STORAGE_S3_SECRET_ACCESS_KEY,
        endpoint: parsedEnv.STORAGE_S3_ENDPOINT,
      },
    },
  };
};
