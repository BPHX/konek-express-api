DROP TABLE IF EXISTS acc_user;
DROP TABLE IF EXISTS acc_role;
DROP TABLE IF EXISTS acc_permission;
DROP TABLE IF EXISTS acc_userrole;
DROP TABLE IF EXISTS acc_rolepermission;

CREATE TABLE acc_user(
	userid MEDIUMINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    secret VARCHAR(300) NOT NULL,
    email VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
	middlename VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(25) NOT NULL,
    timestmp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT acc_user_pk PRIMARY KEY (userid),
    CONSTRAINT acc_user_uk1 UNIQUE KEY (username),
    CONSTRAINT acc_user_uk2 UNIQUE KEY (email)
);

CREATE TABLE acc_role (
	roleid MEDIUMINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    enabled BOOLEAN DEFAULT TRUE,
    assignable BOOLEAN DEFAULT TRUE,
    timestmp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT acc_role_pk PRIMARY KEY (roleid),
    CONSTRAINT acc_role_uk UNIQUE KEY (name)
);

CREATE TABLE acc_userrole (
	userroleid MEDIUMINT NOT NULL AUTO_INCREMENT,
    userid MEDIUMINT NOT NULL,
    roleid MEDIUMINT NOT NULL,
    timestmp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT acc_userrole_pk PRIMARY KEY (userroleid),
    CONSTRAINT acc_userrole_uk UNIQUE KEY (userid, roleid)
);

CREATE TABLE acc_permission (
	permissionid MEDIUMINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    CONSTRAINT acc_permission_pk PRIMARY KEY (permissionid),
    CONSTRAINT acc_permission_uk UNIQUE KEY (name)
);

CREATE TABLE acc_rolepermission (
	permissionid MEDIUMINT NOT NULL AUTO_INCREMENT,
	roleid MEDIUMINT NOT NULL,
    timestmp TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT acc_rolepermission_pk PRIMARY KEY (permissionid, roleid)
);

SELECT * FROM ACC_USER;

INSERT INTO ACC_USER (username, email, secret, firstname, middlename, lastname, dob, gender)
VALUES('admin2','admin2@example.com', '12345', 'admin2','a2', 'admin2', now(), 'M');

INSERT INTO ACC_ROLE (name, description, assignable)
VALUES ('Super Admin', 'Konek Super Administrator', FALSE);

INSERT INTO ACC_ROLE (name, description)
VALUES
	('Admin', 'Administrator'),
	('Teacher', 'Teacher'),
	('Student', 'Student')
;

SELECT * FROM ACC_ROLE;
-- SELECT * FROM ACC_USER WHERE CONVERT(userid,char) = '1';
