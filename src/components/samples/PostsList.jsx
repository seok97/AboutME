import Post from "./Post.jsx";
import classes from "./PostsList.module.css";
import NewPost from "./NewPost.jsx";
import AboutMe from "../AboutMe.jsx";

function PostsList() {
    return (
        <>
            <NewPost />
            <ul className={classes.posts}>
                <Post author="Max" body="React.js is awsome!"/>
                <Post author="Keos" body="Python is awsome!"/>
            </ul>
        </>
    )
}

export default PostsList;