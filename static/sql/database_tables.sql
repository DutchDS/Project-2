-- DROP TABLE daily_stats; 

CREATE TABLE daily_stats (
	id serial not null,		
    "Unnamed: 0" int,
    american_name text,
    province_name text,
    province_short text,
    conf_count int,
    susp_count int,
    cured_count int,
    dead_count int,
    date text,
	CONSTRAINT "pk_daily_stats" PRIMARY KEY (
        "id"
     )   
);