INSERT INTO ACC_USER (username, email, secret, firstname, middlename, lastname, dob, gender, type)
VALUES('admin','admin@example.com', '12345', 'admin','a', 'admin', now(), 'M', 'SUP');

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