DROP TABLE IF exists sys_audit_user_created;
DROP TABLE IF exists sys_audit_user_updated;
DROP TABLE IF exists sys_audit_room_created;
DROP TABLE IF exists sys_audit_room_updated;
DROP TABLE IF exists sys_audit;
DROP TABLE IF EXISTS cls_activity_ptcp;
DROP TABLE IF EXISTS cls_activity;
DROP TABLE IF EXISTS cls_room_attd;
DROP TABLE IF EXISTS cls_room;
DROP TABLE IF EXISTS cls_activity_tpl;
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

CREATE TABLE cls_activity_tpl (
  templateid SERIAL NOT NULL PRIMARY KEY,
  content JSONB,
  timestmp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  userid INTEGER NOT NULL,
  FOREIGN KEY (userid) REFERENCES acc_user(userid)
);

CREATE TABLE cls_room_user (
  roomid SERIAL NOT NULL PRIMARY KEY,
  user_type VARCHAR(255) NOT NULL,
  room_time TIME NOT NULL,
  room_day VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  timestmp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  room_userid INTEGER NOT NULL,
  FOREIGN KEY (room_userid) REFERENCES acc_user(userid)
);

CREATE TABLE cls_room_attd (
  attendid SERIAL NOT NULL PRIMARY KEY,
  roomid INTEGER NOT NULL,
  userid INTEGER NOT NULL,
  timestmp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (roomid) REFERENCES cls_room(roomid),
  FOREIGN KEY (userid) REFERENCES acc_user(userid)
);

CREATE TABLE cls_activity (
  activityid SERIAL NOT NULL PRIMARY KEY,
  roomid INTEGER NOT NULL,
  templateid INTEGER NOT NULL,
  timestmp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (roomid) REFERENCES cls_room(roomid),
  FOREIGN KEY (templateid) REFERENCES cls_activity_tpl(templateid)
);

CREATE TABLE cls_activity_ptcp (
  userid INTEGER NOT NULL,
  activityid INTEGER NOT NULL,
  answer JSONB,
  timestmp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (userid, activityid),
  FOREIGN KEY (userid) REFERENCES acc_user(userid),
  FOREIGN KEY (activityid) REFERENCES cls_activity(activityid)
);

CREATE TABLE sys_audit (
  eventid SERIAL NOT NULL,
  event_type VARCHAR(255) NOT NULL,
  userid INTEGER NOT NULL,
  context JSONB,
  timestmp TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (eventid, event_type),
  FOREIGN KEY (userid) REFERENCES acc_user(userid)
) PARTITION BY LIST(event_type);


CREATE TABLE sys_audit_user_created partition OF sys_audit
  FOR VALUES IN ('USER_CREATED');

CREATE TABLE sys_audit_user_updated partition OF sys_audit
  FOR VALUES IN ('USER_UPDATED');

CREATE TABLE sys_audit_room_created partition OF sys_audit
  FOR VALUES IN ('ROOM_CREATED');

CREATE TABLE sys_audit_room_updated partition OF sys_audit
  FOR VALUES IN ('ROOM_UPDATED');
