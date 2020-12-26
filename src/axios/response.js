const errorSwitch = (response) => {
  const data = {...response.data};
  data['message'] = `${data.message}. Error code: [${data.errorCode}].`;
  return data;
};

export const responseFormatter = (axiosPromise) => {
  return new Promise((resolve, reject) => {
    axiosPromise
      .then(response => {        
        resolve(response.data);
      })
      .catch(error => {        
        if (error.response) {          
          reject(errorSwitch(error.response));
        } else {
          
          const response = {
            data: {
              errorCode: 'Network Error',
              message: 'Could not establish connection to server. Please wait for reconnection.'
            },
          };
          reject(errorSwitch(response));
        }        
      })
  });
};