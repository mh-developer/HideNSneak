const userToUserDto = from => {
  return {
    id: from._id,
    name: from.name,
    lastname: from.lastname,
    email: from.email
  };
};

const userDtoToUser = from => {
  return {
    _id: from.id,
    ...from
  };
};

module.exports = {
  userToUserDto,
  userDtoToUser
};
