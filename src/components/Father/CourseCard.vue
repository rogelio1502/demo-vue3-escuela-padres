<template>
  <div class="radioborde col-md-6 pb-2" v-for="course in courses" :key="course.id">
    <div class="">
      <div class="bg-card">
        <div class="m-2">
          <a
            id="vinculo"
            :href="
              $router.resolve({
                name: 'course_detail',
                params: { id: course.Courses.id },
              }).href
            "
          >
            Ir al curso
          </a>
          <br />
          <span><b>Título: </b> {{ course.Courses.name }} </span> <br />
          <span><b>Estado: </b> {{ course.status }} </span><br />
          <span><b>Descripción: </b> {{ course.Courses.description }} </span
          ><br />
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    courses: Array,
  },
};
</script>

<style>
p {
  font-size: 12px;
  font-style: italic, bold;
}

#vinculo {
  text-decoration: none;
  color: black;
}

#vinculo:before {
  content: "";
}

#vinculo:hover:before {
  content: "ᐅ ";
}

#vinculo:hover {
  text-decoration: underline;
  color: rgba(35, 35, 243, 0.527);
}

.radioborde{
    border-radius: 4px;
}

.bg-card {
  background-color: #f5f1f1;
  border-radius: 4px;
  box-shadow: rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em;
}

.bg-card:hover{
  transform: scale(1.05);
  background-size: cover;
  box-shadow: #98ddcaa8 0px -30px 36px -28px inset, #98ddcaa8 0px 18px 36px -18px inset;
  transition: all 0.9s;
  -webkit-transition: all 0.9s;
}

.bg-card:not(:hover){
  transition: all 0.9s;
  -webkit-transition: all 0.9s;
}

</style>
