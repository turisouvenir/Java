package rw.souvenir.ne.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import rw.souvenir.ne.models.Blog;

import java.util.List;

public interface BlogRepository extends JpaRepository<Blog, Long> {
    List<Blog> findByPublished(boolean published);
    List<Blog> findByTitleContaining(String title);
}
