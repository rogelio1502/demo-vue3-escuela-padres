


<script>

import VideoService from "../../services/video.service"

export default {
    data(){
        return {
            videos : [],
            errors: [],
            loaded : false,
            
        }
    },
    methods : {
        getData(){
            VideoService.getAll().then(
                (response)=> {
                    this.videos = response.data
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
        }
    },
    mounted(){
        this.getData();
    },
    watch : {
        videos() {
            this.loaded = true;
        }
    }
}

</script>


<template>
    
    <div >

        <div>
            <div v-if="errors.length">
                <p>Error al cargar</p>
            </div>
        </div>
        <div v-if="videos.length" class="row">
            <div v-for="video in videos" :key="video.id" class="col-md-6">
                
                <h3>{{video.title}}</h3>

                <iframe :src="video.url" frameborder="0" width="100%" height="400px"
                    allow="encrypted-media;" allowfullscreen>
                </iframe>
                    
            </div>
        </div>
        <div v-if="!loaded">
            <div class="spinner-border" role="status">
                
            </div>
        </div>

        

    </div>
</template>

