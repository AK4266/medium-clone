import { useBlog } from '../hooks'
import { useParams } from 'react-router-dom';
import { FullBlog } from '../components/FullBlog';
import { Appbar } from '../components/Appbar';
import { BlogSkeleton } from '../components/BlogSkeleton';

function Blog() {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || ""
  });
  if (loading || !blog) {
    return <div>
      <Appbar />
      <div className='flex justify-center'>
        <BlogSkeleton />
      </div>
    </div>
  }

  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  )
}

export default Blog
