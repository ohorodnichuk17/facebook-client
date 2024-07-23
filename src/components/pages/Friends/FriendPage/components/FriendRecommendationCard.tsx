import { UserOutlined } from "@ant-design/icons";
import { Col, Card, Button, message } from "antd";
import type { IFriendRecommendation, ISendFriendRequest } from "../types";
import { useAppSelector } from "../../../../../hooks/redux";
import { apiClient } from "../../../../../utils/api/apiClient";

type FriendRecommendationCardProps = {
	friend: IFriendRecommendation;
	removeSenderRequestFriend: (
		senderRequestFriend: IFriendRecommendation,
	) => void;
};

const FriendRecommendationCard = ({
	friend,
	removeSenderRequestFriend,
}: FriendRecommendationCardProps) => {
	const { user } = useAppSelector((state) => state.account);

	const sendFriendRequest = (friendId: string) => {
		if (user?.id === undefined) {
			message.error("Send friend request error");
			return;
		}

		const sendFriendRequestBody: ISendFriendRequest = {
			friendId,
			userId: user?.id,
		};

		apiClient
			.post("/api/friends/send-friend-request", sendFriendRequestBody)
			.then(() => {
				message.success("Request successfully sended!");
				removeSenderRequestFriend(friend);
			})
			.catch(() => {
				message.error("Request sending error");
			});
	};

	return (
		<Col span={6} key={friend.id}>
			<Card
				cover={<img alt="Friend recommendation avatar" src={friend.avatar} />}
				actions={[
					<Button
						type="primary"
						key="add"
						onClick={() => sendFriendRequest(friend.id)}
					>
						Add friend
					</Button>,
				]}
			>
				<Card.Meta
					avatar={<UserOutlined />}
					title={`${friend.lastName} ${friend.firstName}`}
				/>
			</Card>
		</Col>
	);
};

export default FriendRecommendationCard;