select src_id, src_name, author, 
	title, description, url, 
	"urlToImage", "publishedAt", "content"
	from news
	order by src_id, "publishedAt";
	
-- select src_id, title, "publishedAt",
-- 	count("title"),
-- 	count("publishedAt")
-- 	from news
-- 	group by src_id
-- 	order by src_id;
