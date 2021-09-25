export default function success(data: any) {
  return {
    user: data.user,
    token: data.token,
  };
}
