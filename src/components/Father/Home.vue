<script setup>
import userService from '../../services/user.service'
import CourseCard from './CourseCard.vue';

</script>

<template>
    <div class="mt-3">
        <div>
          <h1><i class="bi bi-house-fill"></i> Home </h1>
        </div>

        
        <div class="Mis_Cursos text-center">
            <h2>Mis Cursos</h2>
        </div>

        <div v-if="courses.length" >
            
            <h5 v-if="courses">
               Cursos en Progreso
            </h5>

            <div class="row">
                
                <div class="col-md-12" v-if="in_progress_courses.length == 0">
                    No has empezado ningún curso
                </div>
                <CourseCard v-else :courses="in_progress_courses" ></CourseCard>
                
            </div>
            <h5 v-if="courses">
                Cursos Terminados
            </h5>
            <div class="row">
                
                <div class="col-md-12" v-if="done_courses.length == 0">
                    No has terminado ningún curso
                </div>
                <CourseCard v-else :courses="done_courses" ></CourseCard>

                
            </div>
        </div >
        <div v-else-if="loaded == true">
           <i><p class="No_Curso"> No cuentas con ningún <a class="No_Curso" href="/Courses"> curso</a> aún </p></i>
        </div>
        <div v-show="!loaded">
            <div class="spinner-border" role="status">
                
            </div>
        </div>
        
            
        
        
        
    </div>
</template>

<script>

export default {
  components: { CourseCard },
    data(){
        return { 
            courses : [],
            in_progress_courses : [],
            done_courses : [],
            loaded : false,
        }
    },
    mounted(){
        this.getCoursesByUser();
    },
    methods : {
        getCoursesByUser(){
            userService.getCourses(this.currentUserEmail).then(
                (response)=> {
                    this.courses = response.data
                }
            ).catch(
                (err)=>{
                    console.log(err);
                }
            )
        }
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
    },
    watch : {
        courses(){
            this.loaded = true;
            this.courses.forEach(
                (course) => {
                    if(course.status == "inprogress"){
                        this.in_progress_courses.push(course)
                    }else{
                        this.done_courses.push(course)
                    }
                }
            )
            
        }
    }
}

</script>


<style scoped>

.No_Curso{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 24px;
    font-weight: normal;
    line-height: 32px;
    text-align: center;
    padding-top: 10px;
}

h1{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 38px;
    font-weight: normal;
    line-height: 32px;
}

.Mis_Cursos{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: normal;
    line-height: 32px;
}

</style>

