<template>
    <Loading v-if="some_action">

    </Loading>
    <div class="mt-3">
        <CourseIn 
        @making_action="(d) => some_action = d"
        :course_id="course_in_id" :email="currentUserEmail" 
        :name="course_in_name"></CourseIn>

        <div>
            <div v-if="!loaded">
                    <div class="spinner-border" role="status">
                
                    </div>
                </div>
            <div v-if="errors.length">
                <p>{{error}}</p>
            </div>
            <div v-else-if="course && loaded">
                <EditCourse
                @making_action="(d) => some_action = d"
                :reload="$router.go"
                :course_id="course_update_id"
                >    
                </EditCourse>
                <Remove @making_action="(d) => some_action = d" :redirect="redirect" :titleCourse='course_remove_name' :idCourse="course_remove_id"></Remove>
                <AddSection                         
                @making_action="(d) => some_action = d"
                :course_id='course.id' 
                :reload="getSections"></AddSection>



                <div class="btn-group">
                    <button 
                    class="btn btn-info m-2" 
                    :disabled="courses_in.includes(course.id)" 
                    v-show="!isIn"
                    @click="courseIn(course.id,course.name)"
                    data-toggle="modal" data-target="#courseInModal"
                    >
                        <i class="bi bi-plus-circle-fill"></i> Inscribirse
                    </button>
                    
                    <button v-if="adminUser" class="btn btn-danger m-2" data-toggle="modal" data-target="#removeCourseModal" @click="this.delete(course.name,course.id)">
                        <i class="bi bi-eraser-fill"></i> Eliminar Curso
                    </button>
                    <button v-if="adminUser" class="btn btn-warning m-2" 
                    data-toggle="modal" data-target="#editCourseModal"
                    @click="update(course.id)" >
                        <i class="bi bi-eraser-fill"></i> Editar Curso
                    </button>
                </div>

                <h3>Título: {{course.name}}</h3>
                <div class="text-center">
                    <img :src="course.cover" alt="" class="outer-image-container">
                </div>
                <div class=" m-2 ml-0" >
                    <div class="Desc">Descripción:</div>  <p>{{course.description}}</p>

                </div>
                <div>

                    <h3 style="display: inline;">Secciones</h3>
                 
                    <div class="btn-group">
                        
                        <button 
                        v-if="adminUser" 
                        class="btn btn-warning m-2" 
                        data-toggle="modal" 
                        data-target="#addSectionModal">
                            <i class="bi bi-eraser-fill"></i> Añadir Sección
                        </button>

                        <button v-if="adminUser && sections.length" class="btn btn-warning m-2" data-toggle="modal" data-target="#editSectionOrderModal">
                                <i class="bi bi-eraser-fill"></i> Editar Orden
                        </button>
                        
                    </div>

                </div>

                <div v-if="sections.length">
                    
                    <EditSectionOrder @reload_parent="(r) => reload = r" 
                        @making_action="(d) => some_action = d" 
                        :sections_list="sections" 
                        :course_id="course.id">
                        </EditSectionOrder>
                    <EditSection 
                    @making_action="(d) => some_action = d" 
                    :reload="getSections" 
                    :id="section_id_for_update" 
                       
                    ></EditSection>
                    <RemoveSection @making_action="(d) => some_action = d" 
                        :name="section_name_for_remove" 
                        :id="section_id_for_remove" 
                        :reload="getSections">
                    </RemoveSection>

                    
                    <ol class="rounded-list" id="ol-list">
                        <li v-for="section in sections" :key="section.id">
                            <div id="section_name_desc">
                                <a
                                    id="vinculo"
                                    :href="
                                    $router.resolve({
                                        name: 'course_section',
                                        params: { id: section.id },
                                    }).href
                                    "
                                    v-show="isIn"
                                >
                                    {{section.name}}
                                    
                                </a>
                                
                                <h4 v-show="!isIn">
                                    {{section.name}}

                                </h4>
                                <br>
                                
                                <p v-show="!isIn">
                                    {{section.summary}}
                                </p>

                            </div>
                            
                            <div>
                                
                                <span v-if="section.viewed" title="Visto" class="mr-5">
                                    Visto <i class="bi bi-check2-square text-success" style="font-size:18px"></i>
                                </span>
                                <span v-else title="No Visto" class="mr-5">
                                    Pendiente <i class="bi bi-app"></i>
                                </span>
                                <div  title="Eliminar Sección"><button v-if="adminUser" class="btn btn-danger bi-eraser-fill mr-2 " @click="remove_section(section.id,section.name)" data-toggle="modal" data-target="#removeSectionModal"></button></div>
                                <div  title="Modificar Sección">
                                    <button v-if="adminUser" 
                                    class="btn btn-primary bi-eraser-fill mr-2" 
                                    @click="update_section(section.id)" 
                                    :id="section_id_for_update"
                                    data-toggle="modal" 
                                    data-target="#editSectionModal">
                                </button></div>
                            </div>
                               
                        </li>

                    </ol>
                </div>
                <div v-else-if="sections.length == 0 && sectionsLoaded">
                    <div class="col-md-12">
                        <h4>
                            No se han añadido secciones aún
                        </h4>

                    </div>
                </div>
                <div v-if="!sectionsLoaded">
                    <div class="spinner-border" role="status">
                        
                    </div>
                </div>

                
                
                <hr>
                <div v-if="!loaded">
                    <div class="spinner-border" role="status">
                
                    </div>
                </div>
            </div>
            

        </div>

        
        
        
        

    </div>
</template>

