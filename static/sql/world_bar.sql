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

>>>>>>> 048c19ce61a33734c8ff51b94659356f179cd91f
