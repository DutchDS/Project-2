select date, 
	sum(conf_count) confirmed, 
	sum(susp_count) suspected,
	sum(cured_count) cured,
	sum(dead_count) dead
from daily_stats 
group by date 
order by date