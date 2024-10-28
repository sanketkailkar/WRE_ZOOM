export const ROUTES = {
    CREATE_API: 'https://api.zoom.us/v2/videosdk/sessions',
    GET_ALL_SESSIONS: 'https://api.zoom.us/v2/videosdk/sessions',
    DELETE_SESSIONS: 'https://api.zoom.us/v2/videosdk/sessions'
}

export const getStoredSdkJWT = () => {
    const jwt = localStorage.getItem('zoom-sdk-auth');
    return jwt;
}

export const meetingArgs = {
    session: '',
    userId: [],
    userNames: [],
  };