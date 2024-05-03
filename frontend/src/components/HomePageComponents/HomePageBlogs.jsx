import React, {useState, useEffect} from 'react'
import BlogCard from "../../components/BlogsPage/BlogCard";
import classes from "../../pages/BlogsPage/BlogsPage.module.css";
import axiosapi from '../../services/axiosapi';

const HomePageBlogs = () => {
    const [blogs, setBlogs] = useState([]);

    //fetch the data of all the posts to display on the main page
    const fetchData = () => {
        axiosapi.get('/blog/allPosts', {
            crossDomain: true,
            headers: {
                'Content-Type': 'application/json',
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then((res) => {
                const data = res.data.slice(0, 3);
                console.log(data);
                setBlogs(data);
            });
    }

    //loading
    useEffect(() => {
        fetchData();
    }, [])

    return (
        <div>
            <div className="BlogsHomeContainerOuter">
                <span id='BlogHomeHeading'>Check Our Recent Blogs</span>
                <div className='BlogsHomeContainerInner'>
                    {blogs.map((blog) => (
                        <BlogCard
                            key={blog._id}
                            id={blog._id}
                            image={blog.img}
                            title={blog.title}
                            content={blog.content}
                            date={blog.timestamp}
                            upvoteCount={blog.upvoteCount}
                            author={blog.author}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomePageBlogs
