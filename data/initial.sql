INSERT INTO ACC_USER (username, email, secret, firstname, middlename, lastname, dob, gender, type)
VALUES('admin','admin@example.com', 'YmU2MDQ3YmZkNDljNGQ0MzIxYWMyNjRiYWYzYjQ2MDE=', 'admin','a', 'admin', now(), 'M', 'SUP');

INSERT INTO ACC_ROLE (name, description)
VALUES
	('Admin', 'Administrator'),
	('Teacher', 'Teacher'),
	('Student', 'Student')
;

INSERT INTO ACC_PERMISSION (permissionid, description)
VALUES 
  ('user:create', 'Allow user to create new user'),
  ('role:create', 'Allow user to create new user'),
  ('role:permission:update', 'Allow user to update role permissions'),
  ('activity:create', 'Allow user to create new activity'),
  ('audit:view', 'Allow user to view audit logs')
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
