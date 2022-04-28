<script setup>
    import BaseModal from '../BaseModal.vue';
</script>

<template>
    <BaseModal :title="title" :info="info" :ok="ok" >
        <div class="row">
            <div class="col-md-12">
                <slot />
            </div>
        </div>

    </BaseModal>
</template>

<script>

export default {
    data() {
        return {
            title : "INFO",
            info:true,
            ok:true,
        }
    }
}
</script>