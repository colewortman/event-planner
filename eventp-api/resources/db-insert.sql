-- insert fake data for events to test
INSERT INTO
    eventp.event_detail (
        event_detail_id,
        event_detail_name,
        event_detail_description,
        event_detail_date,
        event_detail_time,
        event_detail_location,
        event_detail_capacity
    )
VALUES (
        1,
        'Tech Conference 2023',
        'Annual tech conference focusing on AI and ML.',
        '2023-10-15',
        '09:00:00',
        'Convention Center',
        500
    ),
    (
        2,
        'Music Festival',
        'A weekend of music and fun with various artists.',
        '2023-11-05',
        '12:00:00',
        'City Park',
        1000
    ),
    (
        3,
        'Art Exhibition',
        'Showcasing local artists and their works.',
        '2023-12-01',
        '10:00:00',
        'Art Gallery',
        200
    );

-- Insert fake data for users to test
INSERT INTO
    eventp.user_detail (
        user_detail_id,
        user_detail_username,
        user_detail_password,
        user_detail_email
    )
VALUES (
        1,
        'john_doe',
        'password123',
        'jdoe@example.com'
    ),
    (
        2,
        'jane_smith',
        'password456',
        'jadoe@example.com'
    ),
    (
        3,
        'alice_jones',
        'password789',
        'ajones@example.com'
    );

INSERT INTO
    eventp.eventuser (
        event_detail_id,
        user_detail_id
    )
VALUES (1, 1), -- John Doe attending Tech Conference 2023
    (1, 2), -- Jane Smith attending Tech Conference 2023
    (2, 2), -- Jane Smith attending Music Festival
    (2, 3), -- Alice Jones attending Music Festival
    (3, 1);
-- John Doe attending Art Exhibition