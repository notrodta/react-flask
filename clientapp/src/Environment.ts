export interface IEnvironment {
  Env: string;
  SiteUrl: string;
}

export const GetEnvironment = (): string => {
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

const EnvironmentConfig = (): IEnvironment => {
  const config: IEnvironment = {
    Env: GetEnvironment(),
    SiteUrl: window.location.origin.toLowerCase()
  };
  return config;
};

export default EnvironmentConfig();
