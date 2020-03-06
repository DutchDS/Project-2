select u.us_state american_name,
-- w.lat,	
-- w.long,	
sum(w.conf_count) conf_count,	
w.date,	
sum(w.cured_count) cured_count,	
sum(w.dead_count) dead_count,	
u.us_state as country_2

from daily_stats_world w, us_states u
where country = 'United States of America' and 
substring(w.american_name, position(', ' in w.american_name)+2, 2) = u.abbr
and substring(w.american_name, position(', ' in w.american_name)+2, 2) <> 'na'

group by u.us_state, date
having sum(w.conf_count) > 0

order by date, u.us_state
