DROP TABLE IF EXISTS sys_config;
DROP TABLE IF EXISTS acc_userrole;
DROP TABLE IF EXISTS acc_rolepermission;
DROP TABLE IF EXISTS acc_user;
DROP TABLE IF EXISTS acc_role;
DROP TABLE IF EXISTS acc_permission;

CREATE TABLE sys_config (
  cfgid SERIAL NOT NULL PRIMARY KEY,
  value JSONB NOT NULL,
  timestmp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE acc_user(
	userid SERIAL NOT NULL,
    username VARCHAR(30) NOT NULL,
    secret VARCHAR(300) NOT NULL,
    email VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
	middlename VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(25) NOT NULL,
    type VARCHAR(3) NOT NULL DEFAULT 'USR',
    timestmp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (userid),
    UNIQUE (username),
    UNIQUE (email)
);

CREATE TABLE acc_role (
	roleid SERIAL NOT NULL,
    name VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    enabled BOOLEAN DEFAULT TRUE,
    timestmp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (roleid),
    UNIQUE (name)
);

CREATE TABLE acc_userrole (
	userroleid SERIAL NOT NULL,
    userid INTEGER NOT NULL,
    roleid INTEGER NOT NULL,
    timestmp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (userroleid),
    UNIQUE (userid, roleid),
    FOREIGN KEY (userid) REFERENCES acc_user(userid),
    FOREIGN KEY (roleid) REFERENCES acc_role(roleid)
);

CREATE TABLE acc_permission (
	permissionid VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    PRIMARY KEY (permissionid)
);

CREATE TABLE acc_rolepermission (
	permissionid VARCHAR(255) NOT NULL,
	roleid INTEGER NOT NULL,
    timestmp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (permissionid, roleid),
    FOREIGN KEY (roleid) REFERENCES acc_role(roleid)
);