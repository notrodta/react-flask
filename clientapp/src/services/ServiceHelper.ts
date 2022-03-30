export const handleError = (error: any) => {
  if (error.response.status === 401) {
    console.log('redirect to access denied page');
  } else if (error.response.error === 403 || error.response.status === 500) {
    console.log('redirect to error page');
    //write some error msg on error page to help debug
  } else {
    throw error;
  }
};