<script>
import CourseService from "../services/course.service"
import userService from '../services/user.service';
import courseService from '../services/course.service';
import Remove from './dialogs/Course/Remove.vue';
import AddSection from './dialogs/CourseDetail/AddSection.vue';
import EditSectionOrder from './dialogs/CourseDetail/EditSectionOrder.vue';
import EditSection from './dialogs/CourseDetail/EditSection.vue'
import RemoveSection from './dialogs/CourseDetail/RemoveSection.vue'
import CourseIn from './dialogs/Course/CourseIn.vue';
import Loading from "./Utils/Loading.vue"
import EditCourse from "./dialogs/Course/EditCourse.vue"

export default {
    components : {
        
        EditSectionOrder,
        AddSection,
        EditSection,
        CourseIn,
        Remove,
        RemoveSection,
        EditCourse
        
    },
    data(){
        return {
            error : "",
            course : {},
            sections : [],
            errors: [],
            errorsSections :[],
            loaded : false,
            sectionsLoaded : false,
            course_remove_name : "",
            course_remove_id : 0,
            redirect: true,
            reload : 0,
            section_id_for_update: 0,
            section_id_for_remove: 0,
            section_name_for_remove: 0,
            courses_in : [],
            course_in_id : 0,
            course_in_name : "",
            some_action : false,
            course_update_id: 0,
            sections_viewed : [],
            request_viewed : 0,

            //nuevos atributos
            isIn : false,

        }
    },
    methods : {
        getData(){
            CourseService.getCourseByUserByCourse(this.currentUserEmail,this.currentRoute).then(
                (response)=> {
                    if(response.data[0] !== undefined){
                        this.course = response.data[0].Courses;
                        this.isIn = true;
                    }else{
                        CourseService.getCourse(this.currentRoute).then(
                            (response)=>{
                                this.course = response.data;
                                this.isIn = false;
                            }
                        )
                    }
                    this.getSections();
                    this.loaded = true;
                }
            ).catch(
                (err)=>{
                    
                    console.log(err);
                }
            )
        },
        getSections(){
            this.sectionsLoaded = false;
            this.sections = [];
            if(this.isIn){
                userService.getSectionsByUserByEmail(this.currentUserEmail, this.currentRoute).then(
                    (response)=>{
                        this.sections = response.data
                        this.sectionsLoaded = true;
                    }
                )
            }else{
                CourseService.getSections(this.currentRoute).then(
                    (response)=>{
                        this.sections = response.data
                        this.sectionsLoaded = true;

                    }
                )
            }
        },
        delete(name,id) {
            this.course_remove_name = name;
            this.course_remove_id = id;
            
        },
        update(id){
            this.course_update_id = id
            this.some_action = true
        },
        remove_section(id,name){
            this.section_id_for_remove = id;
            this.section_name_for_remove = name;
        },

        update_section(id){
            this.section_id_for_update = id
            this.some_action = true;
        },
        
        
        courseIn(course_id,course_name){
            this.course_in_id = course_id;
            this.course_in_name = course_name;
        },
    },
    mounted(){
        
        
        this.getData();
        
    },
    watch : {
        isIn(){
            console.log(this.isIn);
        },
        course() {
            
            this.course.name = this.course.name.toUpperCase();
        },
        request_viewed(){
            let _sections = this.sections;
            _sections.forEach(
                (_e) => {
                    this.sections_viewed.forEach(
                        (_v) => {
                            if(_e.id === _v.section_id){
                                _e.viewed = true;
                            }
                        }
                    )
                }
            )
            this.sections = _sections;
        },
        reload(){
            this.sections = [];
            this.getSections();
        },
        errors(){
            this.error =(this.errors[0]);
            console.log(this.error);
            if(this.error.includes('Row Not Found')){
                this.error = "Course not found"
            }
            alert("Course Not Found")
        },
    },
    computed : {
        adminUser(){
            try{
            return true ? this.$store.state.auth.user.role === "admin" : false
            }catch{
                return false
            }
        },
        currentRoute(){
            return this.$route.params.id
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

<style scoped>

img { 
    max-width: 1044px;
    max-height: 300px;
    border-radius: 10px;
}


   #ol-list {
    counter-reset: li;
    list-style: none;
    *list-style: decimal;
    font: 15px 'trebuchet MS', 'lucida sans';
    padding: 0;
    margin-bottom: 4em;
    text-shadow: 0 1px 0 rgba(255,255,255,.5);
  }
    
  
  

   .rounded-list li{
    position: relative;
    display: block;
    padding: .4em .4em .4em 2em;
    *padding: .4em;
    margin: .5em 0;
    background: #ddd;
    color: #444;
    text-decoration: none;
    border-radius: .3em;
    transition: all .3s ease-out;
  }

  .rounded-list li:hover{
    background: #eee;
  }

  .rounded-list li:hover:before{
    transform: rotate(360deg);
  }

  .rounded-list li:before{
    content: counter(li);
    counter-increment: li;
    position: absolute;
    left: -1.3em;
    top: 50%;
    margin-top: -1.3em;
    background: #87ceeb;
    height: 2em;
    width: 2em;
    line-height: 2em;
    border: .3em solid #fff;
    text-align: center;
    font-weight: bold;
    border-radius: 2em;
    transition: all .3s ease-out;
  }

  #ol-list li{
    display: flex;
  }
  #ol-list li {
      justify-content: space-between;
  }
  #ol-list li div{
      display: flex;
  }
  #ol-list li #section_name_desc{
      display: block;

  }

  .Desc{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    font-weight: normal;
    line-height: 32px;
    font-weight: bold;
  }
  
</style>