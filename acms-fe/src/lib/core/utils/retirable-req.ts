export type Seconds = number;

export const retirableReq = async (
  req: () => Promise<Response>,
  retries = 3,
  interval: Seconds = 10
) => {
  if (retries <= 0) {
    throw new Error('Retries exhausted');
  }

  try {
    const response = await req();

    return response;
  } catch (error: any) {
    if (
      !window.navigator.onLine &&
      !error.response &&
      error.code === 'ERR_NETWORK'
    ) {
      console.log('No internet connection');
    }
    console.log(error);

    console.log('...Retrying...');

    setTimeout(() => {
      retirableReq(req, retries - 1);
    }, interval * 1000 + Math.random() * 5000);
  }
};
