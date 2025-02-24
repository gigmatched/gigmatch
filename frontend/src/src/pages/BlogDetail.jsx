// src/pages/BlogDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';

const BlogDetail = () => {
  const { id } = useParams(); // Route parametresini almak için useParams hook'u

  // Burada, API'den veya veri kaynağından blog detaylarını çekebilirsiniz.
  // Örneğin:
  // const [blog, setBlog] = useState(null);
  //
  // useEffect(() => {
  //   axios.get(`/api/blog/${id}`)
  //     .then(response => setBlog(response.data))
  //     .catch(error => console.error(error));
  // }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Blog Detayı - {id}</h1>
      <p>Bu, blog detay sayfanızın içeriğidir.</p>
      {/* Blog detaylarını burada görüntüleyebilirsiniz */}
    </div>
  );
};

export default BlogDetail;