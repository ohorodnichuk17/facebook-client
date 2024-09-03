import { Col } from "antd";
import PostItemCard from "../../../post/list/components/PostItemCard";
import type { IPost } from "../../../post/list/types";

type UserProfilePostItemProps = {
    post: IPost;
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>;
    setTotalCount: React.Dispatch<React.SetStateAction<number>>;
};

const UserProfilePostItem = ({ post, setPosts, setTotalCount }: UserProfilePostItemProps) => {
    return (
        <Col key={post.id} xs={24} sm={24} md={24} lg={8} xl={8}>
            <div style={{ width: "100%", height: "auto" }}>
                <PostItemCard key={post.id} post={post} setPosts={setPosts} setTotalCount={setTotalCount} />
            </div>
        </Col>
    );
};

export default UserProfilePostItem;
