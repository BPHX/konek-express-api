export const RoomTbl = "cls_room";


export const RoomRealCols = {
  id: `roomid`,
  title: `title`,
  description: `description`,
  userid: `userid`,
};

export const RoomCols = {
  id: `${RoomTbl}.roomid`,
  title: `${RoomTbl}.title`,
  description: `${RoomTbl}.description`,
  timestamp: `${RoomTbl}.timestmp`,
  userid: `${RoomTbl}.userid`,
};
