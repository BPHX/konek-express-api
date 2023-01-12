export const UserTbl = "acc_user";
export const UserCols = {
  id: `${UserTbl}.userid`,
  username: `${UserTbl}.username`,
  secret: `${UserTbl}.secret`,
  email: `${UserTbl}.email`,
  firstname: `${UserTbl}.firstname`,
  lastname: `${UserTbl}.lastname`,
  middlename: `${UserTbl}.middlename`,
  dob: `${UserTbl}.dob`,
  gender: `${UserTbl}.gender`,
  timestamp: `${UserTbl}.timestmp`,
  type: `${UserTbl}.type`,
};

export const UserRealCols = {
  id: `userid`,
  username: `username`,
  secret: `secret`,
  email: `email`,
  firstname: `firstname`,
  lastname: `lastname`,
  middlename: `middlename`,
  dob: `dob`,
  gender: `gender`,
  timestamp: `timestmp`,
  type: `type`,
};