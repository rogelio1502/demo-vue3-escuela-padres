<template>
    <!-- Modal -->
    <div 
    class="modal fade"  
    tabindex="-1" 
    role="dialog" 
    aria-labelledby="exampleModalLabel" 
    aria-hidden="true" 
    data-keyboard="false" 
    data-backdrop="static">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="close" @click="cancelMethod">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body" >
            <div  v-if="form_modal" >
                <form >
                    <slot />


                    

                </form>
            </div>
            <div v-if="info">
                <slot />
            </div>
        </div>
        <div class="modal-footer" v-if="cancel_save">
            <button type="button" class="btn btn-success" @click="cleanMethod" v-if="refresh">Restaurar</button>

            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="cancelMethod">Cancelar</button>
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="saveMethod"  >Confirmar</button>
        </div>
        <div class="modal-footer" v-if="wait_for_validation">
            <button type="button" class="btn btn-success" @click="cleanMethod" v-if="refresh">Restaurar</button>

            <button type="button" class="btn btn-danger" data-dismiss="modal" @click="cancelMethod">Cancelar</button>
            <button type="button" class="btn btn-primary" @click="saveMethod"  >Confirmar</button>
        </div>

        
        
        <div class="modal-footer" v-if="ok">
            <button type="button" class="btn btn-primary" data-dismiss="modal" @click="okMethod">OK</button>
        </div>
        </div>
    </div>
    </div>
</template>

<script>
    import $ from 'jquery'
    $("#confirm_button").click(
        $("#confirm_button").prop('disabled',true)
    )
    export default {
        
        props : {
            title : String,
            saveMethod : Function,
            cancel_save : Boolean,
            cancelMethod: Function,
            ok: Boolean,
            form_modal: Boolean,
            info : Boolean,
            okMethod : Function,
            refresh : Boolean,
            cleanMethod : Function,
            prop_disabled : Boolean,
            wait_for_validation : Boolean
           
        },
        
        methods : {
            
        }
    }
</script>

<style scoped>
.modal-content{
    box-shadow: 4px 4px 4px rgb(186, 223, 238);

}

.modal-header{
    background-color: rgb(186, 223, 238);
}

.modal-footer{
    background-color: rgb(186, 223, 238);
}

.modal-title{
    color: black;
}
</style>