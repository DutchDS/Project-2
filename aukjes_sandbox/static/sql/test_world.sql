select  
	country, 
	max(date), 
	sum(conf_count)-sum(cured_count)-sum(dead_count) positive, 
	sum(cured_count) cured, 
	sum(dead_count) dead
    from daily_stats_world 
    where date = (select max(date ) from daily_stats_world) 
    group by country 
    order by positive desc 
	limit 10