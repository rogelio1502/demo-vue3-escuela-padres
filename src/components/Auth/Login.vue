<template>
   <div class="wrapper">
        <!-- <div class="logo"> <img src="Recursos/LogoSolo.png" alt=""> </div> -->
        <div class="text-center mt-4 name"> Escuela para Padres </div>
        <Form @submit="handleLogin" :validation-schema="schema">
          <div class="p-3 mt-3">
              <div class="form-field d-flex align-items-center"> 
                <span class="far fa-user"></span> 
                <Field name="email" type="email" placeholder="Usuario"  autocomplete= "off"/> 
                <ErrorMessage name="email" class="error-feedback" />
              
              </div>

              <div class="form-field d-flex align-items-center"> 
                <span class="fas fa-key"></span>  
                <Field type="password" name="password" id="pwd" placeholder="Contraseña" autocomplete= "off"/> 
                <ErrorMessage name="password" class="error-feedback" />
              </div> 
              
              <button class=" btn mt-3" :disabled="loading"><span
              v-show="loading"
              class="spinner-border spinner-border-sm"
              ></span>Iniciar Sesión</button>
          </div>

          <div class="form-group">
            <div v-if="message" class="alert alert-danger" role="alert">
              {{ message }}
            </div>
          </div>

        </Form>
        <div class="text-center fs-6"> <a href="#">¿Olvidaste tu contraseña?</a> o <router-link to="/register"> Únete</router-link> </div>
  </div>
</template>
<script>
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const schema = yup.object().shape({
      email: yup.string().email().required("Email es requerido."),
      password: yup.string().required("Password es requerido."),
    });
    return {
      loading: false,
      message: "",
      schema,
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  // created() {
  //   if (this.loggedIn) {
  //     this.$router.push("/profile");
  //   }
  // },
  methods: {
    handleLogin(user) {
      this.loading = true;
      this.$store.dispatch("auth/login", user).then(
        () => {
          this.$router.push("/home");
        },
        (error) => {
          this.loading = false;
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          if (this.message.includes('401') ){
            this.message = "Credenciales Inválidas."
          }
          if(this.message.includes('500')){
            this.message = "Error del servidor. Favor de intentar más tarde."
          }
          
        }
      );
    },
  },
};
</script>
<style scoped>


@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800;900&display=swap');

 * {
     margin: 0;
     padding: 0;
     box-sizing: border-box;
     font-family: 'Poppins', sans-serif
 }

 body {
     background: #f6f9fc
 }



 .wrapper {
     max-width: 350px;
     min-height: 500px;
     margin: 80px auto;
     padding: 40px 30px 30px 30px;
     background-color: white;
     box-shadow: 13px 13px 20px #979797
    }

 .logo {
     width: 115px;
     margin: auto
 }

 .logo img {
     width: 100%;
     height: 105px;
     
 }

 .wrapper .name {
     font-weight: 600;
     font-size: 1.4rem;
     letter-spacing: 1.3px;
     padding-left: 10px;
     color: #555
 }

 .wrapper .form-field input {
     width: 100%;
     display: block;
     border: none;
     outline: none;
     background: none;
  
     font-size: 1.2rem;
     color: #666;
     padding: 10px 15px 10px 10px
 }

 .wrapper .form-field {
     padding-left: 10px;
     margin-bottom: 20px;
     
     border-radius: 20px;
     
     box-shadow: inset 8px 8px 8px #cbced1, inset -8px -8px 8px #fff
 }

 .wrapper .form-field .fas {
     color: #555
 }

 .wrapper .btn {
     box-shadow: none;
     width: 100%;
     height: 40px;
     background-color: #47AA6C;
     color: #fff;
     border-radius: 25px;
     box-shadow: 3px 3px 3px #b1b1b1, -3px -3px 3px #fff;
     letter-spacing: 1.3px
 }

 .wrapper .btn:hover {
     background-color: #FFC300
 }

 .wrapper a {
     text-decoration: none;
     font-size: 0.8rem;
     color: #5DCFE3
 }

 .wrapper a:hover {
     color: #FFC300
}

 @media(max-width: 380px) {
     .wrapper {
         margin: 30px 20px;
         padding: 40px 15px 15px 15px
     }
 }
</style>
