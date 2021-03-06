import {createWebHistory, createRouter} from "vue-router";
import Videos from "./components/Admin/Videos.vue";
import Home from "./components/Father/Home.vue";
import Login from "./components/Auth/Login.vue";
import Register from "./components/Auth/Register.vue";
import Index from "./components/Index.vue";
import Users from "./components/Admin/Users.vue";
import Courses from "./components/Courses.vue";
import CourseDetail from "./components/CourseDetail.vue";
import Section from './components/Section.vue';
import AdminLogin from "./components/Admin/AdminLogin.vue";
// lazy-loaded
// const Profile = () => import ("./components/Profile.vue")
// const BoardAdmin = () => import ("./components/BoardAdmin.vue")
// const BoardModerator = () => import ("./components/BoardModerator.vue")
// const BoardUser = () => import ("./components/BoardUser.vue")

const routes = [
    {
        path: "/",
        name: "index",
        component: Index,
        meta: {
            requiresAuth: false,
        }
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/videos",
        component: Videos,
        name:"videos",
        meta: {
            requiresAuth: true,
            adminView: true,
    
        }
    },
    {
        path: "/users",
        component: Users,
        name: "users",
        meta: {
            requiresAuth: true,
            adminView: true,

        }
    },
    {
        path: "/courses",
        name: "courses",
        component: Courses,
        meta: {
            requiresAuth: true,
            
        }
    },
    {
        path: "/courses/detail/:id",
        component: CourseDetail,
        name: "course_detail",
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/courses/section/:id",
        component: Section,
        name: "course_section",
        meta: {
            requiresAuth: true,
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login,
        meta: {
            requiresAuth: false,

        }
    }, {
        path: "/register",
        name: "register",
        component: Register,
        meta: {
            requiresAuth: false,
        }
    },
    {
        path: "/admin/login",
        component: AdminLogin,
        meta: {
            requiresAuth : false
        }
    }
    
];
const router = createRouter({history: createWebHistory(), routes});

router.beforeEach((to, from, next) => {
    const loggedIn = localStorage.getItem('user');
    let role = "";
    if (loggedIn){
        role = JSON.parse(loggedIn).role;

    }
    if(to.meta.requiresAuth === undefined){
        next("/");
        return
    }
    if(to.meta.requiresAuth && ! loggedIn){
        
        next("/login")
        return
    }
    
    if(['/login','/register','/admin/login'].includes(to.path) && loggedIn){
        next("/")
        return
    }
    if(to.meta.adminView === true && role != "admin"){
        next("/")
        return
    }
    next()
    return


    // const authPages = ['/login', '/register']
    // const publicPages = ['/login', '/register', '/',];
    // const allPages = ['/home', '/videos','/courses','/users','/courses/detail/:id'];
    // allPages.push(...publicPages)
    // const adminPages = ['/videos','/users']
    // const authRequired = ! publicPages.includes(to.path);
    // const loggedIn = localStorage.getItem('user');
    // const role = localStorage.getItem('role')    
   
    // if (allPages.includes(to.path)) {
    //     if (authRequired && ! loggedIn) {
        
    //         next('/login');
    //         return
    //     } else if (loggedIn && authPages.includes(to.path)) {
    //         next('/')
    //         return
    //     } else {
    //         if(adminPages.includes(to.path) && role != "admin"){
    //             next('/')
    //             return
    //         }
    //         next();
    //         return
    //     }
    // } else {
    //     next("/")
    //     return
    // }

});
export default router;
