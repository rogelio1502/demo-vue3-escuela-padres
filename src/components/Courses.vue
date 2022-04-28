
<script setup>
    import AddCourse from "./dialogs/Course/AddCourse.vue"
    import Remove from "./dialogs/Course/Remove.vue"
    import CourseIn from "./dialogs/Course/CourseIn.vue"
    import Loading from "./Utils/Loading.vue"
</script>


<template>
    <Loading v-if="some_action">
    </Loading>
    <AddCourse 
    @making_action="(d) => some_action = d"
    :reload="getData">
    </AddCourse>
    <Remove :redirect="redirect" 
    @making_action="(d) => some_action = d"
    :reload="getData" :titleCourse='course_remove_name' 
    :idCourse="course_remove_id">
    </Remove>
    <CourseIn :course_id="course_in_id" 
    @making_action="(d) => some_action = d"
    :email="currentUserEmail" :name="course_in_name">
    </CourseIn>
    <h1><i class="bi bi-book"> </i> Cursos</h1>
    <div class="mt-3">
        <div v-if="adminUser && loaded">
            <div class="row">
                <div class="col-6">
                    <button class="btn btn-success"  
                    data-toggle="modal" data-target="#addCourseModal">
                    Añadir Curso
                    </button>
                </div>
            </div>
            <hr>
        </div>
        <div>
            <div v-if="errors.length">
                <p>Error al cargar</p>
            </div>
        </div>
        <div v-if="courses && loaded" class="row" >
            <div v-for="course in courses" :key="course.id" class="col-md-6" id="cursos-display">
                <div class="card m-2">
                    <img :src="course.cover" style="width: 100%;" height="300">
 
                    <div class="card-body text-justify">
                        <div class="card-title">
                            <h3 class="header expansion">
                                <a :href="'courses/detail/' + course.id">{{course.name.toUpperCase()}}</a>
                                </h3>
                        </div>

                        {{course.description.toUpperCase()}}
                        <!-- <div>
                            <img :src="course.cover" alt="" srcset="" height="300" width="450" class="img">
                        </div> -->
                    </div>
                    <div class="card-footer">
                        <button 
                        :disabled="courses_in.includes(course.id)" 
                        v-if="!courses_in.includes(course.id)"  
                        class="btn btn-info m-2" 
                        @click="courseIn(course.id,course.name)"
                        data-toggle="modal" data-target="#courseInModal"
                        >
                            <i class="bi bi-plus-circle-fill">
                            </i>
                        </button>

                        <button 
                        v-if="adminUser" 
                        class="btn btn-danger m-2" 
                        data-toggle="modal" 
                        data-target="#removeCourseModal" 
                        @click="this.delete(course.name,course.id)">
                            <i class="bi bi-eraser-fill"></i>
                        </button>
                        
                    </div>
                </div>  
            </div>
        </div>
        <div v-if="loaded && !courses.length">
            <h3>Ningún curso</h3>
        </div>
        <div v-if="!loaded">
            <div class="spinner-border" role="status">
                
            </div>
        </div>

    </div>

    
</template>

<script>

import CourseService from "../services/course.service"
import userService from '../services/user.service'

export default {
    components : {
        AddCourse,
        Remove
    },
    data(){
        return {
            courses : [],
            errors: [],
            loaded : false,
            course_remove_id : 0,
            course_remove_title : "",
            redirect : false,
            courses_in : [],
            course_in_id: 0,
            course_in_name: "",
            some_action : false,
            
        }
    },
    methods : {
        getData(){
            this.loaded = false;
            CourseService.getAll().then(
                (response)=> {
                    this.courses = response.data
                    this.loaded = true;
                }
            ).catch(
                (err)=>{
                    console.log(err.message);
                    if (err.message === "Network Error"){
                        this.errors = [err]
                    }else{
                        this.errors = []
                    }
                    this.errors.push(err.response.data.detail)
                }
            )
        },
        
        delete(name,id) {
            this.course_remove_name = name;
            this.course_remove_id = id;
            
        },
        courseIn(course_id,course_name){
            
            this.course_in_id = course_id;
            this.course_in_name = course_name;
            

        },
        getCoursesByUser(){
            userService.getCourses(this.currentUserEmail).then(
                (response)=> {
                    this.courses_in = response.data
                    let new_courses_in = []
                    this.courses_in.forEach(
                        (course) => {
                            new_courses_in.push(course.Courses.id)
                        }
                    )
                    this.courses_in = new_courses_in;
                }
            ).catch(
                (err)=>{
                    console.log(err.response);
                    console.log(err);
                }
            )
        }
    },
    mounted(){
        this.getData();
        this.getCoursesByUser();
    },
    
    computed : {
        adminUser(){
            try{
            return true ? this.$store.state.auth.user.role === "admin" : false
            }catch{
                return false
            }
        },
        currentUserEmail(){
            try{
                return this.$store.state.auth.user.email;
            }
            catch{
                return null
            }
        },
    }
}

</script>

<style>

.outer-image-container { 
    max-width: 100%;
    max-height: 300;
}

.card {
    box-shadow: 13px 13px 20px #979797
}

.expansion :hover{
    transform: scale(1.01);
    margin: 28px; 
    transition: all 0.9s;
    -webkit-transition: all 0.9s;
}

.expansion :not(:hover){
    transition: all 0.9s;
    -webkit-transition: all 0.9s;
}

</style>