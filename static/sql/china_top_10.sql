select  
	american_name, 
	max(date), 
	sum(conf_count)-sum(cured_count)-sum(dead_count) positive, 
	sum(cured_count) cured, 
	sum(dead_count) dead
    from daily_stats 
    where date = (select max(date ) from daily_stats) 
    group by american_name 
    order by positive desc 
	limit 10