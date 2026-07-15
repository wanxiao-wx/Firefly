import type { FriendLink, FriendsPageConfig } from "../types/friendsConfig";

// 可以在src/content/spec/friends.md中编写友链页面下方的自定义内容

export const friendsPageConfig: FriendsPageConfig = {
	title: "友链",
	description: "潇拾壹收藏和常去的站点。",
	showCustomContent: true,
	showComment: false,
	randomizeSort: false,
};

export const friendsConfig: FriendLink[] = [
	{
		"title": "Mizuki Docs",
		"imgurl": "https://q.qlogo.cn/headimg_dl?dst_uin=3231515355&spec=640&img_type=jpg",
		"desc": "Mizuki 使用手册",
		"siteurl": "https://docs.mizuki.mysqil.com",
		"tags": [
			"文档"
		],
		"weight": 4,
		"enabled": true
	},
	{
		"title": "U2",
		"imgurl": "/images/friends/sakura-icon.webp",
		"desc": "中文圈顶级动漫原盘 PT 站",
		"siteurl": "https://u2.dmhy.org/index.php",
		"tags": [
			"PT 站",
			"动漫"
		],
		"weight": 3,
		"enabled": true
	},
	{
		"title": "动漫花园",
		"imgurl": "/images/friends/anime-garden.webp",
		"desc": "公开的BT资源分享平台",
		"siteurl": "https://dmhy.org/",
		"tags": [
			"动漫"
		],
		"weight": 2,
		"enabled": true
	},
	{
		"title": "AnimeBytes",
		"imgurl": "/images/friends/pink-a-icon.webp",
		"desc": "二次元 PT 站的终极天花板",
		"siteurl": "https://animebytes.tv/",
		"tags": [
			"PT 站",
			"动漫"
		],
		"weight": 1,
		"enabled": true
	}
];

export const getEnabledFriends = (): FriendLink[] => {
	const friends = friendsConfig.filter((friend) => friend.enabled);

	if (friendsPageConfig.randomizeSort) {
		return friends.sort(() => Math.random() - 0.5);
	}

	return friends.sort((a, b) => b.weight - a.weight);
};
