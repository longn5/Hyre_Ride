const User = data => ({
  name: data.displayName,
  email: data.email,
  profilePicture: data.photoURL,
  id: data.uid
});

export default User;
