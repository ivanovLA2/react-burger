export default interface UserResponse {
  success: boolean
  user: UserInfo
}

export interface UserInfo {
  name: string,
  email: string
}