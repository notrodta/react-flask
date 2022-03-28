export interface IEnvironment {
  Env: string;
  SiteUrl: string;
}

export const getEnvironment = (): string => {
  const origin = window.location.origin.toLowerCase();

  //flask localhost: http://127.0.0.1:5000/
  if (origin.indexOf(':5000') >= 0) {
    return 'LOCAL';
  }

  if (origin.indexOf('localhost') >= 0) {
    return 'LOCAL';
  }

  if (origin.indexOf('dev.') >= 0) {
    return 'DEV';
  }
  if (origin.indexOf('test.') >= 0) {
    return 'UAT';
  }
  return 'PROD';
};

const environmentConfig = (): IEnvironment => {
  const config: IEnvironment = {
    Env: getEnvironment(),
    // SiteUrl: window.location.origin.toLowerCase()
    SiteUrl: 'http://127.0.0.1:5000'
  };
  return config;
};

export default environmentConfig();
