

<template>
   
  
    <nav class="navbar navbar-expand-lg navbar-light">
      <a href="/">
      <img src="https://i.imgur.com/jDUatIo.png" 
      height="25" width="30">
      </a> 
      <a href="/" class="navbar-brand">Escuela Para Padres</a>
      <button class="navbar-toggler" type="button" 
      data-toggle="collapse" data-target="#navbarSupportedContent" 
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="navbar-nav mr-auto">
         
          <li class="nav-item">
            <a :href="$router.resolve({'name':'home'}).href"  v-if="currentUser" class="nav-link">
                <i class="bi bi-house-fill"></i> Home
            </a>
          </li>
          <li class="nav-item">
            <a :href="$router.resolve({'name':'users'}).href"  v-if="currentUser && adminUser" class="nav-link">
              <i class="bi bi-people"></i> Usuarios
            </a>
          </li>
          <li class="nav-item">
            <a :href="$router.resolve({'name':'courses'}).href"  v-if="currentUser" class="nav-link">
              <i class="bi bi-book"></i> Cursos
            </a>
            
          </li>
          
        </div>
        <div v-if="!currentUser" class="navbar-nav ml-auto">
          <li class="nav-item">
            <a :href="$router.resolve({'name':'register'}).href"   class="nav-link">
              <i class="bi bi-person-plus"></i> Registrate
            </a>
          </li>
          
          <li class="nav-item">
            <a :href="$router.resolve({'name':'login'}).href"   class="nav-link">
               <i class="bi bi-box-arrow-in-right"></i> Iniciar Sesión
            </a>
          </li>
        </div>
        <div v-if="currentUser" class="navbar-nav ml-auto">
          
          <li class="nav-item active" v-if="adminUser" >
            <span class="nav-link">Administrador</span>
          </li>
          <li class="nav-item" id="logout">
            <router-link class="nav-link" @click.prevent="logOut" to="/login" >
              <i class="bi bi-box-arrow-left"></i> Cerrar Sesión
            </router-link>
          </li>
          
        </div>
      </div>
      
    </nav>

    <div class="container-sm">
      <router-view />
    </div>

    

</template>
<script>
 
  
  
export default {
  
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    
    adminUser(){
      return true ? this.$store.state.auth.user.role === "admin" : false
    },
    role(){
      return this.$store.state.auth.user.role
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.resolve({'name':'login'});
    }
  }
};
  
</script>

<style scoped>
#logout :hover {
  cursor: pointer;
}

.navbar{
  background-color: #98DDCA;
}


</style>