<template>
<div class="footer-basic mt-5">
  <footer class="linea mt-5" >
    <div class="social"><a href="https://www.instagram.com/ninos_360.ac/" target="_blank"><i class="bi bi-instagram"></i></a><a href="https://www.facebook.com/Ni%C3%B1os-360-107487328516396" target="_blank"><i class="bi bi-facebook"></i></a><a href="https://www.twitter.com" target="_blank"><i class="bi bi-twitter"></i></a><a href="https://www.youtube.com" target="_blank"><i class="bi bi-youtube"></i></a><a href="https://mx.linkedin.com/company/ninos-360?challengeId=AQFG6opHrSDC2wAAAYA6mWvAG5bv-3se_Sm9CLckmI0954_WufS_9ObDOQhKk98g_LqASPaRlMTc3fQ7iklv7jIcFXQTjnfvzg&submissionId=69dad665-27de-e616-ecc3-b2a6d592977d" target="_blank"><i class="bi bi-linkedin"></i></a><a href="https://www.tiktok.com/@ninos360_ac" target="_blank"><i class="bi bi-tiktok"></i></a></div>
            <ul class="list-inline">
                <li class="list-inline-item"><a href="http://localhost:3000/">Inicio</a></li>
                <li class="list-inline-item" v-if="!currentUser"><a href="http://localhost:3000/register">Registrar Cuenta</a></li>
                <li class="list-inline-item" v-if="!currentUser"><a href="http://localhost:3000/login">Iniciar Sesión</a></li>
                
            </ul>
            <p class="copyright">Fundación Niños 360 © 2022</p>
  </footer>
  </div>
</template>

<script>
export default {
  computed : {
    currentUser(){
      return this.$store.state.auth.user;
    
    }
  }
}
</script>

<style>

.footer-basic {
  padding:40px 0;
  background-color: rgb(95, 159, 163);
  color: #FFFAFA;
}

.footer-basic ul {
  padding:0;
  list-style:none;
  text-align:center;
  font-size:18px;
  line-height:1.6;
  margin-bottom:0;
}

.footer-basic li {
  padding:0 10px;
}

.footer-basic ul a {
  color:inherit;
  text-decoration:none;
  opacity:0.8;
}

.footer-basic ul a:hover {
  opacity:1;
}

.footer-basic .social {
  text-align:center;
  padding-bottom:25px;
}

.footer-basic .social > a {
  font-size:24px;
  width:40px;
  height:40px;
  line-height:40px;
  display:inline-block;
  text-align:center;
  border-radius:50%;
  border:1px solid #ccc;
  margin:0 8px;
  color:inherit;
  opacity:0.75;
}

.footer-basic .social > a:hover {
  opacity:0.9;
}

.footer-basic .copyright {
  margin-top:15px;
  text-align:center;
  font-size:13px;
  color: #FFFFFF;
  margin-bottom:0;
}


</style>

<script></script>
