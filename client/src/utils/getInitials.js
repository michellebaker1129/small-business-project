// get initials from fullname
export const getInitials = (fullname) => {
  const names = fullname.split(" ");
  let initials = "";
  names.forEach((name) => {
    initials += name.charAt(0);
  });
  return initials.toUpperCase();
};
