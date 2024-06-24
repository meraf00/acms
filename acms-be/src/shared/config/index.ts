import * as fs from 'fs';
import { z } from 'zod';

export interface DatabaseConfig {
  mongodbUri: string;
}

export interface JwtConfig {
  secret: string;
  expiration: string;
  expirationMs: number;
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

  presignedUrlTTL: number;
}

export interface CodeforcesConfig {
  handle: string;
  apiKey: string;
  secret: string;
}

export interface ACMSConfiguration {
  port: number;
  database: DatabaseConfig;
  jwt: JwtConfig;
  oauth: OAuthConfig;
  client: ClientConfig;
  storage: StorageConfig;
  codeforces: CodeforcesConfig;
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
    COOKIE_MAX_AGE: z.string().transform((val) => parseInt(val, 10)),

    //   OAuth
    OAUTH_CLIENT_SECRET_FILEPATH: z.string(),

    //  Frontend
    CLIENT_URL: z.string(),
    AUTH_SUCCESS_URL: z.string(),

    //   Storage
    STORAGE_BUCKET_NAME: z.string(),
    STORAGE_TYPE: z.enum(['s3', 'gcs']),

    STORAGE_GCS_PROJECT_ID: z.string().optional().default(''),
    STORAGE_GCS_KEY_FILENAME: z.string().optional().default(''),

    STORAGE_S3_ACCESS_KEY_ID: z.string().optional().default(''),
    STORAGE_S3_SECRET_ACCESS_KEY: z.string().optional().default(''),
    STORAGE_S3_ENDPOINT: z.string().optional().default(''),

    STORAGE_PRESIGNED_URL_TTL: z.string().transform((val) => parseInt(val, 10)),

    //  Codeforces
    CODEFORCES_HANDLE: z.string(),
    CODEFORCES_API_KEY: z.string(),
    CODEFORCES_API_SECRET: z.string(),
  })
  .required()
  .superRefine((data, ctx) => {
    if (data.STORAGE_TYPE === 'gcs') {
      const valid =
        data.STORAGE_GCS_PROJECT_ID && data.STORAGE_GCS_KEY_FILENAME;

      if (!valid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'STORAGE_GCS_PROJECT_ID and STORAGE_GCS_KEY_FILENAME are required for `gcs` STORAGE_TYPE!',
        });
      }

      return valid;
    }

    if (data.STORAGE_TYPE === 's3') {
      const valid =
        data.STORAGE_S3_ACCESS_KEY_ID &&
        data.STORAGE_S3_SECRET_ACCESS_KEY &&
        data.STORAGE_S3_ENDPOINT;

      if (!valid) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            'STORAGE_S3_ACCESS_KEY_ID, STORAGE_S3_SECRET_ACCESS_KEY, and STORAGE_S3_ENDPOINT are required for `s3` STORAGE_TYPE!',
        });
      }

      return valid;
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
      expirationMs: parsedEnv.COOKIE_MAX_AGE,
    },

    oauth: oauth.web,

    client: {
      url: parsedEnv.CLIENT_URL,
      authSuccessUrl: parsedEnv.AUTH_SUCCESS_URL,
    },

    storage: {
      bucketName: parsedEnv.STORAGE_BUCKET_NAME,
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

      presignedUrlTTL: parsedEnv.STORAGE_PRESIGNED_URL_TTL,
    },

    codeforces: {
      handle: parsedEnv.CODEFORCES_HANDLE,
      apiKey: parsedEnv.CODEFORCES_API_KEY,
      secret: parsedEnv.CODEFORCES_API_SECRET,
    },
  };
};
