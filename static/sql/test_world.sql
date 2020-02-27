select date, 
	country,
	sum(conf_count) confirmed, 
	sum(cured_count) cured,
	sum(dead_count) dead
from daily_stats_world 
group by date, country 
order by date