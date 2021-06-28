import Vue from 'vue'
import Router from 'vue-router'

import Login from './components/login'

// import LoginSuccess from './components/login_success'

//组件模块
import Doctor from './components/doctorSystem'
import Personal from "./components/personal/index.vue";
import personalInfo from "./components/personal/personal_info.vue";

import Report from "./components/report/index.vue";
import checkReport from "./components/report/check_report.vue";
import addReport from "./components/report/add_report.vue";
import detailReport from "./components/report/detail_report.vue";

import History from "./components/history/index.vue"
import checkHistory from "./components/history/check_history.vue";

import Chat from "./components/chat/index.vue";
import chatRoom from "./components/chat/chatroom.vue";
import comment from "./components/chat/comment";
// import card from "./components/chat/card.vue";
// import chattitle from "./components/chat/chattitle.vue";
// import list from "./components/chat/list.vue";
// import message from "./components/chat/message.vue";
// import toolbar from "./components/chat/toolbar.vue";
// import usertext from "./components/chat/usertext.vue";

import Hospitalization from "./components/order/index.vue";
import hospitalizationList from "./components/order/hospitalization_list.vue";
import hospitalizationDetail from "./components/order/hospitalization_detail.vue";
import hospitalizationAdd from "./components/order/hospitalization_add.vue";
// 引入住院管理组件

// 医生、等主页
import Homepage from './components/doctorSystem.vue'
import DoctorHomepage from "./components/homepage/doctorHomepage.vue";
import DepartmentHomepage from "./components/homepage/departmentHomepage.vue";
import HospitalHomepage from "./components/homepage/hospitalHomepage.vue";

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
		// {
		// 	path: '/login_success',
		// 	component: LoginSuccess,
		// },
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
					path: 'history',
					component: History,
					redirect: '/person/history/check',
					children: [
						{
							path: 'check',
							component: checkHistory
						},
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
						},
						{
							path: 'comment',
							component: comment
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
				},
                {
                path: "doctor",
                component: Hospitalization,
                redirect: "/person/doctor/list",
                children: [{
                        path: "list",
                        component: hospitalizationList,
                    },
                    {
                        path: "add",
                        component: hospitalizationAdd,
                    },
                    {
                        path: "detail",
                        component: hospitalizationDetail,
                    },
                ],
            }
			]
		},

		// group d4 part: Homepage of Doctor / Department / Hopital
		// `hypelink` from other page is the only entrance to these homepages
		// !NOTE:
		// when a user clicks a hypelink to the homepage of a doctor (/department /hopital), 
		// you must sent the name of the doctor (/department /hopital) as a parameter
		
		{
			path: '/homepage',
			name: 'DoctorHomepage',
			component: Homepage,
			children: [
				{
					path: '/homepage/doctor/:doctorName',
					name: 'DoctorHomepage',
					component: DoctorHomepage,
					// redirect: '/homepage/doctor',
				},
				{
					path: '/homepage/department/:hospitalName/:departmentName',
					name: 'DepartmentHomepage',
					component: DepartmentHomepage,
					// redirect: '/homepage/department',
				},
				{
					path: '/homepage/hospital/:hospitalName',
					name: 'HospitalHomepage',
					component: HospitalHomepage,
					// redirect: '/homepage/hospital',
				},
			]
		},
	]
})