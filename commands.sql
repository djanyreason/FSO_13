CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author text,
  url text NOT NULL,
  title text NOT NULL,
  likes integer DEFAULT 0
);

insert into blogs (title, author, url)
  values (
    'Line Up Manager 101: It is An Actual Role, That Needs Specific Skills!',
    'Prime',
    'https://thederbyapex.com/line-up-manager-101-it-is-an-actual-role-that-needs-specific-skills-7c67f2afb8bd'
  );


insert into blogs (title, author, url)
  values (
    'Walls in Roller Derby are Dying. Zone Play is the Next Big Thing.',
    'Artoo Deetonate',
    'https://thederbyapex.com/rip-walls-long-live-zone-7a0bd6626d73'
);