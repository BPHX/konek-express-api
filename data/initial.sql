INSERT INTO ACC_USER (username, email, secret, firstname, middlename, lastname, dob, gender, type)
VALUES
  ('admin','admin@example.com', 'YmU2MDQ3YmZkNDljNGQ0MzIxYWMyNjRiYWYzYjQ2MDE=', 'admin','a', 'admin', now(), 'M', 'SUP'),
  ('student', 'student@gmail.com', 'YmU2MDQ3YmZkNDljNGQ0MzIxYWMyNjRiYWYzYjQ2MDE=', 'JC', 'p', 'Ancajas', '2023-01-04', 'M', 'USR'),
  ('jude', 'jude@gmail.com', 'YmU2MDQ3YmZkNDljNGQ0MzIxYWMyNjRiYWYzYjQ2MDE', 'Jude', 'De', 'Bautista', '1981-01-19', 'F', 'USR')
  ;

INSERT INTO ACC_ROLE (name, description)
VALUES
	('Admin', 'Administrator'),
	('Teacher', 'Teacher'),
	('Student', 'Student'),
  ('Registrar', 'Kahit ano')
;

INSERT INTO ACC_PERMISSION (permissionid, description)
VALUES 
  ('user:create', 'Allow user to create new user'),
  ('user:update', 'Allow user to update user'),
  ('user:permission:update', 'Allow user to update user permissions'),
  ('room:create', 'Allow user to create a room'),
  ('room:join', 'Allow user to join call session'),
  ('activity:create', 'Allow user to create new activity'),
  ('activity:join', 'Allow user to join room activity'),
  ('audit:view', 'Allow user to view audit logs')
;

INSERT INTO ACC_USERROLE (userid, roleid)
VALUES (1, 1), (1, 2), (2, 3)
;


INSERT INTO ACC_ROLEPERMISSION(roleid, permissionid)
SELECT 1, permissionid FROM acc_permission;

INSERT INTO ACC_ROLEPERMISSION(roleid, permissionid)
VALUES 
  (2, 'user:create'),
  (4, 'user:create'),
  (4, 'role:create'),
  (4, 'activity:create')
;

INSERT INTO CLS_ACTIVITY_TPL(userid, title, content)
VALUES (1, 'integers', '{"content": "content"}');

INSERT INTO CLS_ROOM (start_time, end_time, room_day, title, description, room_userid)
VALUES ('13:00:00', '15:00:00', 'Monday', 'Algebra 101', 'Introductory course on algebra', 1);

INSERT INTO CLS_ROOM_USR (userid, roomid)
VALUES (1, 1);

INSERT INTO CLS_ROOM_ATTD(roomid, userid)
VALUES (1, 1);

INSERT INTO CLS_ACTIVITY(roomid, templateid)
VALUES (1, 1);

INSERT INTO CLS_ACTIVITY_PTCP(userid, activityid, answer)
VALUES (1, 1, '{"answer1": 54}');
