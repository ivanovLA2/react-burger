export default interface AuthResponse {
  success: boolean,
  accessToken: string,
  refreshToken: string
}


export interface UserInfo {
  email: string,
  name: string
}
