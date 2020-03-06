-- DROP TABLE daily_stats; 

-- CREATE TABLE daily_stats (
-- 	id serial not null,		
--     "Unnamed: 0" int,
--     american_name text,
--     province_name text,
--     province_short text,
--     conf_count int,
--     susp_count int,
--     cured_count int,
--     dead_count 	int,
--     date text,
-- 	CONSTRAINT "pk_daily_stats" PRIMARY KEY (
--         "id"
--      )   
-- );

-- DROP TABLE daily_stats_world

-- CREATE TABLE daily_stats_world (
-- 	id serial not null,		
--     "Unnamed: 0" int,
--     date text,
-- 	american_name text,
--     country text,
-- 	lat bigint,
-- 	long bigint,
--     conf_count int,
--     cured_count int,
--     dead_count 	int,
-- 	CONSTRAINT "pk_daily_stats_world" PRIMARY KEY (
--         "id"
--      )   
-- );

DROP TABLE us_states;

CREATE TABLE us_states (
	id serial not null,		
    us_state text,
    abbr text,
	CONSTRAINT "pk_us_states" PRIMARY KEY (id)
	)