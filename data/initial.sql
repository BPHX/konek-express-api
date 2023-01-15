INSERT INTO ACC_USER (username, email, secret, firstname, middlename, lastname, dob, gender, type)
VALUES('admin','admin@example.com', 'e10adc3949ba59abbe56e057f20f883e', 'admin','a', 'admin', now(), 'M', 'SUP');

INSERT INTO ACC_ROLE (name, description)
VALUES
	('Admin', 'Administrator'),
	('Teacher', 'Teacher'),
	('Student', 'Student')
;

INSERT INTO ACC_PERMISSION (permissionid, description)
VALUES 
  ('user:create', 'Allow user to create new user'),
  ('user:update', 'Allow user to update user'),
  ('user:permission:update', 'Allow user to update user permissions')
;

INSERT INTO ACC_USERROLE (userid, roleid)
VALUES (1, 1)
;

INSERT INTO ACC_USERROLE (userid, roleid)
VALUES (1, 2)
;

INSERT INTO ACC_ROLEPERMISSION(roleid, permissionid)
SELECT 1, permissionid FROM acc_permission;

INSERT INTO ACC_ROLEPERMISSION(roleid, permissionid)
VALUES (2, 'user:create');

INSERT INTO CLS_ACTIVITY_TPL(userid, content)
VALUES (1, '{"content": "content"}');

INSERT INTO CLS_ROOM(userid, title, description)
VALUES (1, 'mathematics', 'A subject that is invented to hurt our brain');

INSERT INTO CLS_ROOM_ATTD(roomid, userid)
VALUES (1, 1);

INSERT INTO CLS_ACTIVITY(roomid, templateid)
VALUES (1, 1);

INSERT INTO CLS_ACTIVITY_PTCP(userid, activityid, answer)
VALUES (1, 1, '{"answer1": 54}');
