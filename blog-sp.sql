delimiter //

CREATE PROCEDURE spBlogTags(blogid int )
BEGIN
   SELECT 
		t.name AS name       
	FROM tags t
	JOIN blogtags bt ON bt.tagid = t.id
	WHERE bt.blogid = blogid;



END //

delimiter ;

delimiter //

delimiter //
CREATE PROCEDURE spDeleteBlogTags(id int )
BEGIN
	DELETE 
	FROM blogtags 
	WHERE blogid = id;



END //

delimiter ;