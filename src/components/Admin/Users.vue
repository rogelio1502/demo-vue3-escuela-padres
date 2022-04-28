<script setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column';
import Dialog from 'primevue/dialog/Dialog.vue'
import Button from 'primevue/button'
</script>

<template>

    <div class="mt-3">
        <h1>
            <i class="bi bi-people"></i> Usuarios
        </h1>
    </div>
    <div>
        <h2>Admins</h2>
        <DataTable class="table" 
        :value="admins" 
        :paginator="true" 
        :rows="4" 
        responsiveLayout="scroll" 
        :loading="admins_loaded"
        ref="dta">
            <template #loading>
                Cargando datos...
            </template>
            <template #header>
                <div style="text-align: left">
                    <Button icon="pi pi-external-link" label="Export CSV" @click="exportAdminsCSV($event)" />
                </div>
            </template>
            <template #empty>
                Ningún Admin se ha registrado.
            </template>
            <Column field="id" header="Id" :sortable="true"></Column>
            <Column field="email" header="Email" :sortable="true"></Column>
            <Column field="created" header="Registrado" :sortable="true"></Column>
        </DataTable>
    </div>
    <div>
        <h2>Padres</h2>

        <DataTable 
        :value="users" 
        :paginator="true" 
        :rows="4" 
        responsiveLayout="scroll" 
        class="table "
        :loading="fathers_loaded"
        ref="dtf"
        >
            <template #loading>
                Cargando datos...
            </template>
            <template #header>
                <div style="text-align: left">
                    <Button icon="pi pi-external-link" label="Export CSV" @click="exportFathersCSV($event)" />
                </div>
            </template>
            <template #empty>
                Ningún Padre se ha registrado.
            </template>
            <Column field="id" header="Id" :sortable="true"></Column>
            <Column field="email" header="Email" :sortable="true"></Column>
            <Column field="created" header="Registrado" :sortable="true"></Column>
        </DataTable>
    </div>
    
    <div>

    </div>
        
    
</template>

<script>

import adminService from '../../services/admin.service'
    export default{
        
        data() {
            return {
                users : [],
                admins : [],
                fathers_loaded : true,
                admins_loaded : true,
                
            }
        },
        mounted(){
            this.getFathers()
            this.getAdmins()
            
        },
        methods : {
            getFathers(){
                
                adminService.getFathers().then(
                    (response)=>{
                        this.users = response.data
                        // this._users = response.data
                        this.fathers_loaded = false;
                    }
                ).catch(
                    (err)=>{
                        console.log(err);
                    }
                )
            },
            getAdmins(){
                adminService.getAdmins().then(
                    (response)=>{
                        this.admins = response.data
                        // this._admins = response.data
                        this.admins_loaded = false;
                    }
                ).catch(
                    (err)=>{
                        console.log(err);
                    }
                )
            },
            exportFathersCSV() {
                this.$refs.dtf.exportCSV();
            },
            exportAdminsCSV(){
                this.$refs.dta.exportCSV();

            }
            
            
        }
    }
</script>


<style scoped>
h1{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 38px;
    font-weight: normal;
    line-height: 32px;
}

</style>