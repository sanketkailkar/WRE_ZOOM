import { KJUR } from "jsrsasign";

export function generateVideoSdkApiJwt() {
  const sdkApiKey = process.env.NEXT_PUBLIC_ZOOM_API_KEY;
  const sdkApiSecret = process.env.NEXT_PUBLIC_ZOOM_API_SECRET;
  
  const iat = Math.round((new Date().getTime() - 30000) / 1000);
  const exp = iat + 90 * 60; // 90 minutes expiration
  const oHeader = { alg: 'HS256', typ: 'JWT' };

  const oPayload = {
    iss: sdkApiKey,
    iat: iat,
    exp: exp
  };

  const sHeader = JSON.stringify(oHeader);
  const sPayload = JSON.stringify(oPayload);
  const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkApiSecret);
  return sdkJWT;
}
