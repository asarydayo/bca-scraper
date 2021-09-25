export default function user(data: any) {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    last_login: data.last_login,
  };
}
