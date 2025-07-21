-- create the database schema and tables for the eventp API
CREATE SCHEMA IF NOT EXISTS eventp;

CREATE TABLE eventp.user_detail (
    user_detail_id INT NOT NULL,
    user_detail_username VARCHAR(255) NOT NULL,
    user_detail_password VARCHAR(255) NOT NULL,
    user_detail_email VARCHAR(255) NOT NULL,
    CONSTRAINT user_detail_pk PRIMARY KEY (user_detail_id),
    CONSTRAINT user_detail_username_uq UNIQUE (user_detail_username),
    CONSTRAINT user_detail_email_uq UNIQUE (user_detail_email)
);

CREATE TABLE eventp.event_detail (
    event_detail_id INT NOT NULL,
    event_detail_created_by INT NOT NULL,
    event_detail_name VARCHAR(255) NOT NULL,
    event_detail_description TEXT,
    event_detail_date DATE NOT NULL CHECK (
        event_detail_date >= CURRENT_DATE
    ),
    event_detail_time TIME NOT NULL,
    event_detail_location VARCHAR(255),
    event_detail_capacity INT NOT NULL,
    CONSTRAINT event_detail_pk PRIMARY KEY (event_detail_id),
    CONSTRAINT created_by_fk FOREIGN KEY (event_detail_created_by) REFERENCES eventp.user_detail (user_detail_id) ON DELETE CASCADE
);

CREATE TABLE eventp.eventuser (
    event_detail_id INT NOT NULL,
    user_detail_id INT NOT NULL,
    CONSTRAINT pk_eventuser PRIMARY KEY (
        event_detail_id,
        user_detail_id
    ),
    CONSTRAINT fk_eventuser_event FOREIGN KEY (event_detail_id) REFERENCES eventp.event_detail (event_detail_id) ON DELETE CASCADE,
    CONSTRAINT fk_eventuser_user FOREIGN KEY (user_detail_id) REFERENCES eventp.user_detail (user_detail_id) ON DELETE CASCADE
);