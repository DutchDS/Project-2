select date, 
	country,
	sum(conf_count)-sum(cured_count)-sum(dead_count) positive, 
	sum(cured_count) cured, 
	sum(dead_count) dead 
    from daily_stats_world 
    where country <> 'China' 
    group by date, country
<<<<<<< HEAD
    order by date, country
=======
    order by date, country  
>>>>>>> eca623a7c991caf93a258708fbb78b4aad4c1518
