-- Table: public.daily_stats

DROP TABLE public.daily_stats;

CREATE TABLE public.daily_stats
(	"Unnamed: 0" integer,
    "american_name" text ,
    "provinceName" text,
    "provinceShortName" text,
    "confirmedCount" integer,
    "suspectedCount" integer,
    "curedCount" integer,
    "deadCount" integer,
    "date" date
)

TABLESPACE pg_default;

ALTER TABLE public.daily_stats
    OWNER to postgres;