export const RoomTbl = "cls_room";


export const RoomRealCols = {
  id: `roomid`,
  start: `start_time`,
  end: `end_time`,
  day: `room_day`,
  title: `title`,
  description: `description`,
  timestamp: `timestmp`,
  room_userid: `room_userid`,
};

export const RoomCols = {
  id: `${RoomTbl}.roomid`,
  start: `${RoomTbl}.start_time`,
  end: `${RoomTbl}.end_time`,
  day: `${RoomTbl}.room_day`,
  title: `${RoomTbl}.title`,
  description: `${RoomTbl}.description`,
  timestamp: `${RoomTbl}.timestmp`,
  room_userid: `${RoomTbl}.room_userid`,
};
