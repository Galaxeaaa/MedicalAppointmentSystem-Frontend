import Vue from 'vue'
import Router from 'vue-router'

import Login from './components/login'

//组件模块
import Doctor from './components/doctorSystem'
import Personal from "./components/personal/index.vue";
import personalInfo from "./components/personal/personal_info.vue";

import Report from "./components/report/index.vue";
import checkReport from "./components/report/check_report.vue";
import addReport from "./components/report/add_report.vue";
import detailReport from "./components/report/detail_report.vue";

import Chat from "./components/chat/index.vue";
import chatRoom from "./components/chat/chatroom.vue";
import card from "./components/chat/card.vue";
import chattitle from "./components/chat/chattitle.vue";
import list from "./components/chat/list.vue";
import message from "./components/chat/message.vue";
import toolbar from "./components/chat/toolbar.vue";
import usertext from "./components/chat/usertext.vue";

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			redirect: '/login',
		},
		{
			path: '/login',
			component: Login,
		},
		{
			path: '/person',
			component: Doctor,
			redirect: '/person/personal/info',
			children: [
				{
					path: 'personal',
					component: Personal,
					redirect: '/person/personal/info',
					children: [
						{
							path: 'info',
							component: personalInfo
						},
					]
				},
				{
					path: 'report',
					component: Report,
					redirect: '/person/report/check',
					children: [
						{
							path: 'check',
							component: checkReport
						},
						{
							path: 'add',
							component: addReport
						},
						{
							path: 'detail',
							component: detailReport
						}
					]
				},
				{
					path: 'chat',
					component: Chat,
					redirect: '/person/chat/chatroom',
					children: [
						{
							path: 'chatroom',
							component: chatRoom
							// hidden:true
						}
						// {
						// 	path:'card',
						// 	component: card
						// },
						// {
						// 	path:'chattitle',
						// 	component: chattitle
						// },
						// {
						// 	path:'list',
						// 	component: list
						// },
						// {
						// 	path:'message',
						// 	component: message
						// },
						// {
						// 	path:'toolbar',
						// 	component: toolbar
						// },
						// {
						// 	path:'usertext',
						// 	component: usertext
						// }
					]
				}
			]
		},

	]
})