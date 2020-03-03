select count(distinct date)
from daily_stats_world
where date between (select min(date) from daily_stats_world) and (select max(date) from daily_stats_world)
