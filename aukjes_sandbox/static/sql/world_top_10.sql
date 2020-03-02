select  
	country, 
	sum(conf_count) total,
	sum(conf_count)-sum(cured_count)-sum(dead_count) sick, 
	sum(cured_count) cured, 
	sum(dead_count) dead,
	max(date)
    from daily_stats_world 
    where date = (select max(date ) from daily_stats_world) 
    group by country 
    order by total desc 
	limit 10