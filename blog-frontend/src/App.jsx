import { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then((response) => response.json())
      .then((data) => {
        // Safety net 1: fallback to an empty array if data.data is undefined
        setPosts(data.data || []);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>My Simple Blog</h1>
      
      <div style={{ display: 'grid', gap: '20px' }}>
        {/* Safety net 2: optional chaining (?) before .map */}
        {posts?.map((post) => (
          <div key={post._id} style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
            
            {post.image && post.image !== 'no-photo.jpg' && (
              <img 
                src={`http://localhost:5000/uploads/${post.image}`} 
                alt="cover" 
                style={{ width: '200px', height: 'auto', borderRadius: '4px' }} 
              />
            )}

            <h2>{post.title}</h2>
            <p><strong>Category:</strong> {post.category}</p>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;