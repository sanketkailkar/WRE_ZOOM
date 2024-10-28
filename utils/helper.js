export const getStoredSdkJWT = () => {
    const jwt = localStorage.getItem('zoom-sdk-auth');
    return jwt;
}

export const meetingArgs = {
    session: '',
    userId: [],
    userNames: [],
  };